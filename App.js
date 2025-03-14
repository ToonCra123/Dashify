import React, { useState } from "react";
import { Platform, StyleSheet, View, Modal } from 'react-native';
import { TopBar } from './components/TopBar.js';
import { BottomBar } from './components/BottomBar.js';
import { Centerbar } from './components/CenterBar.js';
import AlbumView from './AlbumView.js';
import 'react-native-gesture-handler';
import MainMobile from "./components/mobile/MainMobile.js";
import PlaylistPopup from "./components/UI/CreatePlaylist.js";

import { getPlaylist, getSong, getTrending } from './components/UI/WebRequests.js';

// This is example for song 
let currSongEx = {
  "_id": "67d25c5031ba33534c6a6e2b",
  "title": "Rape Me",
  "artist": "Nirvana",
  "year": 1993,
  "mp3Path": "http://api.toonhosting.net/mp3/mp3-1741839439795-132461340.mp3",
  "imagePath": "http://api.toonhosting.net/img/image-1741839439744-9901521.jpg",
  "listens": 0,
  "__v": 0
}


export default function App() {

const [fetchedTrendingSongs, setFetchedTrendingSongs] = useState([]); //To update trending songs call 'requestTrendingSongs' DO NOT set 'fetchedTrendingSongs' manually
const [shouldStopSong, setShouldStopSong] = useState(false);

let requestTrendingSongs = async () => {}; //empty var for all we care

if(fetchedTrendingSongs.length === 0)
  {
    requestTrendingSongs = async (a) => {

      let tSongs = await getTrending(a);

      setFetchedTrendingSongs(tSongs);
      
      console.log(fetchedTrendingSongs);
      
      return fetchedTrendingSongs;
    }
  }
  else
  {
    console.log(fetchedTrendingSongs.length, fetchedTrendingSongs); //to not spam the back end with request for trending info
  }


  requestTrendingSongs(20);
  console.log(fetchedTrendingSongs, "App.js")

  const [currSong, setCurrSong] = useState(currSongEx);
  const [selected_content, setSelectedContent] = useState(false);

  let content_selected = (v) =>{
    (v === undefined) ? setSelectedContent(!selected_content) : setSelectedContent(v);
    console.log(v === null, v)
  }

  let set_song = (s) =>{

    if(!(currSong._id === s._id))
      {
        setCurrSong(s);
        setShouldStopSong(true);
        onSongChange();
        //make this crap work omg
      }
  }

  let onSongChange = () => {}
  



  if(Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <TopBar selected_content={selected_content} setSelectedContent={content_selected} setCurrentSong={set_song}/>
        { (fetchedTrendingSongs.length > 0) ?
          <Centerbar selected_content={selected_content} setSelectedContent={content_selected} trendingContent={fetchedTrendingSongs} setCurrentSong={set_song}/>
          : null
        }
        <BottomBar currSong={currSong} selected_content={selected_content} setSelectedContent={content_selected} 
                  setCurrentSong={set_song} shouldStopSong={shouldStopSong} setShouldStopSong={setShouldStopSong}
        />
      </View>
    );
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