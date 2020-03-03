import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Logo from './../AppComponents/Logo';
import CreateAccountForm from './CreateAccountComponents/CreateAccountForm';

export default class CreateAccount extends React.Component{

    static navigationOptions = {
        headerShown: false,
    }

    render(){
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

                <ScrollView contentContainerStyle={styles.container}>

                    <Logo />

                    <CreateAccountForm navigation={this.props.navigation}/>

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
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
});