import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,ScrollView,TextInput,TouchableOpacity,Image, Animated,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast'
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      email:'',
      errormessage:'',
      isLoading:false
    };
  }

  storedate =async(response) =>{
    
   const { navigate } = this.props.navigation;
   try{

    this.props.navigation.replace('Login')
    

   }catch(e){}
  }
  ForgotPassword = () =>{
    this.setState({errormessage:''})
     const formData = new FormData()
     formData.append('email', this.state.email);
     try{
       fetch(`http://amrec.assadcrm.com/api/forgot_password.php`, {
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
           this.storedate(responseJson)
         }
       })
       .catch((error) =>{});
     }catch(e){}
   }

   validate(){
    
     
      if(this.state.email==''){
        this.setState({errormessage:'Email is required'})
       
        return;
      }else if(!this.ValidateEmail((this.state.email).trim())){
        this.setState({errormessage: 'Invalid Email'});
        return;
      }else{
        this.setState({isLoading:true})
        this.ForgotPassword();
      }
    }

   ValidateEmail=(mail)=> 
   {
     if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail))
       {
         return (true)
       }
       
         return (false)
   }


  render() {
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
          
          <Animated.View style={{flex:1}}>
            <Image source={require('../assets/logo1.png')} style={styles.logo}/>
            <Text style={{color:'#fff',marginVertical:10,textAlign:'center'}}>A M R E C</Text>
      
            <Animated.ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
              <TextInput placeholder='Email'  onChangeText={(value)=>this.setState({email:value})} value={this.state.email}  placeholderTextColor='#FFF' style={styles.textinputfiled}/>
                <Text style={{textAlign:'center',color:'red',marginBottom:5}}>{this.state.errormessage}</Text>
            
              {this.state.isLoading?
              <ActivityIndicator color={'red'}/>:

              <TouchableOpacity onPress={()=>this.validate()} style={styles.btncontainer}>
              <Text style={styles.btntext}>Send</Text>
              </TouchableOpacity>} 
            
              <View style={{marginTop:15}}/>
              <View style={styles.notmember}> 
            
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
        marginTop:30
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
         
        },
        notmember:{
          flexDirection:'row',
          alignSelf:'center',
         
        },
      
    btncontainer:{
       width:'90%',
       
       paddingVertical:8,
       borderRadius:5,
       marginBottom:10,
       backgroundColor:'#fff',
      alignSelf:'center',
      
       
    },
    
   
    btntext:{
        textAlign:'center',
        color:'#2c3e50',
        fontWeight:'bold',
        
    },
    
})