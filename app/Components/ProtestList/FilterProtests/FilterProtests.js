import React from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NavBar from '../../AppComponents/NavBar';
import FilterProtestForm from './FilterProtestsComponents/FilterProtestsForm';
import Header from '../../AppComponents/Header';

export default class FilterProtests extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    render() {
        return (

            <View style={styles.container}>

                <Header  navigation={this.props.navigation} onProtestList={true} filterOpened={true}/>

                <FilterProtestForm navigation={this.props.navigation} />

            </View>
        );
    }
}

const globalStyles = require('./../../../Global/GlobalStyles.json');

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
    },


});