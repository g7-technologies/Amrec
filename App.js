import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';




import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import Login from './Screens/Login'
import Drawer from './Screens/Drawer'
import ForgotPassword from './Screens/ForgotPassword'
import Register from './Screens/Register'

import Verify from './Screens/Verify'

export const Stack = createStackNavigator({
  
  Drawer,
  ForgotPassword,
  Register,
  Login,

 
},{
  headerMode:"none",

});

export const LoggingScreen = createStackNavigator({
  Login,
  Drawer,
  ForgotPassword,
  Register,
  

 
},{
  headerMode:"none",

});
const App =  createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Verify,
      Home:Stack,
      Logined:LoggingScreen
    }
  )
)
export default class Amrec extends Component{
  render(){
    return(
      <View style={{flex:1,marginTop:Dimensions.get('window').height<800?23:30}}>
        <App/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
