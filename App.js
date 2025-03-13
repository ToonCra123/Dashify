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
  "_id": "67d2732e7de6a9174989d3e7",
  "title": "if there was a zombie apocalypse i'd let my dog eat me",
  "artist": "comfi beats",
  "year": 2023,
  "mp3Path": "http://api.toonhosting.net/mp3/mp3-1741845294096-192938891.mp3",
  "imagePath": "http://api.toonhosting.net/img/image-1741845294096-716534737.jpg",
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