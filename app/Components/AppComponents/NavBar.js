import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NavBar extends React.Component {

    render() {
        return (
            <View style={styles.container} >

                <View style={styles.protestsTabContainer} >
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
        alert('go to protests list');
        this.props.navigation.navigate('ProtestList');
    }

    goToSearch = () => {
        alert('go to search');
        this.props.navigation.navigate('Search');
    }

    goToProfile = () => {
        alert('go to user');
        this.props.navigation.navigate('Profile');
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