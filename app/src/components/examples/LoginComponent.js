import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Button, Input, Layout, Text} from 'react-native-ui-kitten';

export class LoginForm extends React.Component {

    state = {
        usernameValue: '',
        passwordValue: '',
        secureTextEntry: true,
        loggedIn: false,
        isInvalidInputValue: false
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

    sendLogin() {
        const url = 'http://aaronvandenberg.nl:3000/login';
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
                        console.log('Logged in success');
                        this.setState({
                            loggedIn: true
                        })
                    } else {
                        this.setState({
                            isInvalidInputValue: true
                        })
                    }
                }
            ).catch(err => console.log(err));
    }

    render() {
        return (
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category='h1' style={{margin: 20, textAlign: "center"}}>Inloggen</Text>
                <Input
                    style={styles.input}
                    value={this.state.usernameValue}
                    onChangeText={this.onChangeUsername}
                    placeholder='Gebruikersnaam'
                    status={this.state.isInvalidInputValue ? 'danger' : null}
                />
                <Input
                    value={this.state.value}
                    placeholder='Wachtwoord'
                    icon={this.renderIcon}
                    secureTextEntry={this.state.secureTextEntry}
                    onIconPress={this.onIconPress}
                    onChangeText={this.onChangePassword}
                    status={this.state.isInvalidInputValue ? 'danger' : null}
                    caption={this.state.isInvalidInputValue ? 'Gebruikersnaam en/of wachtwoord is incorrect' : ''}
                />
                <Button style={{
                    width: '100%',
                    alignItems: 'center'
                }} onPress={() => this.sendLogin()}>Inloggen</Button>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    modalContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
