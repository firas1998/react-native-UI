import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Header from '../AppComponents/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ListOfProtests from './ProtestListComponents/ListOfProtests';
import NavBar from './../AppComponents/NavBar';

export default class ProtestList extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    render() {

        if (this.props.navigation.getParams("protestListType", 0) === 0) {
            return this.renderMainProtestListPage();
        }
        return this.renderOtherProtestListPage();
    }

    renderMainProtestListPage = () => {
        return (

            <View style={styles.container}>

                <Header
                    navigation={this.props.navigation}
                    onProtestList={true}
                    filterOpened={false}
                    goBackActive={this.props.navigation.getParam("goBackActive", false)} />

                <ListOfProtests style={styles.exampleBig} type={this.props.navigation.getParams("type", 0)} />

                <NavBar navigation={this.props.navigation} />

            </View>
        );
    }

    renderOtherProtestListPage = () => {
        return (

            <View style={styles.container}>

                <Header
                    navigation={this.props.navigation}
                    onProtestList={true}
                    filterOpened={false}
                    goBackActive={this.props.navigation.getParam("goBackActive", false)} />
                />

                <ListOfProtests style={styles.exampleBig} type={this.props.navigation.getParams("type", 0)} />

            </View>
        );
    }
}

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