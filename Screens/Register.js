import React, { Component } from 'react';
import { View, Text,StyleSheet,Animated,ScrollView,AsyncStorage,TextInput,ActivityIndicator,TouchableOpacity,Image, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      city:'',
      state:'',   
      phone:'',
      errmsg:'',
      hidePassword: true,
      isLoading:false,
      email:'',
      password:'',
      image:'',
      scrollY:new Animated.Value(0),
      radious:new Animated.Value(0)
    };
  }

  

  storedate =async(response) =>{
    const { navigate } = this.props.navigation;
    try{
      await AsyncStorage.setItem('email',this.state.email) 
      this.props.navigation.navigate('Login')
    }catch(e){}
  }



    signup_request = () =>{
    const formData = new FormData()
    formData.append('f_name', this.state.first_name);
    formData.append('l_name', this.state.last_name);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('phone', this.state.phone);
    formData.append('city', this.state.city);
    formData.append('state', this.state.state);
    try{
      fetch(`http://amrec.assadcrm.com/api/signup.php`, {
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
        
        }
        else{
          
          this.storedate();
        }
      })
      .catch((error) =>{});
    }catch(e){}
  }

  
  validate(){
    if(this.state.first_name === ''){
      this.setState({errmsg:"First name is required"});
      return;
    }
    else if(this.state.last_name === ''){
      this.setState({errmsg:" Last name is required"});
      return;
    }
    else if(!this.ValidateEmail((this.state.email).trim())){
      this.setState({errmsg: 'Invalid Email!'});
      return;
    }
    else if(this.state.password.length < 6 ){
      this.setState({errmsg:"Plese enter 6 character passward"});
      return;
    }
    else if(this.state.city===''){
      this.setState({errmsg:"City name is required"});
      return;
    }
    else if(this.state.state==''){
      this.setState({errmsg:"State name is required"});
      return;
    }
    else if(!this.ValidateUSPhoneNumber(this.state.phone)){
      this.setState({errmsg:" Invalid Phone Number"});
      return;
    }
    else{
      this.setState({errmsg:''})
      this.setState({isLoading:true});
      this.signup_request()
    }
  }
  
  ValidateUSPhoneNumber=(phoneNumber)=> {
    var regExp = /^\d{11}$/;
    var phone = phoneNumber.match(regExp);
    if (phone) {
      return true;
    }
    return false;
  }
  


  ValidateEmail=(mail)=> 
  {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
      
      return (false)
  }

  managePasswordVisibility = () =>{
    this.setState({ hidePassword: !this.state.hidePassword });
  }




  render() {
    const ScrollmaxHeight=this.state.scrollY.interpolate({
      inputRange:[0,170],
      outputRange:[170,200],
      extrapolate:'clamp'
    })
    const borderraidou=this.state.radious.interpolate({
      inputRange:[0,10],
      outputRange:[10,0],
      extrapolate:'clamp'
    })
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={{flex:1}}>
          <View style={{flex:0.1,padding:10,flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
              <AntDesign name="arrowleft" color={'#fff'}  size={25}  />
            </TouchableOpacity>
            <View style={{flex:1}}/>
          </View>
          
          <Animated.View style={{flex:1,}}>
            <Image source={require('../assets/logo.png')} style={{alignSelf:'center',width:160,height:175}}/> 
              <Animated.ScrollView 
                onScroll={Animated.event([
                  {nativeEvent:{contentOffset:{y:this.state.scrollY}}}
                ],{
                  useNativeDriver: true,
                })} style={{flex:1}} showsVerticalScrollIndicator={false}>
                  <TextInput placeholder='First Name'  onChangeText={(value)=>this.setState({first_name:value})} value={this.state.first_name}  placeholderTextColor='#FFF' style={styles.textinputfiled}/>
                  <TextInput placeholder='Last Name' onChangeText={(value)=>this.setState({last_name:value})} value={this.state.last_name} placeholderTextColor='#FFF' style={styles.textinputfiled}/>
                  <TextInput placeholder='Email'  onChangeText={(value)=>this.setState({email:value})} value={this.state.email}  placeholderTextColor='#FFF' style={styles.textinputfiled}/>
                    <View style = { styles.textBoxBtnHolder }>
                      <TextInput placeholder='Passward'
                      onChangeText={(value)=>this.setState({password:value})} 
                      value={this.state.password}
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
                  <TextInput placeholder='11 Digit Phone Number'  onChangeText={(value)=>this.setState({phone:value})} value={this.state.phone}  placeholderTextColor='#FFF' style={styles.textinputfiled}/>
                  <TextInput placeholder='City' onChangeText={(value)=>this.setState({city:value})} value={this.state.city} placeholderTextColor='#FFF' style={styles.textinputfiled}/>
                  <TextInput placeholder='State'  onChangeText={(value)=>this.setState({state:value})} value={this.state.state}  placeholderTextColor='#FFF' style={styles.textinputfiled}/>
                      <Text style={{textAlign:'center',color:'red'}}>{this.state.errmsg}</Text>
                  {this.state.isLoading?
                  <ActivityIndicator color={'red'}/>
                  :
                    <TouchableOpacity onPress={()=>this.validate()} style={styles.btncontainer}>
                      <Text style={styles.btntext}>Register</Text>
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
  },
  outer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:'25%'
  },
  inner:{
    flex:1,
  },
  textinputfiled:{
    width:'98%',
    padding:10,
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:5,
    marginVertical:10,
    alignSelf:'center',
    paddingLeft:20,
    color:"#2c3e50"
  },
  notmember:{
    flexDirection:'row',
    alignSelf:'center',
  },
      
  btncontainer:{
    width:'90%',  
    paddingVertical:8,
    borderRadius:5,
    marginBottom:40,
    backgroundColor:'#fff',
    alignSelf:'center',
  },
    
   
  btntext:{
    textAlign:'center',
    color:'#2c3e50',
    fontWeight:'bold',
  },
  textBoxBtnHolder:{  
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    width:'98%',
    alignSelf:'center',
      
  },
  textBox:{
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor:'#fff',
    paddingVertical: 0,
    paddingLeft:20,
    color:"#2c3e50",
    borderRadius: 5
  }, 
  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
    
})