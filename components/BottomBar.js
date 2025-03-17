import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, Text, Image, Animated, Easing } from 'react-native';
import { BarButton, BarButtonUI, WindowBarButton2UI, WindowBarButtonUI } from './UI/BarButton';
import { SlideBar } from './SlideBar';
import { Audio } from 'expo-av';
import { getSong } from './UI/WebRequests';
import useAnimatedValue from "./UI/UIAnimations.js"
import { ImageBackground } from 'react-native-web';

let lastplayedsound;

let BottomBar = (props) => {

  useEffect(() => {
    if (sound) {
      stopSound().then(() => {
        playSound().then(()=> {
          setIsPlaying(true);
        });
      });
    }
  }, [props.currSong]);



  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // Track current position (0 to 1)
  const [duration, setDuration] = useState(0);
  const [timeMilisecond, setTimeMilisecond] = useState(0);
  const [volume, setVolume] = useState([0.5]);

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
      { uri: props.currSong.mp3Path,
        
      }
    );
    
    getSong(props.currSong._id);
    setSound(sound);
  
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded && status.isPlaying) {
        setPosition(status.positionMillis / status.durationMillis); // Normalize to 0-1
        
        setTimeMilisecond(status.positionMillis);
        setDuration(status.durationMillis);
      }
      if (status.didJustFinish || status.positionMillis >= status.durationMillis - 500) {
        await stopSound();
        skip_next_button();
      }
    });
    lastplayedsound = props.currSong.mp3Path;
    await sound.setVolumeAsync(volume);
    await sound.playAsync();


  };

  const stopSound = async () => {

    if (!props.currSong) return;
    lastplayedsound = props.currSong.mp3Path;
    if(sound) {

      await sound.stopAsync();  // Stop the sound.
      await sound.unloadAsync();  // Unload the sound to release resources.
      setSound(null);  // Clear the sound reference.
    }
    setIsPlaying(false);
    setPosition(0.001); //DO NOT PUT ZERO IT BREAKS #COCONUTJPEG
    setDuration(0);
    setTimeMilisecond(0);
  }

  const pauseSound = async () => {
    if (!props.currSong) return;

    if(sound) {
      await sound.pauseAsync();
    }
  }

  let updatesss = props.currSong.title;
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

  const changeVolume = async (value) => {

    setVolume(value);
    update_volume_icon();

    if (!props.currSong) return;
    if(value === undefined) return;

    if(sound) {
      await sound.setVolumeAsync(value);
    }
  }

  function formatTime(ms) {
    const minutes = Math.floor((ms / (1000 * 60)));
    const seconds = Math.floor((ms / 1000) % 60);
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  let skip_previous_button = () =>{
  
    if((props.trendingContent.length > 0))
      {
        
        for (let i = 0; i < props.trendingContent.length; i++)
          {

            if((props.trendingContent[i]._id === props.currSong._id))
              {
                let check_i = (i - 1 + props.trendingContent.length) % props.trendingContent.length;

                props.setCurrentSong(props.trendingContent[check_i]);
              }
          }
      }
  }

  let skip_next_button = () =>{
  
    if((props.trendingContent.length > 0))
      {
        
        for (let i = 0; i < props.trendingContent.length; i++)
          {


            if((props.trendingContent[i]._id === props.currSong._id))
              {
                let check_i = (i + 1) % props.trendingContent.length;

                props.setCurrentSong(props.trendingContent[check_i]);
              }
          }
      }
  }

  const volumeImages = {
    off: require("../images/png/volume_off.png"),
    silent: require("../images/png/volume_silent.png"),
    low: require("../images/png/volume_low.png"),
    high: require("../images/png/volume_high.png"),
  };

  const [volumeImage, setVolume_image] = useState(volumeImages.high);
  const [mute, setMute] = useState(false);
  const [mutedVolume, setMutedVolume] = useState(0);

  //Slider sets volume to an array with one float element? ok lol.
  let update_volume_icon = () => {
    
    if (volume[0] === 0) 
    {
      setVolume_image(volumeImages.off);
    } 
    else if (volume[0] <= 0.1) 
    {
      setVolume_image(volumeImages.silent);
    } 
    else if (volume[0] <= 0.5) 
    {
      setVolume_image(volumeImages.low);
    } 
    else 
    {
      setVolume_image(volumeImages.high);
    }
  }


  let toggle_mute_icon = async () => {

    update_volume_icon();

    if(!mute)
      {
        setMute(true);
        setMutedVolume(volume[0]);
        await changeVolume([0]);
      }
    else
    {
      setMute(false);
      await changeVolume([mutedVolume]);
    }
  }

  useEffect(() => {
    
    update_volume_icon();
    
  }, [volume, mute]);

  //example on how to make animated value aka animations
  exampleValue = new Animated.Value(0);
  const [actualExampleValue, setActualExampleValue] = useState(new Animated.Value(0));
  useAnimatedValue(exampleValue, setActualExampleValue, 1000, 2 * 1000, Easing.bounce);

  //set what ever number you are animating to actualExampleValue.

  


  return(
    <View style={styles.bottomBar}>
      
      <View style={styles.bottomBarGroupLeft}>
        <View style={{
          
          height: '70%', 
          aspectRatio: 1,
          borderRadius: 10,
          overflow: 'hidden',
          
        }}>

          <ImageBackground 
            source={{ uri: props.currSong.imagePath }}
            style={{
              flex: 1,
              
            }}
            resizeMode="cover"
          
          />
        </View>
        <View style={styles.songInfo_container}>
          <Text style={styles.songInfo_name}>{props.currSong.title}</Text>
          <Text style={styles.songInfo_artist}>{props.currSong.artist}</Text>
        </View>
      </View>


      
      <View style={styles.bottomBarGroupCenter}>

        <View style={styles.bottomBarGroupCenter_Top}>
          <WindowBarButton2UI imageSource={require('../images/png/skip_previous.png')} activation={skip_previous_button}></WindowBarButton2UI>
          
          { !isPlaying ? (
                      <WindowBarButton2UI imageSource={require('../images/png/play_arrow.png')} activation={playSoundButton}></WindowBarButton2UI>
                    ) : (
                      <WindowBarButton2UI imageSource={require('../images/png/pause_arrow.png')} activation={pauseSoundButton}></WindowBarButton2UI>
                    )
          }

          <WindowBarButton2UI 
            imageSource={require('../images/png/skip_forward.png')} 
            activation={skip_next_button}>
          </WindowBarButton2UI>
        </View>

        <View style={styles.bottomBarGroupCenter_Bottom}>

          <Text style={{color: "white", opacity: 0.9}}>
            {formatTime(timeMilisecond)}
          </Text>
          
          <View>
            <SlideBar onSlide={seekSong} slideValue={position}></SlideBar>  
          </View>

          <Text style={{color: "white", opacity: 0.9}}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>


      <View style={styles.bottomBarGroupRight}>
        <View>
          <WindowBarButton2UI imageSource={volumeImage} activation={toggle_mute_icon}></WindowBarButton2UI>
        </View>
        
        <View>
          <SlideBar onSlide={changeVolume} slideValue={volume}></SlideBar>
        </View>
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

        //backgroundColor: "red",

        flex:0.1,
        flexDirection:"row",
        //backgroundColor: "#08090A",
        alignItems: "center",
        overflow: "hidden",
    
    
        
      },
    
      bottomBarGroupLeft:{
        flex: 1,

        //backgroundColor: "blue",
        height: 100,

        flex: 0.35,
        flexDirection: "row",
        gap: 15,
        paddingLeft: 20,

        alignItems: "center",
      },
    
      bottomBarGroupCenter:{

        height: 100,

        flex: 0.3,
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
      },
    
      bottomBarGroupCenter_Bottom:{
        flex: 1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
        paddingBottom: 20,
        columnGap: 10,
      },
    
      bottomBarGroupCenter_Top:{
        flex: 1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
        paddingTop: 20,
        height: 50,
        columnGap: 10,
      },
    
      bottomBarGroupRight:{


        height: 100,

        flex: 0.35,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 7,
        paddingRight: 20,
      },
    
      barImage:{
        height: "80%",
        width: 80,
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