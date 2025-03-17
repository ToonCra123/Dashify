import React, { useState , useEffect} from "react";
import { Platform, StyleSheet, View, Modal } from 'react-native';
import { TopBar } from './components/TopBar.js';
import { BottomBar } from './components/BottomBar.js';
import { Centerbar } from './components/CenterBar.js';
import AlbumView from './AlbumView.js';
import 'react-native-gesture-handler';
import MainMobile from "./components/mobile/MainMobile.js";
import PlaylistPopup from "./components/UI/CreatePlaylist.js";

import { getPlaylist, getSong, getTrending } from './components/UI/WebRequests.js';



//import { LoginWindow } from './components/UI/Login.js';         to import login func from 'Login.js', if your func a different name, change 'LoginWindow' to your function name

// remember to export login function in Login.js like this 
// export function your_func_name(){}
// or:
// export let your_func_name = () => {}
// both mean same thing





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

  let song_search_window = (data) => {
    setSongSearchData(data[0]);
    setArtistSearchData(data[1]);

  }

  



if(false) //for log in page testing <<<<<
  {
    //return(<LoginWindow></LoginWindow>);              uncomment and put login function here when ready, make sure to import it ^^^^
  }

  else
  {

    if(Platform.OS === 'web') {
      return (
        <View style={styles.container}>
          <TopBar selected_content={selected_content} setSelectedContent={content_selected} setCurrentSong={set_song} setQueryData={song_search_window} setQuery={setSearchQuery}/>
          { (fetchedTrendingSongs.length > 0) ?
            <Centerbar selected_content={selected_content} currSong={currSong} setSelectedContent={content_selected} trendingContent={fetchedTrendingSongs} setCurrentSong={set_song} songSearchData={songSearchData} artistSearchData={artistSearchData} searchQuery={searchQuery}/>
            : null
          }
          <BottomBar currSong={currSong} selected_content={selected_content} setSelectedContent={content_selected} 
                    setCurrentSong={set_song} shouldStopSong={shouldStopSong} setShouldStopSong={setShouldStopSong}
                    trendingContent={fetchedTrendingSongs}
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
}

let popups = () => {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08090A',
  },
});