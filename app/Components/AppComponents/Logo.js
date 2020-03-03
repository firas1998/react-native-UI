import React from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';

export default class Logo extends React.Component{
    
    render() {
        return (

            <View style={styles.container}>

                <Image style={styles.logo} source={require('./../../Assets/logoExample.jpg')} />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },

    logo: {
        width: 100,
        height: 100,
    },

});