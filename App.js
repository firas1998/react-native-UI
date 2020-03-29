import React, { Component } from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './app/Components/Login/Login'
import CreateAccount from './app/Components/CreateAccount/CreateAccount';
import PasswordReset from './app/Components/PasswordReset/PasswordReset'
import ProtestList from './app/Components/ProtestList/ProtestList';
import FilterProtests from './app/Components/ProtestList/FilterProtests/FilterProtests';
import Search from './app/Components/Search/Search';
import User from './app/Components/User/User'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const RootStack = createStackNavigator(
  {
    User: {screen: User},
    ProtestList: { screen: ProtestList },
    Login: { screen: Login },
    CreateAccount: { screen: CreateAccount},
    PasswordReset: { screen: PasswordReset },
    FilterProtests: { screen: FilterProtests },
    
    Search: { screen: Search },
  }
);

const Application = createAppContainer(RootStack)

export default class App extends Component {
  render() {
    return (
      <Application />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
