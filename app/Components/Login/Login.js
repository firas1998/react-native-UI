import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import Logo from './../AppComponents/Logo';
import LoginForm from './LoginComponents/LoginForm';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const apiData = require('./../../Global/ApiData.json');

export default class Login extends React.Component{

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {

        //Check if JWT is still valid by sending http request to server to check if the token is valid
        var jwt = await AsyncStorage.getItem('jwt');

        if(jwt === null){
            return;
        }

        let headers = {
            Accept: 'application/json',
            Authorization: jwt
        }

        const completeUrl = apiData.url.concat(apiData.endpoints.checkJWT);

        let response = null;
        
        try {
            response = await fetch(completeUrl, {method: 'POST', headers: headers});
        } catch (error) {
            console.error(error);
        }

        if(response.status === 200){
            this.props.navigation.navigate('ProtestsList');
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

                <ScrollView contentContainerStyle={styles.container}>

                    <Logo />

                    <LoginForm navigation={this.props.navigation}/>

                </ScrollView>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

    wrapper: {
        flex: 1,
        borderColor: '#fff',
        borderWidth: 1,
        paddingTop: getStatusBarHeight(),
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
});