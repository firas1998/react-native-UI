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

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
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
                    defaultValue={this.state.password} secureTextEntry
                />
                
                <View style={this.state.error ? styles.errorsBox : styles.hideErrorsBox}>
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => this.login()}>
                    <Text>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options} onPress={() => this.resetPassword()}>
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options} onPress={() => this.createAccount()}>
                    <Text>Create a new account</Text>
                </TouchableOpacity>

            </View>
        );
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
            response = await fetch(completeURL, {method: 'POST', headers: headers, body: body});
        } catch (error) {
            console.error(error);
            this.setState({errorMessage: 'Oops, something went wrong'});
            return;
        }

        this.handleResponse(response);

    }

    handleResponse(response){

        console.log(response.status);

        if(response.status !== 200){
            this.setState({error: true, errorMessage: response.errorMessage});
            textInputBorderWidth = 1;
            return;
        }

        AsyncStorage.setItem('jwt', response.json().jwt);
        AsyncStorage.setItem('username', response.json().username);
        this.props.navigation.setParams({protestListType: 0, goBackActive: false});
        this.props.navigation.navigate('ProtestsList');
    }

    createAccount = () => {
        this.props.navigation.push('CreateAccount');
    }

    resetPassword = () => {
        this.props.navigation.push('PasswordReset');
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

    loginButton: {
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