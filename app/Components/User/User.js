import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    AsyncStorage
} from 'react-native';
import Header from '../AppComponents/Header';
import NavBar from './../AppComponents/NavBar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const apiData = require('./../../Global/ApiData.json');

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dateCreated: "",
            protestsParticipatedIn: [],
            protestsCreated: []
        };
    }

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        // this.getToken();
        //this.getUser();
    }

    getToken = async () => {
        var jwt = await AsyncStorage.getItem('jwt');

        if (jwt === null) {
            alert('Your session ended. Please login')
            this.props.navigation.navigate('Login');
            return;
        }

        this.jwt = 'Bearer '.concat(jwt);
    }

    getUser = async () => {
        var username = this.props.navigation.getParam('username', 'name not found');

        const completeURL = apiData.url.concat(apiData.endpoints.getUser, username);

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
            this.setState({
                dateCreated: response.json().dateCreated,
                isLoading: false,
                protestsParticipatedIn: protestsParticipatedIn,
                protestsCreated: protestsCreated
            });
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <Header navigation={this.props.navigation} onProtestList={false} filterOpened={false} />

                <View style={styles.exampleBig}>

                    <View style={styles.usernameWrapper}>

                        <Text style={styles.username}>{this.props.navigation.getParam('username', 'name not found')}</Text> 
                        <Text style={styles.dateCreated}>User created on {this.state.dateCreated || "01/01/2020"}</Text>

                    </View>

                    <View style={styles.buttonsWrapper}>

                        <View style={styles.wrapper}>

                            <TouchableOpacity onPress={() => this.protestsPaticipatedIn()} >

                                <Text>Participated in {this.state.protestsParticipatedIn.length} protests</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={styles.wrapper}>

                            <TouchableOpacity onPress={() => this.protestsCreated()} >

                                <Text>Created {this.state.protestsCreated.length} protests</Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

                <NavBar navigation={this.props.navigation} />

            </View>
        );
    }

    protestsPaticipatedIn = () => {
        this.props.navigation.setParams({protestListType: 2, goBackActive: true});
        this.props.navigation.push('ProtestList');
    }

    protestsCreated = () => {
        this.props.navigation.setParams({protestListType: 1, goBackActive: true});
        this.props.navigation.push('ProtestList');
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    exampleBig: {
        flex: 11,
        justifyContent: "center",
        alignItems: "center",
    },

    examplesmall: {
        flex: 1,
        backgroundColor: '#fff',
    },

    usernameWrapper: {
        borderColor: '#000',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
        height: 50,
        width: 200,
        flex: 1,
    },

    username: {
        fontSize: 20,
    },

    dateCreated: {
        fontSize: 12,
        fontStyle: "italic",
    },

    wrapper: {
        borderColor: '#000',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        height: 50,
        width: 300,
        borderRadius: 5,
        backgroundColor: '#fff',
    },

    buttonsWrapper: {
        flex: 2,
    }

});