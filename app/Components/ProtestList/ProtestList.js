import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Header from '../AppComponents/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ListOfProtests from './ProtestListComponents/ListOfProtests';
import NavBar from './../AppComponents/NavBar';
import Expo from 'expo';

export default class ProtestList extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    render() {
        return (

            <View style={styles.container}>

                <Header navigation={this.props.navigation} onProtestList={true} filterOpened={false} />

                <View style={styles.exampleBig}><Text>dasdasdsa</Text></View>

                <NavBar navigation={this.props.navigation} />

            </View>
        );
    }
}
//<ListOfProtests />
const globalStyles = require('./../../Global/GlobalStyles.json');

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
    },

    exampleBig: {
        flex: 11,
        backgroundColor: '#ff0000',
    },

    examplesmall: {
        flex: 1,
        backgroundColor: '#fff',
    }
});