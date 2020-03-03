import React, { useDebugValue } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    FlatList,
    Text,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const apiData = require('./../../../Global/ApiData.json');

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataIsProtests: false,
            dataIsUsers: false,
            searchTerm: '',
            dataSource: [],
            isLoading: false,
            noData: true,
        }
        this.jwt = '';
    }

    componentDidMount(){
        this.jwt = this.getJWT();
    }

    getJWT = async () => {

        let jwt = await AsyncStorage.getItem('jwt');

        if (jwt === null || jwt === '') {
            this.props.navigation.navigate(Login);
            return;
        }

        return jwt;
    }

    renderProtests = ({ protest }) => {

        if (this.state.noData) {

            return (
                <View>
                    <Text>User or project do not exist</Text>
                </View>
            );
        }

        return (
            <View>

                <TouchableOpacity>

                    <View style={styles.protestWrapper}>

                    </View>

                </TouchableOpacity>

            </View>
        );
    }

    renderUsers = ({ user }) => {

        if (this.state.noData) {

            return (
                <View>
                    <Text>User or project do not exist</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity>

                <View style={styles.userWrapper}>

                    <View style={styles.usernameWrapper}>

                        <Text>{user.username}</Text>

                    </View>

                    <View style={styles.creationDateWrapper}>

                        <Text>Joined {user.createdOn}</Text>

                    </View>

                </View>

            </TouchableOpacity>

        );
    }

    renderOtherCases = () => {
        return (
            <View>

            </View>
        );
    }

    itemSeperator = () => {
        return (
            <View style={styles.itemSeperator}></View>
        );
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color='#000' animating />
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <TextInput style={styles.textInput} placeholder='Search username or protest ID'
                    onChangeText={(searchTerm) => this.search(searchTerm)}
                    defaultValue={this.state.searchTerm}
                />

                <FlatList data={this.state.dataSource}
                    renderItem={
                        this.state.dataIsUsers ? this.renderUsers :
                            (this.state.dataIsProtests ? this.renderProtests : this.renderOtherCases)
                    }
                    itemSeperator={this.itemSeperator}
                />

            </View>

        );
    }

    search = async (searchTerm) => {

        let completeURL = apiData.url.concat(apiData.endpoint.search, searchTerm);

        let headers = {
            Accept: 'application/json',
            Authorization: this.jwt,
        }

        let response = null;

        try {
            this.setState({ isLoading: true });
            response = fetch(completeURL, { method: 'GET', headers: headers });
            this.setState({ isLoading: false });
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
            return;
        }

        this.handleResponse(response);
    }

    handleResponse(response) {

        body = response.json();

        if (response.status === 401) {
            alert('Your session has ended, please login again');
            this.props.navigation.navigate('Login');
        }

        response.status === 404 ? this.setState({ noData: true }) : this.setState({ noData: false });

        this.setState({ dataIsProtests: body.isProtests, dataIsUsers: body.isUsers, dataSource: body.items });

    }
}

const globalStyles = require('./../../../Global/GlobalStyles.json');

const styles = StyleSheet.create({

    loadingContainer: {

    },

    container: {
        flex: 11,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
    },

    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        height: globalStyles.textInput.height,
        width: globalStyles.textInput.width,
        borderRadius: globalStyles.textInput.borderRadius,
        borderColor: globalStyles.errors.color,
        borderWidth: 0,
    },

    userWrapper: {
        flexDirection: "row",
        flex: 1,
        padding: 10,
        marginBottom: 3,
        alignItems: "center",
    },

    usernameWrapper: {
        flex: 1,
        alignItems: "flex-start",
    },

    creationDateWrapper: {
        flex: 1,
        alignItems: 'flex-end',
    },

    protestWrapper: {

    },

    itemSeperator: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
    }

});