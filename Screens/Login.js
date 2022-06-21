import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,ScrollView,TextInput,TouchableOpacity,Image,Animated,ActivityIndicator, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast'
import * as LocalAuthentication from 'expo-local-authentication';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      isLoading:false,
      status:'Scan your Finger'
    };
  }

  //Move to Home and storing user Info
  storedate =async(response) =>{ 
   const { navigate } = this.props.navigation;
   try{
    this.props.navigation.replace('Drawer')
    await AsyncStorage.setItem('email',this.state.email) 
    await AsyncStorage.setItem('IsLogedin','1')
    await AsyncStorage.setItem('thumb',response.thumb)
    //console.log(response.thumb)
  }catch(e){}
  }
  componentDidMount(){
    this.check()
  }

  check=async()=>{
   var thumb= await AsyncStorage.getItem('thumb')
   console.log(thumb)

    var fingerprint=await LocalAuthentication.hasHardwareAsync();
    if(fingerprint){
      if(thumb==1){
        console.log('**Use Fingerprint')
        this.setState({status:'Use Fingerprint'})
      }else{
        console.log('**Fingerprint not reg')
        this.setState({status:''})
      }
    }else{
      console.log('**Fingerprint not supported')
      this.setState({status:''})
    }
  }
  checkFingerPrint=async()=>{
    var thumb= await AsyncStorage.getItem('thumb')
    if(thumb==1){
      var fingerprint=await LocalAuthentication.hasHardwareAsync();
   
  if(fingerprint){
    var checkBiomatricType=await LocalAuthentication.supportedAuthenticationTypesAsync()
  
  
   
    if(checkBiomatricType[0]){
      
      var authenticate=await LocalAuthentication.authenticateAsync()
     

      if(authenticate.success){
          var savefingerprint=await LocalAuthentication.isEnrolledAsync()
          await AsyncStorage.setItem('IsLogedin','1')
          
            this.props.navigation.replace('Drawer')
          
      }
    }
  }else{
    //this.setState({status:'Finger Print support Not Available'})
  }
    }else{
      
    }
    
  }


  //Login Request
  login_request = () =>{
   const formData = new FormData()
   formData.append('email', this.state.email);
   formData.append('password', this.state.password);
   try{
     fetch(`http://amrec.assadcrm.com/api/login.php`, {
       method: 'POST',
       headers: {
         Accept: "application/json",
         "Content-Type": "multipart/form-data",
       },
       body:formData
     })
     .then((response) => response.json())
     .then((responseJson) => {
      this.setState({isLoading:false,errmsg:''})
       if(responseJson.error == true){
        Toast.show(responseJson.error_msg)
       }else{
         //Move to Home
         this.setState({thumb:responseJson.thumb})
         this.storedate(responseJson)
         
       }
     })
     .catch((error) =>{});
   }catch(e){}
  }
 //Check All Fields if Empty
  validate(){
    if(this.state.email==''){
      this.setState({errmsg:'Email is required'})
      return;
    }else if(!this.ValidateEmail((this.state.email).trim())){
      this.setState({errmsg: 'Invalid Email'});
      return;
    }
    else if(this.state.password.length < 6 ){
      this.setState({errmsg:"Password not Valid"});
    return;
    }
    else{
      this.setState({isLoading:true})  
      //Send Request to Login  
      this.login_request();
    }
  }
 //Check Email Formate 
 ValidateEmail=(mail)=> 
 {
   if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail))
     {
      return (true)
     }
     
      return (false)
 }
  //Hide or Show Password
  managePasswordVisibility = () =>{
    this.setState({ hidePassword: !this.state.hidePassword });
  }



  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={{flex:1}}>
          <View style={{flex:0.1}}/>
          <Animated.View style={{flex:1}}>
            <Image source={require('../assets/logo1.png')} style={styles.logo}/>
            <Text style={{color:'#fff',marginVertical:10,textAlign:'center'}}>A M R E C</Text>        
              <Animated.ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
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
                  <Text style={{textAlign:'center',color:'red',marginBottom:5}}>{this.state.errmsg}</Text>
              
                {this.state.isLoading?
                  <ActivityIndicator color={'red'}/>
                  :
                  <TouchableOpacity onPress={()=>this.validate()} style={styles.btncontainer}>
                    <Text style={styles.btntext}>Login</Text>
                  </TouchableOpacity>
                } 
                <TouchableOpacity onPress={()=>navigate('ForgotPassword')} style={{alignSelf:'flex-end'}}>
                  <Text style={{marginRight:10}}>Forgot Password!</Text>
                </TouchableOpacity>
                <View style={{marginTop:15}}>
                  <Text onPress={()=>this.checkFingerPrint()} style={{textAlign:'center'}}>{this.state.status}</Text>
                </View>
                <View style={styles.notmember}> 
                  <Text>Not A member Yet? </Text>
                  <TouchableOpacity onPress={()=>navigate('Register')}>
                    <Text style={{color:'red'}}> Sign  up</Text>
                  </TouchableOpacity>
                </View> 
              <View style={{flex:0.1}}></View>
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
         marginVertical:'20%'
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
         marginVertical:10,
         alignSelf:'center',
         paddingLeft:20,
         color:"#2c3e50"
         
        },textBoxBtnHolder:
        {
            
            
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
       width:'90%',
       
       paddingVertical:8,
       borderRadius:5,
       marginBottom:10,
       backgroundColor:'#fff',
      alignSelf:'center',
     
       
    },
    textBox:
  {

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
    visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
    
})