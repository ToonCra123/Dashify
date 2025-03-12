import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BarButton, BarButtonUI, WindowBarButton2UI, WindowBarButtonUI } from './UI/BarButton';
import { SlideBar } from './SlideBar';


let BottomBar = () => {
  return(
    <View style={styles.bottomBar}>
      
      <View style={styles.bottomBarGroupLeft}>
        <View>
          <Image 
              style={styles.barImage}
              source={require("../images/png/test_album.png")}/>
        </View>
        <View style={styles.songInfo_container}>
          <Text style={styles.songInfo_name}>SONG NAME</Text>
          <Text style={styles.songInfo_artist}>ARTIST NAME</Text>
        </View>
      </View>

      
      <View style={styles.bottomBarGroupCenter}>

        <View style={styles.bottomBarGroupCenter_Top}>
          <WindowBarButton2UI imageSource={require('../images/png/skip_previous.png')} activation={button_test2}></WindowBarButton2UI>
          <WindowBarButton2UI imageSource={require('../images/png/play_arrow.png')} activation={button_test}></WindowBarButton2UI>
          <WindowBarButton2UI imageSource={require('../images/png/skip_forward.png')} activation={button_test}></WindowBarButton2UI>
        </View>

        <View style={styles.bottomBarGroupCenter_Bottom}>
          <SlideBar></SlideBar>
        </View>
      </View>


      <View style={styles.bottomBarGroupRight}>
        <WindowBarButton2UI imageSource={require('../images/png/volume_high.png')} activation={button_test}></WindowBarButton2UI>
        <SlideBar></SlideBar>
      </View>

    </View>
  );
}

function button_test()
{
  console.log("button test worked");
}

function button_test2()
{
  console.log("button test 2 worked");
}

const styles = StyleSheet.create({
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
        height: "4rem",
        width: "4rem",
        borderRadius: 6,
      },
    
      sidebar:{
        flex: 0.9,
        flexDirection:"row",
        backgroundColor: "#222823",
        alignItems: "center"
      },
    
});

export { BottomBar };