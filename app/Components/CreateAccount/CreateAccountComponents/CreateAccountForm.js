import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

const apiData = require('./../../../Global/ApiData.json');

export default class CreateAccountForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            error: false,
            passwordConfirmationError: false,
            errorMessage: ''
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <TextInput style={this.state.error ? styles.textInputError : styles.textInput} placeholder='Username'
                    onChangeText={(username) => this.setState({ username })}
                    defaultValue={this.state.username}
                />

                <TextInput style={this.state.error ? styles.textInputError : styles.textInput} placeholder='Password'
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry
                />

                <TextInput style={this.state.passwordConfirmationError ? styles.textInputError : styles.textInput} placeholder='Confirm password'
                    onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation })}
                    secureTextEntry
                />

                <View style={this.state.error ? styles.errorsBox : styles.hideErrorsBox}>
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                </View>

                <TouchableOpacity style={styles.createAccountButton} onPress={() => this.createAccount()}>
                    <Text>CREATE AN ACCOUNT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options} onPress={() => this.goTologin()}>
                    <Text>Already have an account? Login!</Text>
                </TouchableOpacity>

            </View>
        );
    }

    createAccount = async () => {

        let completeURL = apiData.url.concat(apiData.endpoints.createAccount);

        let headers = {
            Accept: 'application/json',
        }

        let body = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        });

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'POST', headers: headers, body: body });
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: 'Oops, something went wrong' });
            return;
        }

        this.handleResponse(response);
    }

    handleResponse(response) {

        console.log(response.status);

        if (response.status !== 200) {
            this.setState({ error: true, errorMessage: response.json().errorMessage });
            return;
        }

        this.login();
    }

    login = async () => {
        //login to the app
        let completeURL = apiData.url.concat(apiData.endpoints.authentication);

        let headers = {
            Accept: 'application/json',
        }

        let body = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        });

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'POST', headers: headers, body: body });
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: 'Oops, something went wrong' });
            return;
        }

        this.handleLoginResponse(response);

    }

    handleLoginResponse(response) {

        console.log(response.status);

        if (response.status !== 200) {
            this.setState({ errorMessage: response.errorMessage });
            return;
        }

        AsyncStorage.setItem('jwt', response.json.jwt);
        this.props.navigation.navigate('ProtestsList');
    }

    goTologin = () => {
        this.props.navigation.navigate('Login');
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

    errorsBox: {
        borderColor: '#ff0000',
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 10,
    },

    hideErrorsBox: {
        display: 'none',
    },

    errorText: {
        color: globalStyles.errors.color,
    },

    createAccountButton: {
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
