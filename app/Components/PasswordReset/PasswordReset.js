import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Logo from './../AppComponents/Logo';
import PasswordResetForm from './PasswordResetComponents/PasswordResetForm';

export default class PasswordReset extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

                <ScrollView contentContainerStyle={styles.container} >

                    <Logo />

                    <PasswordResetForm navigation={this.props.navigation} />

                </ScrollView>

            </KeyboardAvoidingView>
        );
    }

}

const styles = StyleSheet.create({

    wrapper: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingRight: 40,
    },
});