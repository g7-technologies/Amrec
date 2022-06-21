import React, { Component } from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons,AntDesign} from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
export default class AboutUS extends Component {
    static navigationOptions = {
        title:'About us',
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
          name="account-group" size={20}
          style={{ color: tintColor }}
          />
        )
      
        };
    render(){
        return (
            <ScrollView
            style={{
                flex: 1,
                 }}>
                <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={{flex:1}}>
                <View style={{flex:0.1,padding:5}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
            <AntDesign name="arrowleft" color={'#fff'}  size={25}  />
          </TouchableOpacity>
        </View>
           <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20}}>About Us</Text>
            </View>
            <View style={{flex:1,padding:10}}>
                <Text style={{textAlign:'justify'}}>At AMREC, we believe that if the world was presented with an affordable, clean energy solution that is not dependent on subsidies, we will not only be the world’s most in demand energy source, but we will also be improving the quality of life for future generations.

The scientists at AMREC have taken hundreds of years of wind energy research and have created the simplest, cost-effective solution to the world’s clean energy demands.
The earth’s population continues to increase and the demand for energy increases exponentially. The demand for renewable energy sources continues to soar.

However, the issue that continues to face the renewable energy industry is reliability and price.

AMREC (American Renewable Energy Corporation) is a cutting edge renewable energy innovator. While we intend to expand our reach into multiple sources of clean, renewable energy, we currently have a global patent on the world’s safest, most efficient and most cost effective, wind energy technology.</Text>
            </View>
           
            </LinearGradient>
            </ScrollView>
        )
    }
}
