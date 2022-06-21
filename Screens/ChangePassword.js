import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,ScrollView,TextInput,TouchableOpacity,Image,Animated,ActivityIndicator, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast'
export default class ChangePassword extends Component {
  
  static navigationOptions = {
    title:'Change Password',
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="key-change" size={20} style={{ color: tintColor }}/>
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      oldpassword:'',
      Newpassword:'',
      Confirmpassword:'',
      email:'',
      isLoading:false
    };
    this.getEmail()
  }


  getEmail=async()=>{
    var email=  await AsyncStorage.getItem('email')
    this.setState({email:email})
  }

  ChangePasswordRequest = () =>{
   this.setState({isLoading:true})
   const formData = new FormData()
   formData.append('email', this.state.email);
   formData.append('old_password', this.state.oldpassword);
   formData.append('new_password', this.state.Newpassword);
   try{
     fetch(`http://amrec.assadcrm.com/api/change_password.php`, {
       method: 'POST',
       headers: {
         Accept: "application/json",
         "Content-Type": "multipart/form-data",
       },
       body:formData
     })
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({isLoading:false})
       if(responseJson.error == true){
        Toast.show(responseJson.error_msg)
       }else{
         Toast.show(responseJson.success_msg)
       }
     })
     .catch((error) =>{});
   }catch(e){}
  }

  managePasswordVisibility = () =>{
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  validate=()=>{
    const {oldpassword,Newpassword,Confirmpassword}=this.state
    if(oldpassword===''||Newpassword==='',Confirmpassword===''){
      this.setState({errmsg:'All Fields requires'})
      return;
    }else if(Newpassword!==Confirmpassword){
      this.setState({errmsg:'New and Confirm Password do not Match'})
    }
    else{
      this.ChangePasswordRequest()
    }
  }

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={{flex:1}}>
          <View style={{flex:0.1}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                <AntDesign name="arrowleft" color={'#fff'}  size={25}  />
              </TouchableOpacity>
          </View>
          <Animated.View style={{flex:1}}>
                <Image source={require('../assets/logo1.png')} style={styles.logo}/>
                <Text style={{color:'#fff',marginVertical:10,textAlign:'center'}}>A M R E C</Text>
              <Animated.ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                <View style = { styles.textBoxBtnHolder }>
                  <TextInput placeholder='Old Passward'
                    onChangeText={(value)=>this.setState({oldpassword:value})} 
                    value={this.state.oldpassword}
                    placeholderTextColor='#fff'
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent" 
                    secureTextEntry = { this.state.hidePassword } 
                    style = { styles.textBox }/>

                  <TouchableOpacity activeOpacity = { 0.8 }
                  style = { styles.visibilityBtn }
                  onPress = { this.managePasswordVisibility }>
                    { ( this.state.hidePassword ) ? 
                    <Ionicons name='md-eye' size={25} style={{color:'#fff'}}/> :
                    <Ionicons name='md-eye-off' size={25} style={{color:'#fff'}}/>
                    }
                  </TouchableOpacity>
                </View>
                <View style = { styles.textBoxBtnHolder }>
                  <TextInput placeholder='New Passward'
                    onChangeText={(value)=>this.setState({Newpassword:value})} 
                    value={this.state.Newpassword}
                    placeholderTextColor='#fff'
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent" 
                    secureTextEntry = { this.state.hidePassword } 
                    style = { styles.textBox }/>

                  <TouchableOpacity activeOpacity = { 0.8 }
                  style = { styles.visibilityBtn }
                  onPress = { this.managePasswordVisibility }>
                    { ( this.state.hidePassword ) ? 
                    <Ionicons name='md-eye' size={25} style={{color:'#fff'}}/> :
                    <Ionicons name='md-eye-off' size={25} style={{color:'#fff'}}/>
                    }
                  </TouchableOpacity>
                </View>
                <View style = { styles.textBoxBtnHolder }>
                  <TextInput placeholder='Confirm Passward'
                    onChangeText={(value)=>this.setState({Confirmpassword:value})} 
                    value={this.state.Confirmpassword}
                    placeholderTextColor='#fff'
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent" 
                    secureTextEntry = { this.state.hidePassword } 
                    style = { styles.textBox }/>

                  <TouchableOpacity activeOpacity = { 0.8 }
                  style = { styles.visibilityBtn }
                  onPress = { this.managePasswordVisibility }>
                    { ( this.state.hidePassword ) ? 
                    <Ionicons name='md-eye' size={25} style={{color:'#fff'}}/> :
                    <Ionicons name='md-eye-off' size={25} style={{color:'#fff'}}/>
                    }
                  </TouchableOpacity>
                </View>
                  <Text style={{textAlign:'center',color:'red',marginBottom:5}}>{this.state.errmsg}</Text>
                  {this.state.isLoading?
                    <ActivityIndicator color={'red'}/>:
                    <TouchableOpacity onPress={()=>this.validate()} style={styles.btncontainer}>
                      <Text style={styles.btntext}>Send</Text>
                    </TouchableOpacity>
                  } 
              </Animated.ScrollView>
          </Animated.View>
        </LinearGradient>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex: 1,
  },
  logo:{
    width:130,
    height:150,
    alignSelf:'center'
  },
  outer:{
    flex:0.8,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'10%'
  },
  inner:{
    flex:1,
    paddingBottom:10
  },
  textinputfiled:{
    width:'98%',
    padding:10,
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:5,
    marginVertical:5,
    alignSelf:'center',
    paddingLeft:20,
    color:"#2c3e50"  
  },
  textBoxBtnHolder:{
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    width:'98%',
    alignSelf:'center',
    marginTop:10
  },
  notmember:{
    flexDirection:'row',
    alignSelf:'center',
    marginTop:30,
  },
      
  btncontainer:{
    width:'98%',  
    paddingVertical:8,
    borderRadius:5,
    marginBottom:10,
    backgroundColor:'#fff',
    alignSelf:'center', 
  },
  textBox:{
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor:'#fff',
    paddingVertical: 0,
    color:"#2c3e50",
    borderRadius: 5
  }, 
   
  btntext:{
    textAlign:'center',
    fontWeight:'bold',
    letterSpacing:3
  },
  visibilityBtn:{
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
    
})