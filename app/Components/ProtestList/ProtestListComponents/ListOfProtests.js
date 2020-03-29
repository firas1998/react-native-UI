import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';

const apiData = require('./../../../Global/ApiData.json');

export default class ListOfProtests extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoading: true,
            dataSource: [],
        }

        this.jwt = null;
        this.username = null;
    }

    componentDidMount() {
        this.getToken();
    }

    getToken = async () => {
        var jwt = await AsyncStorage.getItem('jwt');
        var username = await AsyncStorage.getItem("username");

        if (jwt === null || jwt === "" || username === "" || username === null) {
            alert("Your session has ended. Please login");

            this.props.navigation.navigate('Login');
            return;
        }
        this.username = username;
        this.jwt = 'Bearer '.concat(jwt);
    }

    getProtests = async () => {

        const completeURL;
        let headers = {
            Accept: 'application/json',
            Authorization: this.jwt,
        };

        switch (this.props.type) {

            case 0:
                completeURL = apiData.url.concat(apiData.endpoints.protestsList);
                break;
            case 1:
                completeURL = apiData.url.concat(apiData.endpoints.protestsCreated, this.username);
                break;
            case 2:
                completeURL = apiData.url.concat(apiData.endpoints.protestsParticipated, this.username);
                break;
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

    renderItem = (protest) => {

        <View style={styles.protestWrapper}>

            <TouchableOpacity style={styles.protestButton} onPress={() => this.goToProtest(protest.protestID)}>

                <View style={styles.protestContainer}>

                    <View style={styles.protestHalf}>

                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{protest.protestID} {protest.title}</Text>
                        </View>

                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{protest.purpose.purpose}</Text>
                        </View>

                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{protest.city.cityName}</Text>
                        </View>

                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{protest.dateOfProtest}</Text>
                        </View>

                    </View>

                    <View style={styles.protestHalf}>

                        <View style={styles.textWrapper}>
                            <TouchableOpacity onPress={() => this.goToUser(protest.creatorID.username)}>
                                <Text style={styles.text}>{protest.creatorID.username}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{protest.dateCreated}</Text>
                        </View>

                    </View>

                </View>

            </TouchableOpacity>

        </View>
    }

    goToProtest = (protestID) => {
        this.props.navigtion.setParams({ protestID: protestID });
        this.props.navigation.push("Protest");
    }

    goToUser = (username) => {
        this.props.navigation.setParams({username: username}); //put this.username
        this.props.navigation.navigate('User');
    }

    renderSeperator = () => {
        return (
            <View style={styles.seperator}></View>
        );
    }

    render() {

        this.state.isLoading ?

            <View style={styles.otherCotnainer} >
                <ActivityIndicator size="large" color="#330066" animating />
            </View>

            :
            (
                this.state.error

                    ?

                    <View style={styles.otherCotnainer}>
                        <Text style={styles.errorText}>Something went wrong, please try again.</Text>
                    </View>

                    :

                    <View style={styles.container}>

                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem.bind(this)}
                            ItemSeparatorComponent={this.renderSeperator}
                        />

                    </View>
            )
    }
}

const globalStyles = require('./../../../Global/GlobalStyles.json');

const styles = StyleSheet.create({

    container: {
        flex: 11,
    },

    protestWrapper: {
        height: 300,
        borderWidth: 1,
        borderColor: '#000',
    },

    otherCotnainer: {
        alignItems: "center",
        justifyContent: "center",
    },

    errorText: {
        color: globalStyles.error,
    },

    protestContainer: {
        flex: 1,
        flexDirection: "row",
    },

    protestHalf: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
    },

    protestInfo: {
        flex: 1
    },

    idWrapper: {
        flex: 1,
    },

    titleWrapper: {
        flex: 1,
    },

    textWrapper: {
        flex: 1,
    },

    text: {
        fontWeight: "bold",
        fontSize: 14,
    },

    seperator: {
        height: 1,
        borderWidth: 1,
    },

});