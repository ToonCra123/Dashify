import React, { useState } from "react";
import { Platform, StyleSheet, View, Modal } from 'react-native';
import { TopBar } from './components/TopBar.js';
import { BottomBar } from './components/BottomBar.js';
import { Centerbar } from './components/CenterBar.js';
import AlbumView from './AlbumView.js';
import 'react-native-gesture-handler';
import MainMobile from "./components/mobile/MainMobile.js";
import PlaylistPopup from "./components/UI/CreatePlaylist.js";

// This is example for song 
let currSong = {
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
  if(Platform.OS === 'web') {
  return (
    <View style={styles.container}>
      <TopBar/>
      <Centerbar/>
      <BottomBar currSong={currSong} />
      
      

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