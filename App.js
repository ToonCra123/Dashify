import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TopBar } from "./components/TopBar.js";
import { BottomBar } from "./components/BottomBar.js";
import { Centerbar } from "./components/CenterBar.js";
import AlbumView from "./AlbumView.js";
import "react-native-gesture-handler";
import MainMobile from "./components/mobile/MainMobile.js";
import { getPlaylist, getSong, getTrending, loginUser } from "./components/UI/WebRequests.js";
import { createNavigationContainerRef } from '@react-navigation/native';
import LoginWindow from './components/UI/Login.js';         


//to import login func from 'Login.js', if your func a different name, change 'LoginWindow' to your function name

// remember to export login function in Login.js like this 
// export function your_func_name(){}
// or:
// export let your_func_name = () => {}
// both mean same thing

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();



export default function App() {

const [fetchedTrendingSongs, setFetchedTrendingSongs] = useState([]); //To update trending songs call 'requestTrendingSongs' DO NOT set 'fetchedTrendingSongs' manually


const [shouldStopSong, setShouldStopSong] = useState(false);

let requestTrendingSongs = async () => {}; //empty var for all we care

  if(fetchedTrendingSongs.length === 0) {
    requestTrendingSongs = async (a) => {
      let tSongs = await getTrending(a);
      setFetchedTrendingSongs(tSongs);
      
      //setCurrSong(fetchedTrendingSongs[0]);
      return fetchedTrendingSongs;
    }
  }
  requestTrendingSongs(20);

  useEffect(() => {
    if(fetchedTrendingSongs.length > 0)
      {
        setCurrSong(fetchedTrendingSongs[0]);
      }
  }, [fetchedTrendingSongs]);
  

  const [currSong, setCurrSong] = useState({});
  const [selected_content, setSelectedContent] = useState(false);

  let content_selected = (v) =>{
    (v === undefined) ? setSelectedContent(!selected_content) : setSelectedContent(v);
  }

  let set_song = (s) =>{
  
    if(!(currSong._id === s._id)){
        setCurrSong(s);
        setShouldStopSong(true);
        onSongChange();
        //make this crap work omg
    }
  }

  let onSongChange = () => {}

  const [songSearchData, setSongSearchData] = useState([]);
  const [artistSearchData, setArtistSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected_playlistID, setSelectedPlaylistID] = useState("67d38e527de6a9174989d40e");

  let song_search_window = (data) => {
    setSongSearchData(data[0]);
    setArtistSearchData(data[1]);

  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(()=>{
    console.log(userData)
  }, [userData]);


  let syncUserData = async (name, pass) => {
    let data = await loginUser(name, pass);
    
    if(data.status === 200)
    {
      setUsername(name);
      setPassword(pass);
      setUserData(data);
    }

    return data
  }

    if (Platform.OS === 'web') {

      if(!isLoggedIn) //for log in page testing <<<<<
      {
        return (
        <LoginWindow 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          syncUserData={syncUserData}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserData={setUserData}
          userData={userData}

        />
        ); //this is the login page, if you want to test it, set the above 'if' statement to true and comment out the rest of the code
      } else {
        return (
          <NavigationContainer ref={navigationRef}>
            <View style={styles.container}>
              <TopBar
                selected_content={selected_content}
                setSelectedContent={content_selected}
                setCurrentSong={set_song}
                setQueryData={song_search_window}  // Added missing prop
                setQuery={setSearchQuery}   
              />
              
              {fetchedTrendingSongs.length > 0 && (
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#08090A' }
                  }}
                >
                  <Stack.Screen name="Home">
                    {(props) => (
                      <Centerbar
                        {...props}
                        navigation={props.navigation}
                        selected_content={selected_content}
                        currSong={currSong}
                        setSelectedContent={content_selected}
                        trendingContent={fetchedTrendingSongs}
                        setCurrentSong={set_song}
                        songSearchData={songSearchData}      // Added missing prop
                        artistSearchData={artistSearchData}   // Added missing prop
                        searchQuery={searchQuery}             // Added missing prop
                        setUserData={setUserData}
                        userData={userData}
                      />
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="AlbumView" component={AlbumView} />
                </Stack.Navigator>
              )}
      
              <BottomBar
                currSong={currSong}
                selected_content={selected_content}
                setSelectedContent={content_selected}
                setCurrentSong={set_song}
                shouldStopSong={shouldStopSong}
                setShouldStopSong={setShouldStopSong}
                trendingContent={fetchedTrendingSongs}
              />
            </View>
          </NavigationContainer>
        );
      }
    } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
      return (
        <View style={styles.container}>
          <MainMobile />
        </View>
      );
    }
  
}

let popups = () => {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090A',
  },
});
