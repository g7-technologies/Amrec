import React, { Component } from 'react';
import { Text, View,TouchableOpacity ,AsyncStorage,Switch,Image } from 'react-native';
import { Foundation,AntDesign,Ionicons} from '@expo/vector-icons'; 
import Toast from 'react-native-tiny-toast'
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { setWorldOriginAsync } from 'expo/build/AR';
export default class PrivacyPolicy extends Component {
    static navigationOptions = {
        title:'Use FingerPrint',
        drawerIcon: ({ tintColor }) => (
            <Ionicons
            name="md-finger-print" size={20}
            style={{ color: tintColor }}/>
        )  
    };
    constructor(props){
        super(props);
        this.state={
            email:'',
            value:''
        }
        this.leadDeveloper()
    }
    leadDeveloper=async()=>{
        var thumb= await AsyncStorage.getItem('thumb')
        var email=await AsyncStorage.getItem('email')
        this.setState({email:email})
        var fingerprint=await LocalAuthentication.hasHardwareAsync();
        var checkBiomatricType=await LocalAuthentication.supportedAuthenticationTypesAsync()
        if(fingerprint){
           var checkBiomatricType=await LocalAuthentication.supportedAuthenticationTypesAsync()
           if(checkBiomatricType[0]){
              if(thumb==1){
                    this.setState({value:true})
              }else{
                    this.setState({value:false})
              }
           }else{
              console.log('**finger nai ha')
           }
        }else{
           console.log('**finger detec nai ha')
        }
    }


    addfingerprint=async()=>{
        const formData = new FormData()
        formData.append('email', this.state.email);
        formData.append('thumb', 'true');
        try{
        fetch(`http://amrec.assadcrm.com/api/thumb.php`, {
           method: 'POST',
           headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
           },
           body:formData
        })
        .then((response) => response.json())
        .then((responseJson) => {   
           if(responseJson.error == true){
            Toast.show(responseJson.error_msg)
           }else{
                Toast.show(responseJson.success_msg)
                this.setaasync('1')
                this.setState({value:true})
           }
        })
        .catch((error) =>{});
        }catch(e){}
    }


    removefingerprint=async()=>{
        const formData = new FormData()
        formData.append('email', this.state.email);
        formData.append('thumb', 'false');
        try{
        fetch(`http://amrec.assadcrm.com/api/thumb.php`, {
           method: 'POST',
           headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
           },
           body:formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
           if(responseJson.error == true){
           Toast.show(responseJson.error_msg)
           }else{
                Toast.show(responseJson.success_msg)
                this.setState({value:false})
                this.setaasync('2')
           }
        })
        .catch((error) =>{});
        }catch(e){}
   }

   setaasync=async(a)=>{
    await AsyncStorage.setItem('thumb',a)
    //alert('dasdasdas')
   }

    render(){
        return (
            <View style={{flex: 1,}}>
               <View style={{flex:0.1,padding:5}}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                        <AntDesign name="arrowleft"  size={25}  />
                  </TouchableOpacity>
               </View>
                   
               <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                  {this.state.value?  
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                     <Ionicons name="md-finger-print" onPress={()=>this.removefingerprint()} size={180} color="red" />
                     <Text style={{marginLeft:30,fontWeight:'bold'}} onPress={()=>this.removefingerprint()}>Remove Fingerprint</Text>
                  </View>:
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                     <Ionicons name="md-finger-print" onPress={()=>this.addfingerprint()} size={180} color="green" />
                     <Text style={{marginLeft:30,fontWeight:'bold'}} onPress={()=>this.addfingerprint()}>Add Fingerprint</Text>
                  </View>}
               </View>               
            </View>
        )
    }
}
