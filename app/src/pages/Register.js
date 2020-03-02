import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Input, Layout, Text} from "@ui-kitten/components";
import RegisterNavbar from "../components/RegisterNavBar";
import {changeUserStatusAction} from "../redux/Reducer";

class Register extends React.Component {

    state = {
        nameValue: '',
        usernameValue: '',
        passwordValue: '',
        secureTextEntry: true,
        usernameStatus: false,
        errorPassword: false,
        statusMessageUsername: '',
        errorMessagePassword: ''
    };

    onChangeName = (nameValue) => {
        this.setState({nameValue});
    };

    onChangeUsername = (usernameValue) => {
        this.setState({usernameValue});
    };

    onChangePassword = (passwordValue) => {
        this.setState({passwordValue});
    };

    onIconPress = () => {
        const secureTextEntry = !this.state.secureTextEntry;
        this.setState({secureTextEntry});
    };

    renderIcon = (style) => {
        const iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';
        return (
            <Icon {...style} name={iconName}/>
        );
    };

    checkUsernameAvailability() {
        const url = 'http://localhost:3000/register?usernameCheck=true';
        let data = {
            username: this.state.usernameValue,
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors'
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                    if (data.success) {
                        this.setState({
                            usernameStatus: 'success',
                            statusMessageUsername: 'Gebruikersnaam is beschikbaar.'
                        })
                    } else {
                        this.setState({
                            usernameStatus: 'danger',
                            statusMessageUsername: 'Gebruikersnaam is al bezet.'
                        })
                    }
                }
            ).catch(err => alert('Error: De server is waarschijnlijk offline...'));
    }

    registerButton() {
        let disabled = true;
        if (this.state.nameValue && this.state.usernameStatus === 'success' && this.state.passwordValue) {
            disabled = false;
        }
        return (
            <Button style={styles.registerButton}
                    disabled={disabled}
                    onPress={() => this.fetchRegister()}>
                Registreren
            </Button>
        )
    }

    fetchRegister() {
        const url = 'http://aaronvandenberg.nl:3000/register';
        let data = {
            name: this.state.nameValue,
            username: this.state.usernameValue,
            password: this.state.passwordValue
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors'
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                    if (data.success) {
                        this.props.changeUserStatus('registered');
                        this.props.navigation.navigate('Login');
                    } else {
                        alert('Er is iets fout gegaan, probeer het later nog is!')
                    }
                }
            ).catch(err => alert('Error: De server is waarschijnlijk offline...'));
    }

    render() {
        let usernameStatus = '';
        if (this.state.usernameStatus === 'success') {
            usernameStatus = 'success';
        } else if (this.state.usernameStatus === 'danger') {
            usernameStatus = 'danger';
        }

        return (
            <>
                <Layout style={{flex: 1}}>
                    <Layout style={{justifyContent: 'flex-start'}}>
                        <RegisterNavbar/>
                    </Layout>
                </Layout>
                <Layout style={{flex: 2}}>
                    <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Layout style={styles.formContainer}>
                            <Text category='h1' style={styles.title}>Registeren</Text>
                            <Input
                                style={styles.input}
                                label={"Voornaam"}
                                value={this.state.nameValue}
                                onChangeText={this.onChangeName}
                                placeholder='Voornaam'
                            />
                            <Input
                                style={styles.input}
                                label={"Gebruikersnaam"}
                                value={this.state.usernameValue}
                                onChangeText={this.onChangeUsername}
                                onBlur={() => this.checkUsernameAvailability()}
                                placeholder='Gebruikersnaam'
                                status={usernameStatus}
                                caption={this.state.statusMessageUsername ? this.state.statusMessageUsername : ''}
                                autoCapitalize='none'
                            />
                            <Input
                                style={styles.input}
                                label={"Wachtwoord"}
                                value={this.state.passwordValue}
                                placeholder='Wachtwoord'
                                icon={this.renderIcon}
                                secureTextEntry={this.state.secureTextEntry}
                                onIconPress={this.onIconPress}
                                onChangeText={this.onChangePassword}
                                status={this.state.errorPassword ? 'danger' : null}
                                caption={this.state.errorPassword ? this.state.errorMessagePassword : ''}
                                autoCapitalize='none'
                            />
                            {this.registerButton()}
                        </Layout>
                    </Layout>
                </Layout>
            </>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        width: '100%',
        marginBottom: 20,
        textAlign: 'left'
    },
    modalContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        paddingBottom: 15
    },
    registerButton: {
        width: '100%'
    },
    formContainer: {
        width: '95%'
    }
});

const mapStateToProps = (state) => ({
    userStatus: state.app.userStatus
});

const mapDispatchToProps = (dispatch) => ({
    changeUserStatus: (userStatus) => dispatch(changeUserStatusAction(userStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

