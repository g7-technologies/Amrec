import React, {  Component } from 'react';
import { View, AsyncStorage,  } from 'react-native';
import { Feather} from '@expo/vector-icons';

export default class Logout extends Component{
 
    static navigationOptions = {
        title:'Logout' ,
        drawerIcon: ({ tintColor }) => (
          <Feather name="log-out" size={20}
          style={{ color: tintColor }}
          />
        ) 
    };
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.Logout() 
    }
    Logout=async()=>{ 
         const navigate=this.props.navigation.navigate; 
         await AsyncStorage.setItem('IsLogedin','0')
         this.props.navigation.replace('Login') 
    }
    render(){
       
        return(
            <View>

            </View>
        )
    }
}