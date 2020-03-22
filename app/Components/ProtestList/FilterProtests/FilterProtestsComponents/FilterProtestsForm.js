import React from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    Text,
    TouchableOpacity,
} from 'react-native';
import DatePicker from './../../../AppComponents/DatePicker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/AntDesign';

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
            cities: [{ value: -1, label: '' }, { value: 1, label: 'test' }, { value: 2, label: 'test1' }, { value: 3, label: 'test2' }, { value: 4, label: 'test3' }, { value: 5, label: 'test4' }],
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

    onConfirmStart = (startDate) => {
        this.setState({ isStartPickerVisible: false, startDate: startDate, isStartDateSet: true });
    }

    removeStartDate = () => {
        this.setState({ isStartPickerVisible: false, startDate: '______________', isStartDateSet: false });
    }

    onConfirmEnd = (endDate) => {
        this.setState({ isEndPickerVisible: false, endDate: endDate, isEndDateSet: true });
    }

    removeEndDate = () => {
        this.setState({ isEndPickerVisible: false, endDate: '______________', isEndDateSet: false });
    }

    setCity = (cityID) => {
        console.log(cityID);
        this.setState({ cityID: cityID });
    }

    setCountry = (countryID) => {
        this.setState({ countryID: countryID });
    }

    setPurpose = (purposeID) => {
        this.setState({ purposeID: purposeID });
    }


    render() {

        const countryPickerPlaceholder = {
            label: 'Select a country...',
            value: -1,
            color: '#9EA0A4',
        };

        const cityPickerPlaceholder = {
            label: 'Select a city...',
            value: -1,
            color: '#9EA0A4',
        };

        const purposePickerPlaceholder = {
            label: 'Select a purpose...',
            value: -1,
            color: '#9EA0A4',
        };

        return (
            <View style={styles.container} >

                <View style={styles.dateContainers} >

                    <DatePicker name='From' onConfirm={this.onConfirmStart} onDelete={this.removeStartDate} />

                    <DatePicker name='To' onConfirm={this.onConfirmEnd} onDelete={this.removeEndDate} />

                </View>

                <View style={styles.inputContainers} >

                    <View style={styles.pickerContainer} >

                        <RNPickerSelect
                            style={pickers}
                            placeholder={countryPickerPlaceholder}
                            onValueChange={this.setCountry}
                            items={this.state.cities}
                            Icon={()=> {return (<Icon name='down' size={20} />);}}
                        />

                    </View>

                </View>

                <View style={styles.inputContainers} >

                    <View style={styles.pickerContainer} >

                        <RNPickerSelect
                            style={pickers}
                            placeholder={cityPickerPlaceholder}
                            onValueChange={this.setCity}
                            items={this.state.cities}
                            Icon={()=> {return (<Icon name='down' size={20} />);}}
                        />

                    </View>

                </View>

                <View style={styles.inputContainers} >

                    <View style={styles.pickerContainer} >

                        <RNPickerSelect
                            style={pickers}
                            placeholder={purposePickerPlaceholder}
                            onValueChange={this.setPurpose}
                            items={this.state.cities}
                            Icon={()=> {return (<Icon name='down' size={20} />);}}
                        />

                    </View>

                </View>

                <View style={styles.inputContainers}>

                    <TouchableOpacity style={styles.submitContainer} >

                        <Text style={styles.submitText} onPress={() => this.onFilter()}>Filter</Text>

                    </TouchableOpacity>

                </View>

            </View>
        );
    }

    onFilter = () => {
        alert("filtering");
    }


}

const styles = StyleSheet.create({

    pickerContainer: {
        justifyContent: "center",
        flex: 1,
    },

    container: {
        flex: 12,
        backgroundColor: '#fff',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
    },

    dateContainers: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: 'center',
    },

    inputContainers: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
    },

    submitContainer: {
        height: 50 ,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        borderRadius: 5,
    },

    submitText: {
        color: '#fff',
        fontSize: 18
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

const pickers = StyleSheet.create({

    inputIOS: {
        borderWidth: 1,
        color: 'black',
        fontSize: 22,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 12,
    },

    inputAndroid: {
        borderWidth: 1,
        color: 'black',
        fontSize: 20,
        height: 50,
        borderRadius: 5,
    },

    iconContainer: {
        height: '100%',
        justifyContent: 'center',
    }
});