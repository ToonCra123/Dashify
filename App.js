import React, { useEffect } from "react";
import { Platform, StyleSheet, View, Modal } from 'react-native';
import { TopBar } from './components/TopBar.js';
import { BottomBar } from './components/BottomBar.js';
import { Centerbar } from './components/CenterBar.js';
import AlbumView from './AlbumView.js';
import 'react-native-gesture-handler';
import MainMobile from "./components/mobile/MainMobile.js";
import PlaylistPopup from "./components/UI/CreatePlaylist.js";

export default function App() {
  if(Platform.OS === 'web') {
  return (
    <View style={styles.container}>
      <TopBar/>
      <Centerbar/>
      <BottomBar />
      
      

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