import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BarButton, BarButtonUI, WindowBarButton2UI, WindowBarButtonUI } from './UI/BarButton';
import { SlideBar } from './SlideBar';
import { Audio } from 'expo-av';


let BottomBar = (props) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // Track current position (0 to 1)
  const [duration, setDuration] = useState(0);

  const playSoundButton = async () => {
    if (!props.currSong) return;

    if(!sound) {
      if(isPlaying) {
        stopSound();
        setIsPlaying(false);
        return;
      } else {
        playSound();
        setIsPlaying(true);
      }
      setDuration(await sound.getDurationAsync());
      console.log(duration);
    } else {
      if(isPlaying) {
        pauseSound();
        setIsPlaying(false);
        return;
      } else {
        resumeSound();
        setIsPlaying(true);
      }
    }
  }

  const pauseSoundButton = async () => {
    if (!props.currSong) return;

    if(isPlaying) {
      pauseSound();
      setIsPlaying(false);
      return;
    } else {
      pauseSound();
      setIsPlaying(true);
    }
  }

  const playSound = async () => {
    if (!props.currSong) return;

    const {sound} = await Audio.Sound.createAsync(
      { uri: props.currSong.mp3Path }
    );
    
    setSound(sound);
    
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.isPlaying) {
        setPosition(status.positionMillis / status.durationMillis); // Normalize to 0-1
      }
    });

    await sound.playAsync();
  };

  const stopSound = async () => {
    if (!props.currSong) return;

    if(sound) {
      await sound.stopAsync();
      setSound(null);
    }
    setIsPlaying(false);
    setPosition(0);
    setDuration(0);
  }

  const pauseSound = async () => {
    if (!props.currSong) return;

    if(sound) {
      await sound.pauseAsync();
    }
  }

  const resumeSound = async () => {
    if (!props.currSong) return;
    if(sound) {
      await sound.playAsync();
    }
  }

  const seekSong = async (value) => {
    if (!props.currSong) return;
    if(value === undefined) return;
    if(sound) {

      const status = await sound.getStatusAsync();
      const duration = status.durationMillis;
      const position = value * duration;
      await sound.setPositionAsync(position);
    }
  }

  return(
    <View style={styles.bottomBar}>
      
      <View style={styles.bottomBarGroupLeft}>
        <View>
          <Image 
              style={styles.barImage}
              source={{ uri: props.currSong.imagePath }}/>
        </View>
        <View style={styles.songInfo_container}>
          <Text style={styles.songInfo_name}>{props.currSong.title}</Text>
          <Text style={styles.songInfo_artist}>{props.currSong.artist}</Text>
        </View>
      </View>

      
      <View style={styles.bottomBarGroupCenter}>

        <View style={styles.bottomBarGroupCenter_Top}>
          <WindowBarButton2UI imageSource={require('../images/png/skip_previous.png')} activation={button_test2}></WindowBarButton2UI>
          
          { !isPlaying ? (
                      <WindowBarButton2UI imageSource={require('../images/png/play_arrow.png')} activation={playSoundButton}></WindowBarButton2UI>
                    ) : (
                      <WindowBarButton2UI imageSource={require('../images/png/pause_arrow.png')} activation={pauseSoundButton}></WindowBarButton2UI>
                    )
          }
          <WindowBarButton2UI imageSource={require('../images/png/skip_forward.png')} activation={button_test}></WindowBarButton2UI>
        </View>

        <View style={styles.bottomBarGroupCenter_Bottom}>
          <SlideBar onSlide={seekSong} slideValue={position}></SlideBar>
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