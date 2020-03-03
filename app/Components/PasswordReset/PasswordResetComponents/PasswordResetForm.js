import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const apiData = require('./../../../Global/ApiData.json');

export default class PasswordResetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            question: 'What is your name',
            answer: '',
            newPassword: '',
            newPasswordConfirmation: '',
            usernameExists: false,
            usernameError: false,
            passwordError: false,
            newPasswordConfirmationError: false,
            answerError: false,
            error: false,
            errorMessage: ''
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <TextInput style={this.state.usernameError ? styles.textInputError : styles.textInput} placeholder='Username'
                    onChangeText={(username) => this.setState({ username })}
                    defaultValue={this.state.username}
                />

                <View style={this.state.usernameExists ? styles.textBox : styles.hideTextBox}>
                    <Text>{this.state.question}</Text>
                </View>

                <TextInput style={this.state.usernameExists ?
                    (this.state.answerError ? styles.textInputError : styles.textInput) : styles.hideTextBox} placeholder='Answer'
                    onChangeText={(answer) => this.setState({ answer })}
                    defaultValue={this.state.answer}
                />

                <TextInput style={this.state.usernameExists ?
                    (this.state.passwordError ? styles.textInputError : styles.textInput) : styles.hideTextBox} placeholder='Password'
                    onChangeText={(newPassword) => this.setState({ newPassword })}
                    secureTextEntry
                />

                <TextInput style={this.state.usernameExists ?
                    (this.state.newPasswordConfirmationError ? styles.textInputError : styles.textInput) : styles.hideTextBox} placeholder='Confirm password'
                    onChangeText={(newPasswordConfirmation) => this.setState({ newPasswordConfirmation })}
                    secureTextEntry
                />

                <View style={this.state.error ? styles.textBox : styles.hideTextBox}>
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                </View>

                <TouchableOpacity style={styles.resetPasswordButton} onPress={() => { this.state.usernameExists ? this.resetPassword() : this.checkUsernameExists() }}>
                    <Text>Reset password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options} onPress={() => this.goToCreateAccount()}>
                    <Text>Don't have an account? Create one!</Text>
                </TouchableOpacity>

            </View>
        );
    }

    checkUsernameExists = async () => {

        let completeURL = apiData.url.concat(apiData.endpoints.checkUsernameExists, this.state.username);

        let headers = {
            Accept: 'application/json',
        }

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'GET', headers: headers });
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: 'Oops, something went wrong' });
            return;
        }

        this.handleCheckUsernameExists(response);
    }

    handleCheckUsernameExists(response) {
        console.log(response.json());

        if (response.status !== 200) {
            this.setState({ error: true, usernameError: true, errorMessage: response.json().errorMessage });
            return;
        }

        this.setState({ usernameExists: true, question: response.json().question });
    }

    resetPassword = async () => {

        let completeURL = apiData.url.concat(apiData.endpoints.resetPassword);

        let headers = {
            Accept: 'application/json',
        }

        let body = JSON.stringify({
            username: this.state.username,
            newPassword: this.state.newPassword,
            secretAnswer: this.state.secretAnswer,
        });

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'POST', headers: headers, body: body });
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: 'Oops, something went wrong' });
            return;
        }

        this.handleResetPassword(response);
    }

    handleResetPassword(response) {
        console.log(response.status);

        if (response.status !== 200) {
            this.setState({ error: true, passwordError: true, errorMessage: response.json().errorMessage });
            return;
        }

        this.props.navigation.goBack();
    }

    goToCreateAccount = () => {
        this.props.navigation.navigate('CreateAccount');
    }

}

const globalStyles = require('./../../../Global/GlobalStyles.json');

const styles = StyleSheet.create({

    container: {
        flex: 3,
    },

    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        height: globalStyles.textInput.height,
        width: globalStyles.textInput.width,
        borderRadius: globalStyles.textInput.borderRadius,
        borderColor: globalStyles.errors.color,
        borderWidth: 0,
    },

    textInputError: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        height: globalStyles.textInput.height,
        width: globalStyles.textInput.width,
        borderRadius: globalStyles.textInput.borderRadius,
        borderColor: globalStyles.errors.color,
        borderWidth: 0.5,
    },

    textBox: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: -10,
    },

    hideTextBox: {
        display: 'none',
    },

    errorText: {
        color: globalStyles.errors.color,
    },

    resetPasswordButton: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 15,
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 5,
    },

    options: {
        alignSelf: 'stretch',
        padding: 2,
        alignItems: 'center',
    },
});