import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {Slider} from '@miblanchard/react-native-slider';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Topbar></Topbar>
      <Centerbar></Centerbar>
      <BottomBar></BottomBar>
    </View>
  );
}


function Topbar(props)
{
  return(
    <View style={styles.topBar}>

      <BarButton imageSource={require('./images/png/more.png')} activation={button_test2}></BarButton>
      <BarButton imageSource={require('./images/png/arrow_back.png')} activation={button_test}></BarButton>
      <BarButton imageSource={require('./images/png/arrow_forward.png')} activation={button_test}></BarButton>


    </View>
  );
}

function BottomBar()
{
  return(
    <View style={styles.bottomBar}>
      
      <View style={styles.bottomBarGroupLeft}>
        <View>
          <Image 
              style={styles.barImage}
              source={require("./images/png/test_album.png")}/>
        </View>

        <View style={styles.songInfo_container}>
          <Text style={styles.songInfo_name}>SONG NAME</Text>
          <Text style={styles.songInfo_artist}>ARTIST NAME</Text>
        </View>



      </View>

      
      <View style={styles.bottomBarGroupCenter}>

        <View style={styles.bottomBarGroupCenter_Top}>
          <BarButtonUI imageSource={require('./images/png/skip_previous.png')} activation={button_test2}></BarButtonUI>
          <BarButtonUI imageSource={require('./images/png/play_arrow.png')} activation={button_test}></BarButtonUI>
          <BarButtonUI imageSource={require('./images/png/skip_forward.png')} activation={button_test}></BarButtonUI>
        </View>

        <View style={styles.bottomBarGroupCenter_Bottom}>
          <SideBar></SideBar>
        </View>
      </View>



      <View style={styles.bottomBarGroupRight}>
        <BarButtonUI imageSource={require('./images/png/volume_high.png')} activation={button_test}></BarButtonUI>
        <SideBar></SideBar>
      </View>

    </View>
  );
}

function Centerbar(props)
{
  return(
    <View style={styles.centerbar}>
      <CenterbarWindow></CenterbarWindow>
      <CenterbarWindow></CenterbarWindow>
      <CenterbarWindow></CenterbarWindow>
    </View>
  );
}

function CenterbarWindow(props){
  return(
    <View style={styles.centerbarWindow}>
      <Text>Poop</Text>
    </View>
  );
}

function BarButton(props){
  return(
    <TouchableOpacity onPress={props.activation}>
      <View style={styles.icon_container}>

      <Image 
        style={styles.icon}
        source={props.imageSource}/>
      
      </View>
    </TouchableOpacity>
  );
}


function BarButtonUI(props){
  return(
    <TouchableOpacity onPress={props.activation}>
      <View>

      <Image 
        style={styles.icon2}
        source={props.imageSource}/>
      
      </View>
    </TouchableOpacity>
  );
}


function SideBar(props)
{

  const [value, setValue] = useState(0.5);



  return(
    <View style={styles.volumeSlider}>
      <Slider
        value={value}
        onValueChange={value => setValue(value)}
        thumbTintColor='white'
        maximumTrackTintColor='#222823'
        minimumTrackTintColor='white'
        thumbStyle={{width:15, height:15}}
        containerStyle={{
          height:15,
        }}
        
        //thumbTouchSize={{width:30, height: 30}}
      />
    </View>
  );
}














function button_test()
{
  console.log("test worked");
}


function button_test2()
{
  console.log("test 2 worked");
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090A',
  },

  icon2:{
    height: "3vh",
    width: "1.5vw",
    resizeMode: "contain",
    padding:0,
    
  },

  icon: {
    height: "2vh",
    width: "1vw",
    resizeMode: "contain",
  },

  icon_container:{
    padding: 10,
  },

  topBar:{
    flex:0.05,
    flexDirection:"row",
    backgroundColor: "#08090A",
    alignItems: "center"
    
  },

  songInfo_name:{
    color: "white",
    fontWeight: "bold",
    fontSize: "0.8rem",
  },

  songInfo_artist:{
    color: "white",
    fontSize: "0.8rem",

  },

  songInfo_container:{
    justifyContent: "center",
  },


  bottomBar:{
    flex:0.075,
    flexDirection:"row",
    backgroundColor: "#08090A",
    alignItems: "center"


    
  },

  bottomBarGroupLeft:{
    flex: 0.1,
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 10,
  },

  bottomBarGroupCenter:{
    flex: 0.8,
    flexDirection: "column",
    justifyContent: "center",
  },

  bottomBarGroupCenter_Bottom:{
    flexDirection:"row",
    justifyContent:"center",
  },

  bottomBarGroupCenter_Top:{
    flexDirection:"row",
    justifyContent:"center",
  },

  bottomBarGroupRight:{
    flex: 0.1,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 15,
  },

  barImage:{
    height: "2.25vw",
    width: "2.25vw",
    borderRadius: 6,
  },

  sidebar:{
    flex: 0.9,
    flexDirection:"row",
    backgroundColor: "#222823",
    alignItems: "center"
    
    
  },

  centerbar:{
    flex:1,
    flexDirection:"row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },

  centerbarWindow:{
    flex:1,
    flexDirection:"row",
    alignItems: "center",
    backgroundColor: "#222823",
    height: "100%",
    borderRadius: 10,
  },

  volumeSlider:{
    width: "20vw",
    justifyContent: "center",
  },

});

