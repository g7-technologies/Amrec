import React, { Component } from 'react';
import {Image,View,AsyncStorage,Text,Switch}from 'react-native'
import {createAppContainer, NavigationEvents,} from 'react-navigation';
import { createDrawerNavigator,DrawerItems  } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'; 
import Home from './Home'
import PrivacyPolicy  from './PrivacyPolicy'
import AboutUS from './AboutUS'
import Logout from './Logout'
import ChangePassword from './ChangePassword'

import Fingerprint from './FingerPrint'
const contentComponentOption=(props)=>(
   <View style={{flex:1}}>
      <View style={{marginVertical:20,justifyContent:'center',alignItems:'center',borderBottomColor:'#dddddd'}}>
         <Image source={require('../assets/logo1.png')} style={{borderRadius:100,borderWidth:4,width:150,height:150}} />
      </View>
      <View style={{borderBottomColor:'#dddddd'}}>
         <DrawerItems  {...props} />
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      
  
      </View>
   </View>
);

   const sidebar = createDrawerNavigator({   
      Home,PrivacyPolicy,AboutUS,ChangePassword,Fingerprint,Logout
   },{
    contentComponent:contentComponentOption,
    
   });  
  
   const Drawer = createAppContainer(sidebar);
  
  export default Drawer;
 

  