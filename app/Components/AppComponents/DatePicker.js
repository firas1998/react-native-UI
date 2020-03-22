import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '______________',
            isPickerVisible: false,
            isDateSet: false,
        };
    }

    onConfirm = (date) => {
        var formatedDate = moment(date).format('DD/MM/YYYY');
        this.setState({ isPickerVisible: false, date: formatedDate, isDateSet: true });
        this.props.onConfirm(formatedDate);    
    }

    openPicker = () => {
        this.setState({ isPickerVisible: true });
    }

    onCancel = () => {
        this.setState({ isPickerVisible: false });
    }

    removeDate = () => {
        this.setState({ isPickerVisible: false, date: '______________', isDateSet: false });
        this.props.onDelete();
    }

    render() {
        return (
            <View style={styles.datePicker}>

                <View style={styles.labelContainer}>

                    <View style={styles.textLabel}>

                        <Text style={styles.label} >{this.props.name}</Text>

                    </View>

                    {
                        this.state.isDateSet && (
                            <View style={styles.iconLabel}>
                                <Icon style={styles.icon} name='cancel' size={20} onPress={this.removeDate} />
                            </View>
                        )
                    }

                </View>

                <TouchableOpacity style={styles.dateStyle} onPress={this.openPicker} >
                    <Text style={styles.dateDisplay} >{this.state.date}</Text>
                </TouchableOpacity>

                <DateTimePicker
                    isVisible={this.state.isPickerVisible}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    mode={'date'}

                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    labelContainer: {
        flexDirection: "row",
    },

    label: {
        opacity: 0.5,
    },

    datePicker: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },

    picker: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: 'black',
    },

    dateStyle: {
        marginTop: 5,
    },

    iconLabel: {
        alignItems: "flex-end",
        flex: 1,
    },

    icon: {

    },

    dateDisplay: {
        textDecorationLine: "underline",
        opacity: 0.7,
    },

    textLabel: {
        flex: 1,
    },
});