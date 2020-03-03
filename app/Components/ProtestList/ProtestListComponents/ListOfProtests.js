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

export default class ListOfProtests extends React.Component {

    jwt = null;

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
    }

    componentDidMount() {
        this.getToken();
    }

    getToken = async () => {
        var token = await AsyncStorage.getItem('jwt');

        if (jwt === null) {
            this.props.navigation.navigate('Login');
            return;
        }

        this.jwt = 'Bearer '.concat(jwt);
    }

    getProtests = async () => {

        const completeURL = apiData.url.concat(apiData.endpoints.protestsList);

        let headers = {
            Accept: 'application/json',
            Authorization: this.jwt,
        }

        let response = null;
        try {
            response = await fetch(completeURL, { method: 'GET', headers: headers });
        } catch (error) {
            console.log(error);
            return;
        }

        if (response.status === 200) {
            this.setState({ dataSource: response.json().protests, isLoading: false });
        }

    }

    renderItem = () => {

        <TouchableOpacity style={styles.itemContainer}>

            <View style={styles.itemContainer}>

                <View style={styles.itemContainer}>

                    <View style={styles.itemContainer}>

                    </View>

                    <View style={styles.itemContainer}>

                    </View>

                    <View style={styles.itemContainer}>

                    </View>

                    <View style={styles.itemContainer}>

                    </View>

                    <View style={styles.itemContainer}>

                    </View>

                </View>

                <View style={styles.itemContainer}>

                    <View style={styles.itemContainer}>

                    </View>

                    <View style={styles.itemContainer}>

                    </View>

                </View>

            </View>

        </TouchableOpacity>
    }

    render() {

    }
}

const styles = StyleSheet.create({

    itemContainer: {

    },

    halfItem: {

    },
});