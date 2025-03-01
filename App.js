import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Topbar></Topbar>
      <Sidebar></Sidebar>
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

function Sidebar(props)
{
  return(
    <View style={styles.sidebar}>

    </View>
  )
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
    padding: 5,
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

  sidebar:{
    flex: 0.9,
    flexDirection:"row",
    backgroundColor: "#222823",
    alignItems: "center"
    
    
  }

});

