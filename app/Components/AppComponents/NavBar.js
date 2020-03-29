import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    AsyncStorage,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.username = "";
    }

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        //this.getUsername();
    }

    getUsername = async () => {
        var username = await AsyncStorage.getItem('username');

        if (username === null) {
            alert('Your session ended. Please login');
            this.props.navigation.navigate('Login');
            return;
        }

        this.username = username;
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.protestsTabContainer}>
                    <TouchableOpacity onPress={() => this.goToProtestsList()}>
                        <Image style={styles.logo} source={require('./../../Assets/logoExample.jpg')} />
                    </TouchableOpacity>
                </View>


                <View style={styles.searchTabContainer} >

                    <Icon1 name='search' size={30} onPress={() => this.goToSearch()} />

                </View>

                <View style={styles.profileTabContainer} >

                    <Icon2 name='account' size={30} onPress={() => this.goToProfile()} />

                </View>

            </View>
        );
    }

    goToProtestsList = () => {
        this.props.navigation.setParams({protestListType: 0});
        this.props.navigation.push('ProtestList');
    }

    goToSearch = () => {
        this.props.navigation.navigate('Search');
    }

    goToProfile = () => {
        this.props.navigation.setParams({username: "qqq"}); //put this.username
        this.props.navigation.navigate('User');
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
    },

    protestsTabContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },

    logo: {
        height: 30,
        width: 30,
    },

    searchTabContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },

    profileTabContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },

});