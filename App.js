import { StatusBar } from 'expo-status-bar';
import React, { useRef } from "react";
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

      <TopbarButton imageSource={require('./images/png/more.png')} activation={button_test2}></TopbarButton>
      <TopbarButton imageSource={require('./images/png/arrow_back.png')} activation={button_test}></TopbarButton>
      <TopbarButton imageSource={require('./images/png/arrow_forward.png')} activation={button_test}></TopbarButton>


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
        <TopbarButton imageSource={require('./images/png/skip_previous.png')} activation={button_test2}></TopbarButton>
        <TopbarButton imageSource={require('./images/png/play_arrow.png')} activation={button_test}></TopbarButton>
        <TopbarButton imageSource={require('./images/png/skip_forward.png')} activation={button_test}></TopbarButton>
      </View>

      <View style={styles.bottomBarGroupRight}>
        
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

function TopbarButton(props){
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
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  bottomBarGroupRight:{
    flex: 0.1,
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 10,
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
  }

});

