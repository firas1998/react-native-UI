import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import Header from '../AppComponents/Header';
import SearchForm from './SearchComponents/SearchForm';
import NavBar from '../AppComponents/NavBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class Search extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container} >

                <Header navigation={this.props.navigation} onProtestsList={false} fitlerOpened={false} />

                <SearchForm />

                <NavBar navigation={this.props.navigation} />

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

});