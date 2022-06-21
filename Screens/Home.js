import React, { Component } from 'react';
import { StyleSheet,Text, View,TouchableOpacity,Dimensions,ScrollView,ActivityIndicator,Image,TouchableWithoutFeedback} from 'react-native';
import {Entypo,MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import {LineChart} from "react-native-chart-kit";
import MapView,{Marker,Callout} from 'react-native-maps';
import Toast from 'react-native-tiny-toast'
export default class  Home extends Component {
  static navigationOptions = {
    title:'Home',
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="weather-snowy-rainy" size={20} style={{ color: tintColor }}/>
    )
  };
  constructor(props){
    super(props);
    this.state = {
      location: [],
      dates1 : [],
      windspeeds1 : [],
      MyLatitude:0,
      MonthlyDate:'',
      MyLongtitude:0,
      visible: true ,
      place:'',
      Historydata:[],
      ishistoryComing:false,
      windspeeds:[],
      historyLoading:false,
      text:'History',
      dates:[],
      windis:'',
      TempeC:'',
      ontextinputfocusreceive:false,
      SearchPlace:'',
      isDailyvisible:true,
      isMonthlyVisible:true,
      autocompletedataarray:[],
      daily:true,
      lastDate:'',
      isLoadingMore:false
    };
  }
  //First Function to execute
  componentDidMount(){
    this._getLocationAsync();
  }

  //Get User Location On App Start location permission
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
     Toast.show('Permission to access location was denied')
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this.setState({MyLatitude:location.coords.latitude,MyLongtitude:location.coords.longitude})
    //Get Temperature second Function on start get Temperature
    this.temp();
    //Get Direction third Function on start get Place Name
    this.getDirections()
  };

  //Get Current Temperatur of Current Location
  temp=async()=>{
    try {
      let resp = await fetch(`https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${this.state.MyLatitude},${this.state.MyLongtitude}&date=today&key=edfc546883b04645ad7195047201305&format=json`)
      let respJson = await resp.json();
     if(respJson.data.current_condition==null){ 
      Toast.show('Network Error in getting Temperature')
      return;
     }else{
        this.setState({isLoading: false,Maptemp:respJson.results})
      }
      this.setState({TempeC:respJson.data.current_condition[0].temp_C,windis:respJson.data.current_condition[0].windspeedKmph/3.6})
    } catch(error) {
      this.setState({x: "error"})
      return error;
    }  
  }

  //Get Name of Current Location
  getDirections=async()=>{
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.MyLatitude},${this.state.MyLongtitude}&sensor=true&key=AIzaSyCAJr3bLE9NYakP1OjoDgmUbFSV0Zi7CEs`)
      let respJson = await resp.json();
      if(respJson.status=='INVALID_REQUEST'){
        Toast.show('Network Error in Getting Place Name')
        return;
      }else{
        this.setState({isLoading: false,place:respJson.results[2].formatted_address})
      }
      var day=new Date().getDate()
      var month=new Date().getMonth()+1 
      var getyear=new Date().getFullYear()
      if(month <= 9){ 
        var date=`${getyear}-0${month}-${day}`
      }else{
        var date=`${getyear}-${month}-${day}`
      }
      var oyear = getyear-2
      if(month <= 9){
        var date2=`${oyear}-0${month}-${day}`
      }else{
        var date2=`${oyear}-${month}-${day}`
      } 
      this.setState({todaydate:date,olddate:date2})
    } catch(error) {
        this.setState({x: "error"})
        return error
      }
    
  }
  
  getHistory=async()=>{
    this.setState({historyLoading:true,ontextinputfocusreceive:false,onautocompleteplacescoming:false})
    try {
      let resp = await fetch(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${this.state.MyLatitude},${this.state.MyLongtitude}&date=${this.state.olddate}&enddate=${this.state.todaydate}&key=edfc546883b04645ad7195047201305&format=json&tp=24`)
      let respJson = await resp.json();
      if(respJson.status=='ZERO_RESULTS'){
      Toast.show('Network Error in Getting History')
      return;
      }else{
        var weathers = respJson.data.weather;
        var winds = [];
        var windspeeds = []
        weathers.forEach((val, index)=>{
          winds = val
          winds.hourly.forEach((windy, index)=> {
            windspeeds.push(((windy.windspeedMiles)/2.237).toFixed(2))
          })
        })
        var date1 = respJson.data.weather;
        var dates = [];
        for(var i=0;i<respJson.data.weather.length;i++){
          dates.push(respJson.data.weather[i].date)
        }
        this.setState({historyLoading: false,Historydata:respJson.data.weather,dates:dates,windspeeds:windspeeds,ishistoryComing:!this.state.ishistoryComing})
      }
    } catch(error) {
      this.setState({x: "error"})
      return error
    }
    this.graphMonthHistory()
  }


  graphMonthHistory=async()=>{
    var {dates1,windspeeds1}=this.state
    try {
        var d = new Date();
        var lasttt = d.getMonth()+1;
        var o = d.getFullYear();
             windspeeds1 = []
            dates1 = []
        for(var i = 0; i < 24 ; i++){
            if(lasttt == 1){
                lasttt = 13
                o -= 1
            }
            lasttt -= 1;
            if(lasttt <= 9){
              this.setState({MonthlyDate:o+'-0'+lasttt+'-'+'01'})
            }
            else{
              this.setState({MonthlyDate:o+'-'+lasttt+'-'+'01'})   
            }
            try {
                let resp = await fetch(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${this.state.MyLatitude},${this.state.MyLongtitude}&date=${this.state.MonthlyDate}&key=edfc546883b04645ad7195047201305&format=json&tp=24`)
                let respJson = await resp.json();
                if(resp.status=='ZERO_RESULTS'){
                   console.log('error')
                }
                else{
             
                    var weathers = respJson.data.weather;    
                    weathers.forEach((val, index)=>{
                      dates1.push(val.date)
                      val.hourly.forEach((windy, index)=> {
                        windspeeds1.push((windy.windspeedMiles/2.237).toFixed(2));
                      })
                    })
                    this.setState({windspeeds1:windspeeds1})
                }
            } 
            catch(error) {
                console.log(error)
            }
        }
        // this.state.data1['windspeeds'] = windspeeds1
        // this.state.data1['dates'] = dates1
    } 
    catch(error) {
        console.log(error)
    }
}

  //when clicked on map
  refresh=()=>{
    this.getDirections()
    this.temp()
    this.getHistory();
    
  }

  textboxfocus=()=>{
    this.setState({ontextinputfocusreceive:true,onautocompleteplacescoming:true})
  }

  //when typing in Search box return Google Places Name
  autocompleteplaces=async(searchplace)=>{
    if(searchplace==''){
      return;
    }
    this.setState({onautocompleteplacescoming:true})
    let resp = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchplace}&key=AIzaSyCAJr3bLE9NYakP1OjoDgmUbFSV0Zi7CEs`)
    let respJson = await resp.json();
    if(respJson.status=='ZERO_RESULTS'){ 
      Toast.show('No Such Place Found')
    }  
    this.setState({autocompletedataarray:respJson.predictions})
    
  }
  //go to that Location ie typed place name 
  sendsearchedPlace=async(searchplace)=>{
    try {
      
      let resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchplace}&key=AIzaSyCAJr3bLE9NYakP1OjoDgmUbFSV0Zi7CEs`)
      let respJson = await resp.json();
      
      var placelatitude=Number(respJson.results[0].geometry.location.lat)
      var placelongtitude=Number(respJson.results[0].geometry.location.lng)
      if(respJson.status=='ZERO_RESULTS'){
        //this.props.navigation.navigate('SearchScreen')
        
      }else{
        this.setState({onautocompleteplacescoming:false,MyLatitude:placelatitude,MyLongtitude:placelongtitude})
        this.refresh()
      }
    }catch(e){
      console.log(e)
    }
   
  }


    getRemainingHistory=async()=>{
      var lastDate = this.state.dates[this.state.dates.length - 1]
    this.setState({lastDate:lastDate})
    
      var day=new Date().getDate()
        var month=new Date().getMonth()+1 
        var getyear=new Date().getFullYear()
        if(month <= 9){ 
          var date=`${getyear}-0${month}-${day}`
        }else{
          var date=`${getyear}-${month}-${day}`
        }
       
        if(lastDate == date){
            console.log('***')
        }else{
            try {
              
              let resp = await fetch(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${this.state.MyLatitude},${this.state.MyLongtitude}&date=${lastDate}&enddate=${date}&key=edfc546883b04645ad7195047201305&format=json&tp=24`)
              let respJson = await resp.json();
              
              if(resp.status=='ZERO_RESULTS'){
                 console.log(error)
              }
              else{
                  
                var weathers = respJson.data.weather;
                console.log(weathers)
              // this.setState((prev)=>{Object.assign(prev.Historydata,weathers)})
          
              weathers.forEach((val, index)=>{
                    this.state.dates.push(val.date)
                 //almost working
                   this.state.Historydata.push(val)
                              
                     
                    val.hourly.forEach((windy, index)=> {
                          this.state.windspeeds.push((windy.windspeedMiles/2.237).toFixed(2))
                           
                    })
                  }) 
                
              }
              this.setState({isLoadingMore:false})
          } 
          catch(error) {
              console.log(error)
          }
      }
  }


 
  render(){
    
    if(this.state.onautocompleteplacescoming){  
    return(
      <View style={{flex:1,}}>
       <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',backgroundColor:'#fff',elevation:4,height:40,width:'100%'}}>
          <View style={{flex:0.2}}>
            <TouchableOpacity style={{marginTop:3,left:10}} onPress={()=>this.props.navigation.openDrawer()}>
              <Entypo name='menu' color={'#000'} size={25}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,flexDirection:'row',borderWidth:1,borderRadius:2,alignItems:'center',justifyContent:'center',height:'90%'}}>
            <TextInput autoFocus={true} placeholder='Search Place' onChangeText={(value)=>this.setState({SearchPlace:value},()=>{this.autocompleteplaces(this.state.SearchPlace)})} value={this.state.SearchPlace}  onSubmitEditing={()=>this.sendsearchedPlace(this.state.SearchPlace)} onFocus={()=>this.textboxfocus} style={{flex:1,paddingHorizontal:10,width:250,}}/>
            <AntDesign name="search1" onPress={()=>this.sendsearchedPlace(this.state.SearchPlace)} size={20} color="black" />
          </View>
          <View style={{flex:0.2,alignItems:'flex-end',justifyContent:'flex-end'}}>
            {this.state.historyLoading?
              <ActivityIndicator color = '#bc2b78' size = 'small'/>:
              <TouchableOpacity onPress={()=>this.setState({onautocompleteplacescoming:false})}>
                {this.state.ishistoryComing==true?<Text style={{textAlign:'center',right:10,fontSize:15,fontWeight:'bold'}}>Close</Text>
                :<Text style={{textAlign:'center',right:10,fontSize:15,fontWeight:'bold'}}>Close</Text>
                }
              </TouchableOpacity>
            }
          </View>
        </View>
        {this.state.onautocompleteplacescoming==true?
            <View style={{flex:1,}}>
             <FlatList
             style={{flex:1}}
                data={this.state.autocompletedataarray}
                renderItem={({ item }) =>
                <View style={{borderBottomWidth:1}}>
                  <TouchableOpacity onPress={()=>this.sendsearchedPlace(item.description)} style={{padding:10,}}>
                  <Text  style={{borderBottomWidth:1,borderBottomColor:'#dddddd',paddingVertical:10}}>{item.description}</Text>
                </TouchableOpacity>
                </View>}
                keyExtractor={item => item.id}
              />
             
            </View>
            :
            <View style={{width:'100%',top:40,left:30,height:150,position:'absolute'}}>
            <Text>Error is occuring in getting Place Name</Text>  
           </View>} 


      </View>
    )
    }else
    return (
       
      <View style={styles.container}>
        
        <MapView   mapType='hybrid' region={{latitude: Number(this.state.MyLatitude),longitude:Number(this.state.MyLongtitude),
          latitudeDelta:0.01,longitudeDelta: 0.01}} style={{flex:1}}
          onPress={(e)=>{this.setState({MyLatitude:e.nativeEvent.coordinate.latitude,MyLongtitude:e.nativeEvent.coordinate.longitude},()=>this.refresh())}}>
          {
            <Marker image={ require('../assets/Marker.png' )}    coordinate={{ latitude: this.state.MyLatitude, longitude: this.state.MyLongtitude }}>
              <Callout>
                <Text>My Current Location</Text>
              </Callout>
            </Marker>
          }
        </MapView>

        <View style={{position:'absolute',flexDirection:'row',backgroundColor:'#fff',elevation:4,height:'5%',width:'100%'}}>
          <View style={{flex:0.2}}>
            <TouchableOpacity style={{marginTop:3,left:10}} onPress={()=>this.props.navigation.openDrawer()}>
             <Entypo name='menu' color={'#000'} size={25}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <TextInput placeholder='Search Place'  placeholderTextColor='#000000' paddingHorizontal={30} onChangeText={this.autocompleteplaces} onSubmitEditing={()=>this.refresh()} onFocus={()=>this.textboxfocus()} style={{paddingHorizontal:10,}}/>
            <AntDesign name="search1" onPress={()=>this.textboxfocus()} size={20} color="black" />
          </View>
          <View style={{flex:0.5,alignItems:'flex-end',justifyContent:'center'}}>
            {this.state.historyLoading?
              <ActivityIndicator color = '#bc2b78' size = 'small'/>:
              <TouchableOpacity onPress={()=>this.getHistory()}>
                {this.state.ishistoryComing==true?<Text style={{textAlign:'center',right:10,fontSize:15,fontWeight:'bold'}}>Close</Text>
                :<Text style={{textAlign:'center',right:10,fontSize:15,fontWeight:'bold'}}>History</Text>
                }
              </TouchableOpacity>
            }
          </View>
        </View>

        {this.state.ontextinputfocusreceive==true?<View></View>:
        <View style={{position:'absolute',top:'5%',width:'100%',height:'25%',backgroundColor:'#00000060',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
          <Text style={{marginLeft:10,color:'#fff',marginTop:10,fontSize:Dimensions.get('window').height<800?20:20}}>{this.state.place==''?'Getting Name':this.state.place}</Text>
          <View style={{flexDirection:'row'}}> 
            <Text style={{marginLeft:25,color:'#fff',marginTop:10,fontSize:Dimensions.get('window').height<800?20:20}}><Text>{this.state.TempeC} {'\u00b0'}C </Text></Text>
            <Text style={{marginLeft:25,color:'#fff',marginTop:10,fontSize:Dimensions.get('window').height<800?20:20}}>Wind {Math.round(this.state.windis)} m/s</Text>
            <View style={{marginLeft:'10%'}}>
              <Image source={require('../assets/logo1.png')} style={{width:60,height:60}}/>
            </View>
          </View>
        </View>}


       

        {this.state.ishistoryComing==true? 
        <View>
           <View style={{bottom:195,flexDirection:'row',justifyContent:'space-evenly'}}>
            <View style={{width:'20%',justifyContent:'center'}}> 
              <TouchableOpacity  onPress={()=>this.setState({daily:true})}style={{backgroundColor:'#fff',elevation:2}}>
                <Text style={{textAlign:'center'}}>Daily</Text>
              </TouchableOpacity> 
            </View>
            <View style={{width:'20%',justifyContent:'center'}}> 
              <TouchableOpacity onPress={()=>this.setState({daily:false})} style={{backgroundColor:'#fff',elevation:2}}>
                <Text style={{textAlign:'center'}}>Monthly</Text>
              </TouchableOpacity>
            </View>
          </View>
       {this.state.daily==true?
        <View>
          {/*Daily Data */}
        <View style={{bottom:190,backgroundColor:'#000000'}}>
        <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
          <LineChart
          data={{
              labels: this.state.dates,
              
            datasets: [
              {
                data:this.state.windspeeds
              }
            ]
          }}
          width={this.state.windspeeds.length*70}
          height={190}
          
          yAxisInterval={25}
          chartConfig={{

          backgroundGradientFrom: "#00000060",
          backgroundGradientTo: "#00000060",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
          borderRadius: 16
          },
          propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
          }
          }}
          bezier
          style={{

              marginLeft:10
          }}
          />
          {this.state.isLoadingMore?<ActivityIndicator color={'#fff'}/>
             : <TouchableOpacity onPress={()=>this.setState({isLoadingMore:true},()=>this.getRemainingHistory())}><Text style={{color:'#fff',marginTop:90,marginRight:10,textAlign:'center'}}>Load more</Text></TouchableOpacity>
          }
              </ScrollView>
    
        </View>
        <View style={{position:'absolute',backgroundColor:"#000000",flexDirection:'row',bottom:0,width:'100%',height:190,}}>
          <View style={{marginLeft:10,bottom:12,backgroundColor:"#00000006",justifyContent:'flex-end',}}>
            <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Date</Text>
            <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Avg. Temp</Text>
            <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Wind Speed</Text>
            <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Wind Direction</Text>
            <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Wind Direction</Text>
          </View>

          <View style={{marginLeft:10,backgroundColor:"#000000",justifyContent:'flex-end'}}>
            <FlatList
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            horizontal={true}
            
            data={this.state.Historydata}
            keyExtractor={() => Math.random().toString()}
              renderItem={({ item,index }) => (

              <View key={item.date} style={{marginLeft:15,bottom:12,justifyContent:'flex-end',}}>
                <Image source={{uri:item.hourly[0].weatherIconUrl[0].value}} style={{width: 40,borderRadius:5, height: 40}} />
                  <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.date}</Text>
                  <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.avgtempC}</Text>
                  <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{((item.hourly[0].windspeedMiles)/2.237).toFixed(2)}</Text>
                  <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.hourly[0].winddirDegree}</Text>
                  <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.hourly[0].winddir16Point}</Text>
              </View>

              )}
            /> 
          </View>
        </View>
                </View>
                :
                //Monthly Data
                <View>

                <View style={{bottom:190,backgroundColor:'#000000'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <LineChart
                  data={{
                      labels: this.state.dates1,
                    datasets: [
                      {
                        data:this.state.windspeeds1
                      }
                    ]
                  }}
                  width={1800}
                  height={190}
        
                  yAxisInterval={1}
                  chartConfig={{
        
                  backgroundGradientFrom: "#00000060",
                  backgroundGradientTo: "#00000060",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                  borderRadius: 16
                  },
                  propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                  }
                  }}
                  bezier
                  style={{
        
                      marginLeft:10
                  }}
                  />
                </ScrollView>
                </View>
                <View style={{position:'absolute',backgroundColor:"#000000",flexDirection:'row',bottom:0,width:'100%',height:190,}}>
                  <View style={{marginLeft:10,bottom:12,backgroundColor:"#00000006",justifyContent:'flex-end',}}>
                    <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Date</Text>
                    <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Avg. Temp</Text>
                    <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Wind Speed</Text>
                    <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Wind Direction</Text>
                    <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>Wind Direction</Text>
                  </View>
        
                  <View style={{marginLeft:10,backgroundColor:"#000000",justifyContent:'flex-end'}}>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    horizontal={true}
                    data={this.state.Historydata}
                    keyExtractor={() => Math.random().toString()}
                    //listKey={}
                      renderItem={({ item,index }) => (
        
                      <View key={item.date} style={{marginLeft:15,bottom:12,justifyContent:'flex-end',}}>
                        <Image source={{uri:item.hourly[0].weatherIconUrl[0].value}} style={{width: 40,borderRadius:5, height: 40}} />
                          <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.date}</Text>
                          <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.avgtempC}</Text>
                          <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{((item.hourly[0].windspeedMiles)/2.237).toFixed(2)}</Text>
                          <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.hourly[0].winddirDegree}</Text>
                          <Text style={{fontSize:Dimensions.get("window").height<800?15:18,color:'#fff',marginTop:2}}>{item.hourly[0].winddir16Point}</Text>
                      </View>
        
                      )}
                    /> 
                  </View>
                </View>
                        </View>      
            
                
                }

        </View>
        :
        <View></View>
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  location:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:"center"
  },
  viewStyle:{
    backgroundColor:"#84817a",
    height:60,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.2,
    marginTop:Dimensions.get('window').height<800?27:35 ,
  },
  textStyle:{
    fontSize:20,
  }
})