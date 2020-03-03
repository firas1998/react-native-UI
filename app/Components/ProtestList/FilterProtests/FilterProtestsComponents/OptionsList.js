import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class OptionsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderItem(item) {

        let id;
        let name;



        switch (this.props.type) {
            case 0:
                id = item.item.cityID;
                name = item.item.cityName;
                break;
            case 1:
                id = item.item.countryID;
                name = item.item.countryName;
                break;
            case 2:
                id = item.item.purposeID;
                name = item.item.purpose;
                break;
        }

        

        return (
            <TouchableOpacity onPress={() => this.setItem(id, name)}>

                <View style={styles.itemWrapper}>


                    <View style={styles.nameWrapper}>

                        <Text>{name}</Text>

                    </View>

                    {
                        this.props.selectedID === id && (

                            <View style={styles.iconWrapper}>

                                <Icon name='check' size={30} color='green' />

                            </View>

                        )
                    }

                </View>

            </TouchableOpacity>

        );
    }

    setItem = (id, name) => {
        this.props.setItem(this.props.type, id, name);
    }   

    renderSeperator = () => {
        return (
            <View style={styles.seperator}></View>
        );
    }

    closeModal = () => {
        this.props.changeModalVisibility(false);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem.bind(this)}
                    ItemSeparatorComponent={this.renderSeperator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
    },

    itemWrapper: {
        flexDirection: "row",
    },

    nameWrapper: {
        paddingLeft: 10,
        flex: 1,
    },

    iconWrapper: {
        alignItems: "flex-end",
        flex: 1,
        paddingRight: 10,
    },

    seperator: {
        height: 1,
        borderWidth: 1,
    },

});