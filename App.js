import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBar } from "./components/TopBar.js";
import { BottomBar } from "./components/BottomBar.js";
import { Centerbar } from "./components/CenterBar.js";
import AlbumView from "./AlbumView.js";
import "react-native-gesture-handler";
import MainMobile from "./components/mobile/MainMobile.js";
import { getPlaylist, getSong, getTrending, loginUser } from "./components/UI/WebRequests.js";
import { createNavigationContainerRef } from '@react-navigation/native';
import LoginWindow from './components/UI/Login.js';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

// Platform-agnostic storage solution
const storage = {
  setItem: async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  getItem: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await AsyncStorage.getItem(key);
  },
  removeItem: async (key) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  }
};

export default function App() {
  const [fetchedTrendingSongs, setFetchedTrendingSongs] = useState([]);
  const [shouldStopSong, setShouldStopSong] = useState(false);
  const [currSong, setCurrSong] = useState({});
  const [selected_content, setSelectedContent] = useState(false);
  const [songSearchData, setSongSearchData] = useState([]);
  const [artistSearchData, setArtistSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected_playlistID, setSelectedPlaylistID] = useState("67d38e527de6a9174989d40e");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({});

  // Load persisted data on mount
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const storedUser = await storage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error loading persisted data:', error);
      }
    };
    loadPersistedData();
  }, []);

  // Persist user data changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        if (userData?.status === 200) {
          await storage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };
    saveUserData();
  }, [userData]);

  // Trending songs initialization
  let requestTrendingSongs = async () => {};
  if (fetchedTrendingSongs.length === 0) {
    requestTrendingSongs = async (a) => {
      let tSongs = await getTrending(a);
      setFetchedTrendingSongs(tSongs);
      return fetchedTrendingSongs;
    };
  }
  requestTrendingSongs(20);

  useEffect(() => {
    if (fetchedTrendingSongs.length > 0) {
      setCurrSong(fetchedTrendingSongs[0]);
    }
  }, [fetchedTrendingSongs]);

  const content_selected = (v) => {
    v === undefined ? setSelectedContent(!selected_content) : setSelectedContent(v);
  };

  const set_song = (s) => {
    if (!(currSong._id === s._id)) {
      setCurrSong(s);
      setShouldStopSong(true);
      onSongChange();
    }
  };

  const onSongChange = () => {};


  let song_search_window = (data) => {
    setSongSearchData(data[0]);
    setArtistSearchData(data[1]);
  };

  const syncUserData = async (name, pass) => {
    try {
      const data = await loginUser(name, pass);
      if (data.status === 200) {
        setUsername(name);
        setPassword(pass);
        setUserData(data);
        setIsLoggedIn(false);
        await storage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { status: 500, error: 'Login failed' };
    }
  };

    if (Platform.OS === 'web') {

      if(isLoggedIn) //for log in page testing <<<<<
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090A',
  },
});

const popups = () => {};