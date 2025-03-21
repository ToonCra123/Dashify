import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import { CenterbarWindow } from './components/CenterBar';
import { WindowInput } from './components/UI/WindowInputField';
import Popup from './components/UI/UploadSong';

const AlbumView = ({ route }) => {
  const { playlist } = route.params || {};

  return (
    <View style={styles.bruh}>
      <View style={styles.container}>
        <CenterbarWindow/>
          <ScrollView style={styles.list}>
            <View style={styles.rowContainer}>
              <Image style={styles.image} source={require('./images/png/test_album.png')}/>
                <View style={styles.textContainer}>
                  <Text style={styles.text2}>{playlist?.name}</Text>
                  <Text style={styles.text3}>{playlist?.description}</Text>
              </View>
            </View>
            <View style={styles.container2}>
              <TouchableOpacity>
                <Image  style={{height: "6vh", width: "3vw"}} source={require("./images/png/more.png")}/>
                {/* make button do stuffs */}
              </TouchableOpacity>
              <Popup />
              <Text style={{color: "white", position: "absolute", right: 60, fontWeight: "bold"}}>List</Text>
              <TouchableOpacity>
                <Image style={{height: "6vh", width: "3vw"}} source={require("./images/png/list.png")}/>
                {/* make button do stuffs */}
              </TouchableOpacity>
            </View>
            <WindowInput placeholder={"Search for songs"}/>
          </ScrollView>
        </View>
     </View>
  );
};

//test

const styles = StyleSheet.create({
  bruh: {
    height: '100%'
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#08090A',
    paddingLeft: 10,
    alignContent: "center"
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 25
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "condensedBold"
  },
  text2: {
    color: "white",
    fontSize: 80,
    fontWeight: "bold"
  },
  text3: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold"
  },
  list: {
    width: "52%",
    backgroundColor: "#1F1F1F",
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 30,
  },
  image:{
    height: 250,
    width: 250,
    borderRadius: 5,
    flexShrink: 0
  },
  rowContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    gap: 30
  },
  textContainer: {
    flex: 1,
    marginTop: 100
  }
});

export default AlbumView;