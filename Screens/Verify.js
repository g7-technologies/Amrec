import React, { Component } from 'react';
import { AsyncStorage,View,Image,BackHandler ,} from 'react-native';
import { NavigationEvents } from 'react-navigation';
export default class HelloWorldApp extends Component {
  constructor(props){
    super(props)
    this.checkLogin()
  }
  checkLogin = async () => {
    const userToken = await AsyncStorage.getItem('IsLogedin');
      setTimeout(()=>{
      
      if(userToken==1){
        this.props.navigation.navigate('Home'); 
      }else if(userToken==0){
      this.props.navigation.navigate('Logined');
      }else{
        this.props.navigation.navigate('Logined');
      }
    }, 2550);
  };
      
  render() {  
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1,backgroundColor:'#E2E2E2',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../assets/gif.gif')} style={{width:'100%',height:'30%'}} /> 
      </View>
    );
  }
}