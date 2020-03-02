import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Input, Layout, Text} from "@ui-kitten/components";
import {changeUsernameAction, changeUserStatusAction} from "../redux/Reducer";

class Login extends React.Component {
    state = {
        usernameValue: '',
        passwordValue: '',
        secureTextEntry: true,
        errorUsername: false,
        errorPassword: false,
        errorMessageUsername: '',
        errorMessagePassword: ''
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

    notification() {
        if (this.props.userStatus === 'registered') {
            return (
                <Text style={{width: '100%', color: '#24e506', marginLeft: '5%'}}>Succesvol geregistreerd</Text>
            )
        }
    }

    fetchLogin() {
        const url = 'http://localhost:3000/login';
        let data = {
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
                        this.setState({
                            usernameValue: '',
                            passwordValue: '',
                            secureTextEntry: true,
                            errorUsername: false,
                            errorPassword: false,
                            errorMessageUsername: '',
                            errorMessagePassword: ''
                        });
                        this.props.changeUsername(data.username);
                        this.props.changeUserStatus(null);
                        this.props.navigation.navigate('Dashboard');
                    } else {
                        if (data.errorMsg[0] === 'username-incorrect') {
                            this.setState({
                                errorUsername: true,
                                errorPassword: false,
                                errorMessageUsername: 'Gebruikersnaam bestaat niet..'
                            });
                        } else if (data.errorMsg[0] === 'password-incorrect') {
                            this.setState({
                                errorPassword: true,
                                errorUsername: false,
                                errorMessagePassword: 'Wachtwoord is incorrect..'
                            });
                        }

                        this.setState({
                            passwordValue: '',
                            isInvalidInputValue: true
                        });
                    }
                }
            ).catch(err => alert('Error: De server is waarschijnlijk offline...'));
    }

    render() {
        return (
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category='h1' style={styles.title}>Inloggen</Text>
                {this.notification()}
                <Layout style={styles.formContainer}>
                    <Input
                        label={"Gebruikersnaam"}
                        value={this.state.usernameValue}
                        onChangeText={this.onChangeUsername}
                        placeholder='Gebruikersnaam'
                        status={this.state.errorUsername ? 'danger' : null}
                        caption={this.state.errorUsername ? this.state.errorMessageUsername : ''}
                        autoCapitalize='none'
                        style={styles.input}
                    />
                    <Input
                        value={this.state.passwordValue}
                        label={"Wachtwoord"}
                        placeholder='Wachtwoord'
                        icon={this.renderIcon}
                        secureTextEntry={this.state.secureTextEntry}
                        onIconPress={this.onIconPress}
                        onChangeText={this.onChangePassword}
                        status={this.state.errorPassword ? 'danger' : null}
                        caption={this.state.errorPassword ? this.state.errorMessagePassword : ''}
                        autoCapitalize='none'
                        style={styles.input}
                    />
                    <Button style={styles.loginButton}
                            status='warning'
                            disabled={!(this.state.usernameValue && this.state.passwordValue)}
                            onPress={() => this.fetchLogin()}>
                        Inloggen
                    </Button>

                    <Button style={styles.registerButton}
                            appearance='ghost'
                            status='primary'
                            onPress={() => this.props.navigation.navigate('Register')}>
                        Registreren
                    </Button>

                </Layout>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        width: '100%',
        marginLeft: 15,
        marginBottom: 20,
        textAlign: 'left'
    },
    registerButton: {
        marginTop: 30
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
    loginButton: {
        width: '100%'
    },
    formContainer: {
        width: '95%'
    }
});

const mapStateToProps = (state) => ({
    username: state.app.username,
    userStatus: state.app.userStatus
});

const mapDispatchToProps = (dispatch) => ({
    changeUsername: (username) => dispatch(changeUsernameAction(username)),
    changeUserStatus: (userStatus) => dispatch(changeUserStatusAction(userStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
