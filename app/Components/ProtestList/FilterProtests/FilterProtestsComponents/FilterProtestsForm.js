import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    Text,
    TouchableOpacity,
    Picker,
    Modal,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import OptionsList from './OptionsList.js';

const apiData = require('./../../../../Global/ApiData.json');

export default class FilterProtestForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: '______________',
            endDate: '______________',
            countryID: -1,
            country: '',
            cityID: -1,
            city: '',
            purposeID: -1,
            purpose: '',
            isStartPickerVisible: false,
            isEndPickerVisible: false,
            isStartDateSet: false,
            isEndDateSet: false,
            cities: [{ cityID: -1, cityName: '' }, { cityID: 1, cityName: 'test' }, { cityID: 2, cityName: 'test1' }, { cityID: 3, cityName: 'test2' }, { cityID: 4, cityName: 'test3' }, { cityID: 5, cityName: 'test4' }],
            countries: [{ cityID: -1, cityName: '' }, { cityID: 1, cityName: 'test' }, { cityID: 2, cityName: 'test1' }, { cityID: 3, cityName: 'test2' }, { cityID: 4, cityName: 'test3' }, { cityID: 5, cityName: 'test4' }],
            purposes: [{ cityID: -1, cityName: '' }, { cityID: 1, cityName: 'test' }, { cityID: 2, cityName: 'test1' }, { cityID: 3, cityName: 'test2' }, { cityID: 4, cityName: 'test3' }, { cityID: 5, cityName: 'test4' }],
            isModalVisible: false,
        };
        this.cities = 0;
        this.countries = 1;
        this.purposes = 2;
        this.jwt = '';
    }

    componentDidMount() {
        //this.jwt = this.getJWT();
        // this.state.countries = this.getCountries();
        //this.state.cities = this.getCities();
        //this.state.purposes = this.getPurposes();
    }

    getJWT = async () => {

        let jwt = await AsyncStorage.getItem('jwt');

        if (jwt === null || jwt === '') {
            alert('Your session expired, please login again');
            this.props.navigation.navigate('Login');
            return;
        }

        return jwt;
    }

    getPurposes = async () => {

        const completeURL = apiData.url.concat(apiData.endpoints.purposes);

        let headers = {
            Accept: 'application/json',
            Authorization: this.jwt,
        }

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'GET', headers: headers });
        } catch (error) {
            console.log(error);
        }

        if (response.status === 401) {
            alert('Your session has ended, please login again');
            this.props.navigation.navigate('Login');
        }

        this.setState({ purposes: response.json() })
    }

    getCountries = async () => {

        const completeURL = apiData.url.concat(apiData.endpoints.countries);

        let headers = {
            Accept: 'application/json',
            Authorization: this.jwt,
        }

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'GET', headers: headers });
        } catch (error) {
            console.log(error);
        }

        if (response.status === 401) {
            alert('Your session has ended, please login again');
            this.props.navigation.navigate('Login');
        }

        this.setState({ countries: response.json() })
    }

    getCities = async () => {

        const completeURL = apiData.url.concat(apiData.endpoints.cities);

        let headers = {
            Accept: 'application/json',
            Authorization: this.jwt,
        }

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'GET', headers: headers });
        } catch (error) {
            console.log(error);
        }

        console.log(response.status);
        if (response.status === 401) {
            alert('Your session has ended, please login again');
            this.props.navigation.navigate('Login');
        }

        this.setState({ cities: response.json() })
    }

    getCitiesInCountry = async (country) => {

        const completeURL = apiData.url.concat(apiData.endpoints.cities, country);

        let headers = {
            Accept: 'application/json',
            Authorization: this.jwt,
        }

        let response = null;

        try {
            response = await fetch(completeURL, { method: 'GET', headers: headers });
        } catch (error) {
            console.log(error);
        }

        if (response.status === 401) {
            alert('Your session has ended, please login again');
            this.props.navigation.navigate('Login');
        }

        this.setState({ cities: response.json() })
    }

    onConfirmStart = ({ startDate }) => {
        this.setState({ isStartPickerVisible: false, startDate: moment(startDate).format('DD/MM/YYYY'), isStartDateSet: true });
    }

    openStartPicker = () => {
        this.setState({ isStartPickerVisible: true });
    }

    onCancel = () => {
        this.setState({ isStartPickerVisible: false, isEndPickerVisible: false });
    }

    onConfirmEnd = ({ endDate }) => {
        this.setState({ isEndPickerVisible: false, endDate: moment(endDate).format('DD/MM/YYYY'), isEndDateSet: true });
    }

    openEndPicker = () => {
        this.setState({ isEndPickerVisible: true });
    }

    removeStartDate = () => {
        this.setState({ isStartPickerVisible: false, startDate: '______________', isStartDateSet: false });
    }

    removeEndDate = () => {
        this.setState({ isStartPickerVisible: false, endDate: '______________', isEndDateSet: false });
    }

    onChangeCity = (cityID, city) => {
        this.setState({ cityID: cityID, city: city });
    }

    onChangeCountry = (countryID, country) => {
        this.setState({ countryID: countryID, country: country });
        countryID === 0 ? this.setState({ cities: this.getCities() }) : this.setState({ cities: this.getCitiesInCountry(countryID) });
    }

    onChangePurpose = (purposeID, purpose) => {
        this.setState({ purposeID: purposeID, purpose: purpose });
    }

    changeModalVisibility = (visible) => {
        this.setState({ isModalVisible: visible });
    }

    setSelectedItem = (itemType, id, name) => {
        console.log(itemType);
        switch (itemType) {
            case 0:
                this.setState({ cityID: id, city: name, isModalVisible: false });
                break;
            case 1:
                this.setState({ countryID: id, country: name, isModalVisible: false });
                break;
            case 2:
                this.setState({ purposeID: id, purpose: name, isModalVisible: false });
                break;
        }
    }

    render() {

        return (
            <View style={styles.container} >

                <View style={styles.inputContainers} >

                    <View style={styles.datePicker}>

                        <View style={styles.labelContainer}>

                            <View style={styles.textLabel}>

                                <Text style={styles.label} >From</Text>

                            </View>

                            {
                                this.state.isStartDateSet && (
                                    <View style={styles.iconLabel}>
                                        <Icon style={styles.iconStart} name='cancel' size={20} onPress={this.removeStartDate} />
                                    </View>
                                )}

                        </View>

                        <TouchableOpacity style={styles.dateStyle} onPress={this.openStartPicker} >
                            <Text style={styles.dateDisplay} >{this.state.startDate}</Text>
                        </TouchableOpacity>

                    </View>

                    <DateTimePicker
                        isVisible={this.state.isStartPickerVisible}
                        onConfirm={this.onConfirmStart}
                        onCancel={this.onCancel}
                        mode={'date'}

                    />

                    <View style={styles.datePicker} >

                        <View style={styles.labelContainer}>

                            <View style={styles.textLabel}>

                                <Text style={styles.label} >To</Text>

                            </View>

                            {
                                this.state.isEndDateSet && (
                                    <View style={styles.iconLabel}>
                                        <Icon style={styles.iconEnd} name='cancel' size={20} onPress={this.removeEndDate} />
                                    </View>
                                )}


                        </View>

                        <TouchableOpacity style={styles.dateStyle} onPress={this.openEndPicker} >
                            <Text style={styles.dateDisplay} >{this.state.endDate}</Text>
                        </TouchableOpacity>

                    </View>

                    <DateTimePicker
                        isVisible={this.state.isEndPickerVisible}
                        onConfirm={this.onConfirmEnd}
                        onCancel={this.onCancel}
                        mode={'date'}

                    />



                </View>

                <View style={styles.inputContainers} >

                    <TouchableOpacity onPress={() => this.changeModalVisibility(true)}>
                        {(this.state.cityID === -1 && (<Text>Select city</Text>)) || <Text>{this.state.city}</Text>}
                    </TouchableOpacity>
                    <Modal visible={this.state.isModalVisible} onRequestClose={() => this.changeModalVisibility(false)} animationType='fade'>

                        <OptionsList
                            type={0} data={this.state.cities}
                            setItem={this.setSelectedItem}
                            changeModalVisibility={this.changeModalVisibility}
                            selectedID={this.state.cityID}
                        />

                    </Modal>

                </View>

                <View style={styles.inputContainers} >

                    <TouchableOpacity onPress={() => this.changeModalVisibility(true)}>

                        {(this.state.cityID === -1 && (<Text>Select country</Text>)) || <Text>{this.state.city}</Text>}

                    </TouchableOpacity>

                    <Modal visible={this.state.isModalVisible} onRequestClose={() => this.changeModalVisibility(false)} animationType='fade'>

                        <OptionsList
                            type={1} data={this.state.countries}
                            setItem={this.setSelectedItem}
                            changeModalVisibility={this.changeModalVisibility}
                            selectedID={this.state.countryID}
                        />

                    </Modal>

                </View>

                <View style={styles.inputContainers} >

                    <TouchableOpacity onPress={() => this.changeModalVisibility(true)}>

                        {(this.state.cityID === -1 && (<Text>Select purpose</Text>)) || <Text>{this.state.city}</Text>}

                    </TouchableOpacity>

                    <Modal visible={this.state.isModalVisible} onRequestClose={() => this.changeModalVisibility(false)} animationType='fade'>

                        <OptionsList
                            type={2} data={this.state.purposes}
                            setItem={this.setSelectedItem}
                            changeModalVisibility={this.changeModalVisibility}
                            selectedID={this.state.purposeID}
                        />

                    </Modal>

                </View>

                <TouchableOpacity style={styles.submitContainer} >

                </TouchableOpacity>

            </View>
        );
    }




}

const globalStyles = require('./../../../../Global/GlobalStyles.json');

const styles = StyleSheet.create({

    container: {
        flex: 12,
        backgroundColor: '#fff',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
    },

    inputContainers: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 1,
    },

    submitContainer: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: 'blue',
    },

    datePicker: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 1,
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

    labelContainer: {
        flexDirection: "row",
    },

    label: {
        opacity: 0.5,
    },

    dateDisplay: {
        textDecorationLine: "underline",
        opacity: 0.7,
    },

    iconStart: {
    },

    iconEnd: {
    },

    textLabel: {
        flex: 1,
    },

    iconLabel: {
        alignItems: "flex-end",
        flex: 1,
    },

});