import React from "react";
import { StyleSheet, View } from 'react-native';
import { TopBar } from './components/TopBar.js';
import { BottomBar } from './components/BottomBar.js';
import { Centerbar } from './components/CenterBar.js';

export default function App() {
  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <Centerbar></Centerbar>
      <BottomBar></BottomBar>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090A',
  },
});

