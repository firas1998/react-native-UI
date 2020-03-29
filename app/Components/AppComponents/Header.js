import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class Header extends React.Component {


    render() {

        if (this.props.onProtestList) {
            return this.props.filterOpened ? this.renderProjectListFilterOpened() : this.renderProjectListFilterClosed();
        }
        if(this.props.goBackActive){
            return this.renderNormalHeaderWithBackButton();
        }

        return this.renderNormalHeader();

    }

    renderNormalHeaderWithBackButton() {
        return (
            <View style={styles.container}>

                <View style={styles.backContainer}>
                    <Icon1 name='ios-arrow-back' size={30} onPress={() => this.goBack()} />
                </View>

                <View style={styles.titleContainer}>

                    <Image style={styles.logo} source={require('./../../Assets/logoExample.jpg')} />

                    <Text style={styles.title} > Rize </Text>

                </View>

                <View style={styles.filterContainer}>

                </View>

            </View>
        );
    }

    renderNormalHeader() {
        return (
            <View style={styles.container}>

                <View style={styles.backContainer}>

                </View>

                <View style={styles.titleContainer}>

                    <Image style={styles.logo} source={require('./../../Assets/logoExample.jpg')} />

                    <Text style={styles.title} > Rize </Text>

                </View>

                <View style={styles.filterContainer}>

                </View>

            </View>
        );
    }

    renderProjectListFilterClosed() {

        return (
            <View style={styles.container}>

                <View style={styles.backContainer}>

                </View>

                <View style={styles.titleContainer}>

                    <Image style={styles.logo} source={require('./../../Assets/logoExample.jpg')} />

                    <Text style={styles.title} > Rize </Text>

                </View>

                <View style={styles.filterContainer}>

                    <Icon1 name='filter' size={30} onPress={() => this.props.filterOpened ? this.closeFilter() : this.openFilter()} />

                </View>

            </View>
        );
    }

    renderProjectListFilterOpened() {
        return (
            <View style={styles.container}>

                <View style={styles.backContainer}>

                </View>

                <View style={styles.titleContainer}>

                    <Image style={styles.logo} source={require('./../../Assets/logoExample.jpg')} />

                    <Text style={styles.title} > Rize </Text>

                </View>

                <View style={styles.filterContainer}>

                    <Icon2 name='filter' size={30} onPress={() => this.props.filterOpened ? this.closeFilter() : this.openFilter()} />

                </View>

            </View>
        );
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    openFilter = () => {
        this.props.navigation.push('FilterProtests');
    }

    closeFilter = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        paddingTop: getStatusBarHeight(),
    },

    backContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },

    titleContainer: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontWeight: "bold",
        fontSize: 30,
    },

    filterContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },

    logo: {
        height: 30,
        width: 30,
    },

    filter: {
        height: 30,
        width: 30,
    },

});