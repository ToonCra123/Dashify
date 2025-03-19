import React from 'react';
import {useState,  useRef, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { BarButtonUI, WindowBarButtonUI, BarButton, WindowBarButton2UI } from './UI/BarButton';
import { Window_Button } from './UI/WindowButton';
import { WindowInput } from './UI/WindowInputField'
import WebScrollView from './UI/WebScrollView';
import Popup from './UI/UploadSong.js';
import PlaylistPopup from './UI/CreatePlaylist.js';
import ParentComponent from './UI/ParentComponents.js';
import { FlatList, ImageBackground, ScrollView } from 'react-native-web';
import { LinearGradient } from 'expo-linear-gradient';
import {MAIN_COLOR_GRADIENT, MAIN_COLOR_BASE, CONTENTWINDOW_COLOR_BASE, CONTENTWINDOW_COLOR_GRADIENT} from './UI/Colors.js'
import { getPlaylist, getSong, getTrending } from './UI/WebRequests.js';
import AlbumView from '../AlbumView.js';
import { useNavigation } from '@react-navigation/native';

//JSON.parse(sessionStorage.getItem("selected_content"));

function Centerbar(props)
{
  const collapse_menu_icons = {
    left_open: require("./../images/png/arrow_menu_open.png"),
    left_close: require("./../images/png/arrow_menu_close.png"),
    right_open: require("./../images/png/arrow_menu_close.png"),
    right_close: require("./../images/png/arrow_menu_open.png"),
  }

  
  const [collapseMenu, setCollapseMenu] = useState(false);
  const [collapseMenuIcon, setCollapseMenuIcon] = useState(collapseMenu ? collapse_menu_icons.left_close : collapse_menu_icons.left_open);


  return (
    

   <View style={styles.centerbar}>

      {collapseMenu ? (
      <CenterbarWindow 
        collapseMenu={collapseMenu} 
        setCollapseMenu={setCollapseMenu}
        collapseMenuIcon={collapseMenuIcon}
        setCollapseMenuIcon={setCollapseMenuIcon}
        collapse_menu_icons={collapse_menu_icons}

        selected_content={props.selected_content} 
        setSelectedContent={props.setSelectedContent} 
        setCurrentSong={props.setCurrentSong}

        /> ) : 
        
        <CenterbarWindowCollapsed
          collapseMenu={collapseMenu} 
          setCollapseMenu={setCollapseMenu}
          collapseMenuIcon={collapseMenuIcon}
          setCollapseMenuIcon={setCollapseMenuIcon}
          collapse_menu_icons={collapse_menu_icons}

          selected_content={props.selected_content} 
          setSelectedContent={props.setSelectedContent} 
          setCurrentSong={props.setCurrentSong}
        />}
      {

      
        
      props.searchQuery.length > 0 ? (
        <CenterBarWindowSearchResults 
          selected_content={props.selected_content} 
          setSelectedContent={props.setSelectedContent} 
          setCurrentSong={props.setCurrentSong} 
          songSearchData={props.songSearchData} 
          artistSearchData={props.artistSearchData} 
        />
      ) : props.selected_content ? (
        <CenterbarWindowContentDetails 
          selected_content={props.selected_content} 
          setSelectedContent={props.setSelectedContent} 
          setCurrentSong={props.setCurrentSong} 
          songSearchData={props.songSearchData} 
          artistSearchData={props.artistSearchData} 
        />
      ) : (
        <CenterbarWindowFeed 
          selected_content={props.selected_content} 
          setSelectedContent={props.setSelectedContent} 
          trendingContent={props.trendingContent} 
          setCurrentSong={props.setCurrentSong} 
          currSong={props.currSong} 
        />
      )
    }

    </View>
  );
}


function CenterBarWindowSearchResults(props){

  const search_result_catagories = {
    songResultsTitle: "Songs",
    artistResultsTitle: "By Artists",
    topResultTitle: "Top Result",
    noResultTitle: "No Results :(",
  }

  return(
    <LinearGradient style={styles.centerbarWindowContent}
    colors={[CONTENTWINDOW_COLOR_GRADIENT, CONTENTWINDOW_COLOR_BASE]}
    start={{x: 1, y:1}}
    end={{x: 1, y:0}}>

    <ScrollView style={{width: "100%"}} showsHorizontalScrollIndicator={false}>

        {props.songSearchData.length > 0 ? (
          <View>

            <View style={{flexDirection: "row", paddingLeft: 10}}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: "3rem"}}>{search_result_catagories.topResultTitle}</Text>
            </View>

            <LibraryRow rowName={props.songSearchData[0].title} rowDesc={props.songSearchData[0].artist} imageSource={props.songSearchData[0].imagePath} year={props.songSearchData[0].year} listens={props.songSearchData[0].listens} setCurrentSong={props.setCurrentSong} songdata={props.songSearchData[0]} currSong={props.currSong}></LibraryRow>   

          </View>
        ) : null}

        {props.songSearchData.length > 0 ? (
          <View>
            <View style={{backgroundColor:"white", height: 2, width: "100%", opacity: 0.1, borderRadius: 10}}></View>

            <View style={{flexDirection: "row", paddingLeft: 10}}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: "3rem"}}>{search_result_catagories.songResultsTitle}</Text>
            </View>
          </View>
        ) : null }
      

        { props.songSearchData.length > 0 ? (
          <FlatList
              data={props.songSearchData.slice(1)} //.slice(1) cuts first index since we are already showing that seperately
              renderItem={({ item, index }) => (
                <LibraryRow rowName={item.title} rowDesc={item.artist} imageSource={item.imagePath} year={item.year} listens={item.listens}  setCurrentSong={props.setCurrentSong} songdata={item} currSong={props.currSong}></LibraryRow>   
              )}
              keyExtractor={item => item._id}
            >
            
          </FlatList>
          
          ) : null
        }




        { props.artistSearchData.length > 0 ? (

          <View>
          <View style={{backgroundColor:"white", height: 2, width: "100%", opacity: 0.1, borderRadius: 10}}></View>

          <View style={{flexDirection: "row", paddingLeft: 10}}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: "3rem"}}>{search_result_catagories.artistResultsTitle}</Text>
          </View>

          <FlatList
                data={props.artistSearchData}
                renderItem={({ item }) => (
                  <LibraryRow rowName={item.title} rowDesc={item.artist} imageSource={item.imagePath} year={item.year} listens={item.listens} setCurrentSong={props.setCurrentSong} songdata={item} currSong={props.currSong}></LibraryRow>   
                )}
                keyExtractor={item => item._id}
              >
            
            </FlatList>
          </View>

          ) : null
        }

        { props.songSearchData.length === 0  && props.artistSearchData.length === 0 ? (
          <View style={{paddingLeft: 10}}>
            <Text style={{color: "white", fontSize: "3rem", fontWeight: "bold"}}>{search_result_catagories.noResultTitle}</Text>
          </View>
          
          ) : null
        }
      </ScrollView>
      
    </LinearGradient>
  );
}

function CenterbarWindowFeed(props){
  
  //fetch the trending data from back end
  const [fetchedTrendingSongs, setFetchedTrendingSongs] = useState([]) //To update trending songs call 'requestTrendingSongs' DO NOT set 'fetchedTrendingSongs' manually

  let example = { _id: "67d25d6d31ba33534c6a6e31", title: "Flamingo", artist: "Kero Kero Bonito"}

  let na = false;

  //props.setCurrentSong(example);

  return(
    <LinearGradient 
    style={styles.centerbarWindowFeed}
    colors={[CONTENTWINDOW_COLOR_BASE, CONTENTWINDOW_COLOR_GRADIENT]}
    start={{x: 0, y:0}}
    end={{x: 0, y:0}}>

      <View style={{paddingLeft: 10, flexDirection: "row", columnGap: 7}}>
        <Window_Button content="All"></Window_Button>
        <Window_Button content="Music"></Window_Button>
        <Window_Button content="Podcasts"></Window_Button>
        <Window_Button content="Audiobooks"></Window_Button>
        
        <Popup content="Upload Song"></Popup>
      </View>

      <ScrollView style={{width:"100%"}} showsHorizontalScrollIndicator={false}>
        <Catagory name="Trending Songs" sectionContent={props.trendingContent} setCurrentSong={props.setCurrentSong} currSong={props.currSong}></Catagory>
        <Catagory name="Recently Played"></Catagory>
        <Catagory name="Dashify's Picks"></Catagory>
        
      </ScrollView>

    </LinearGradient>
  );
}


function CenterbarWindowContentDetails(props){

  const [isPlaylistLoading, setIsPlaylistLoading] = useState(true);
  const [songlist, setSonglist] = useState([]);

  let asyncGetSongs = async (songs)=>{
    for(let i = 0; i < songs.length; i++)
      {
        let song = await getSong(songs[i], false);

        let templist = songlist;
        templist.push(song);

        (i === 0) ? setFetchedPlaylistImage(song.imagePath) : null;
        
        setSonglist(templist);
      }
  }


  useEffect(() => {

    getPlaylist("67d38e527de6a9174989d40e").then((obj) =>{
      asyncGetSongs(obj.songs).then(()=>{
        setIsPlaylistLoading(false);
      })

      setFetchedPlaylistName(obj.title);
      setFetchedPlaylistDesc(obj.description);
    })
    
  }, []);

  let contentTitle = JSON.parse(sessionStorage.getItem("content_title"));
  let contentArtist = JSON.parse(sessionStorage.getItem("content_artist"));
  let contentCover = JSON.parse(sessionStorage.getItem("content_cover"));

  let contentType = JSON.parse(sessionStorage.getItem("content_type"));

  let default_webImage = "https://imgs3.goodsmileus.com/image/cache/data/productimages/HELLO/SnowMiku/01_240828124748305-1200x1200.jpg";


  let title = !contentTitle ? "Stone Pebble Pirates" : contentTitle;
  let artist = !contentArtist ? "ALABAMA ROCK" : contentArtist;
  let albumCover = !contentCover ? default_webImage : contentCover; //URL OR FILEPATH TO COVER IMAGE (MUST BE 1:1 ACPECT RATIO)

  let type = !contentType ? "{content_type}" : contentType;


  let tempgetsong = [
    { id: '1234'}
    // Add more items as needed
  ];

  let tempsongdata = [
      {
        "_id": "67d20f2e545d22af7e35a887",
        "title": "A Thousand Miles",
        "artist": "Vanessa Carlton",
        "year": 2001,
        "mp3Path": "http://api.toonhosting.net/mp3/mp3-1741819692536-654986767.mp3",
        "imagePath": "http://api.toonhosting.net/img/image-1741819694111-923389136.jpg",
        "listens": 6
      }
      // Add more items as needed
  ];

  const [fetchedPlaylistName, setFetchedPlaylistName] = useState(".......")
  const [fetchedPlaylistDesc, setFetchedPlaylistDesc] = useState(".......")
  const [fetchedPlaylistImage, setFetchedPlaylistImage] = useState("https://i.pinimg.com/originals/80/b5/81/80b5813d8ad81a765ca47ebc59a65ac3.jpg");
  

  return(
    <LinearGradient style={styles.centerbarWindowContent}
    colors={[CONTENTWINDOW_COLOR_GRADIENT, CONTENTWINDOW_COLOR_BASE]}
    start={{x: 1, y:1}}
    end={{x: 1, y:0}}>

      <View style={{flexDirection: "row"}}>
        <ImageBackground
          source={{ uri: fetchedPlaylistImage}} // Replace with your image URL
          imageStyle={{ borderRadius: 15 }} // Optional: Style the background image
          style={{width: 400, height: 400}}
        >
        </ImageBackground>
          
        <View style={{paddingHorizontal: 40, justifyContent: "flex-end", height: 400}}>
          <View>
            <Text style={{color: "white", fontSize: "3rem"}}>Playlist</Text>
          </View>

          <View>
            <Text style={{color: "white", fontSize: "6rem", fontWeight: "750"}}>{fetchedPlaylistName}</Text>
          </View>

          <View>
            <Text style={{color: "white", fontSize: "3rem"}}>{fetchedPlaylistDesc}</Text>
          </View>
        </View>
      </View>

      <View style={{backgroundColor:"white", height: 2, width: "100%", opacity: 0.1, borderRadius: 10}}></View>

      { !isPlaylistLoading ? (
        <ScrollView style={{width: "100%"}} showsHorizontalScrollIndicator={false}>
          <FlatList
              data={songlist}
              renderItem={({ item }) => (
                <LibraryRow rowName={item.title} rowDesc={item.artist} imageSource={item.imagePath} year={item.year} listens={item.listens} setCurrentSong={props.setCurrentSong} songdata={item}></LibraryRow>   
              )}
              keyExtractor={item => item._id} // Unique key for each item
            >
          
        
          </FlatList>
        
        </ScrollView>) : null
      }
      
    </LinearGradient>
  );
}

function CenterbarWindow(props){

  // TODO: Add a call to get playlists from backend
  const [playlists, setPlaylists] = useState([]);
  const navigation = useNavigation();


  // TODO: Add API call to add playlist to backend 
  // and update the state with the new playlist
  let playlistHandler = (newPlaylist) => {
    setPlaylists(prev => [...prev, {
      id: Date.now().toString(),
      name: newPlaylist.playlistName,
      description: newPlaylist.description
    }]);
  }


  let toggle_menu_state = (v) => {
    props.setCollapseMenu(!props.collapseMenu);

  }

  useEffect(() => {
    if (props.collapse_menu_icons) {
      props.collapseMenu 
        ? props.setCollapseMenuIcon(props.collapse_menu_icons.left_close) 
        : props.setCollapseMenuIcon(props.collapse_menu_icons.left_open);
    }
  }, [props.collapseMenu, props.collapse_menu_icons]);


  
    return(
      <LinearGradient 
      style={styles.centerbarWindow}
      colors={[MAIN_COLOR_BASE, MAIN_COLOR_GRADIENT]}
      start={{x: 0, y:0}}
      end={{x: 0, y:0}}>

        <View style={styles.PlaylistBar}>

          <View style={styles.PlaylistBarGroupLeft}>

          <WindowBarButtonUI
                imageSource={require('../images/png/library.png')}>
                </WindowBarButtonUI>
            <Text style={styles.libraryHeader}>Your Library</Text>
          </View>


          
          <View style={styles.PlaylistBarGroupRight}>
            <WindowBarButtonUI
              imageSource={props.collapseMenuIcon}
              activation={toggle_menu_state}
              >
            </WindowBarButtonUI>
          </View>
        
        </View>

        <View style={styles.WindowButtonsGroup}>
          <Window_Button content="Playlists"></Window_Button>
          <Window_Button content="Artists"></Window_Button>
        </View>

        <View style={styles.PlaylistSearchbar}>
          <View style={styles.PlaylistBarGroupLeft}>
            <WindowInput placeholder="Search in Your Library"></WindowInput>
          </View>

          <View style={styles.PlaylistSearchbarGroupRight}>
            <PlaylistPopup onCreatePlaylist={playlistHandler}/>
            {/*<RecentsButton></RecentsButton>*/}
          </View>
        </View>

        {/* library rows examples*/}
        {/* replace with a for loop that gets songs from back end vvv */}

        <ScrollView style={{width:"100%"}} showsHorizontalScrollIndicator={false}>
          <View style={styles.libraryContents}>
            {playlists.map(playlist => (
                    <LibraryRow
                      key={playlist.id}
                      rowName={playlist.name}
                      rowDesc={playlist.description}
                      activation={() =>  navigation.navigate('AlbumView', { 
                        playlist: playlist
                      })}
                    />
                  ))}
            <LibraryRow 
              rowName="Skibity" 
              rowDesc="very cool playlist" 
              activation={props.setSelectedContent}
              setCurrentSong={props.setCurrentSong}
            ></LibraryRow>
          </View>
        </ScrollView>



      </LinearGradient>
    );
}


function CenterbarWindowCollapsed(props){

  // TODO: Add a call to get playlists from backend
  const [playlists, setPlaylists] = useState([]);


  // TODO: Add API call to add playlist to backend 
  // and update the state with the new playlist
  let playlistHandler = (newPlaylist) => {
    setPlaylists(prev => [...prev, {
      id: Date.now().toString(),
      name: newPlaylist.playlistName,
      description: newPlaylist.description
    }]);
  }


  let toggle_menu_state = (v) => {
    props.setCollapseMenu(!props.collapseMenu);

  }

  useEffect(() => {
    props.collapseMenu ? props.setCollapseMenuIcon(props.collapse_menu_icons.left_close) : props.setCollapseMenuIcon(props.collapse_menu_icons.left_open);
  }, [props.collapseMenu]);


  
    return(
      <LinearGradient 
      style={styles.centerbarWindowCollapsed}
      colors={[MAIN_COLOR_BASE, MAIN_COLOR_GRADIENT]}
      start={{x: 0, y:0}}
      end={{x: 0, y:0}}>

      <View style={styles.PlaylistBarCollapsed}>

        <View style={styles.PlaylistBarGroupCenter}>
          <WindowBarButtonUI
            imageSource={props.collapseMenuIcon}
            activation={toggle_menu_state}
            >
          </WindowBarButtonUI>
        </View>

      </View>


        <ScrollView style={{width:"100%"}} showsHorizontalScrollIndicator={false}>
          <View style={styles.libraryContents}>
            <CollapseLibraryRow rowName="Skibity" rowDesc="very cool playlist" activation={props.setSelectedContent}></CollapseLibraryRow>
          </View>
        </ScrollView>

      </LinearGradient>
    );
}


const LibraryRow = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Add this handler function
  const handlePress = () => {
    if (props.activation) {
      props.activation();
    }

    // Add check to ensure setCurrentSong exists before calling it
    if (props.setCurrentSong && typeof props.setCurrentSong === 'function' && props.songdata) {
      props.setCurrentSong(props.songdata);
      console.log(props.songdata, props.setCurrentSong);
    }
  };

  return(
    <TouchableOpacity 
      onPress={handlePress} // Fixed: Directly use handler function
    >
      <View 
        style={isHovered ? styles.libraryRowHovered : styles.libraryRow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          source={props.imageSource ? {uri: props.imageSource} : require("./../images/png/test_album.png")}
          style={props.isArtist ? styles.libraryArtistImage : styles.libraryPlaylistImage}
        />
        
        <View>
          <View>
            <Text style={styles.libraryPlaylistTextHeader}>
              {props.rowName ? props.rowName : "Playlist Name"}
              {props.year ? (" (" + props.year + ")") : null}

            </Text>
          </View>
          <View style={{flexDirection: "row"}}>
            <Text style={styles.libraryPlaylistTextDescription}>
              {props.rowDesc ? props.rowDesc : "Description"}
            </Text>

            <View style={{flexDirection: "row", height: 20, alignItems: "center", columnGap: 4, paddingHorizontal: 4}}>
              
              
              <ImageBackground 
                source={(props.listens || (props.listens === 0)) ? require("./../images/png/listens.png") : null}
                style={{height: 15, width: 15, alignItems: "center"}}
              >

              </ImageBackground>
              <Text style={{color: "white"}}>{(props.listens || (props.listens === 0)) ? props.listens : null}</Text>

            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CollapseLibraryRow = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Add this handler function
  const handlePress = () => {
    if (props.activation) {
      props.activation();
    }

    props.setCurrentSong(props.songdata);
    console.log(props.songdata, props.setCurrentSong);
  };

  return(
    <TouchableOpacity 
      onPress={handlePress} // Fixed: Directly use handler function
    >
      <View 
        style={isHovered ? styles.CollapseLibraryRowHovered : styles.CollapseLibraryRow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          source={props.imageSource ? {uri: props.imageSource} : require("./../images/png/test_album.png")}
          style={props.isArtist ? styles.libraryArtistImage : styles.libraryPlaylistImage}
        />
      </View>
    </TouchableOpacity>
  );
};


let FeedBox = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if(props.currSong)
      {
        if(props.currSong._id === props.songdata._id)
        {
          setIsSelected(true);
        }
        else
        {
          setIsSelected(false);
        }
      }
  }, [props.currSong]);

  let triggerFeedBox = () => {
    props.setCurrentSong(props.songdata)
  }

  function truncateString(str, amount = 30) {
    if (str.length > amount) {
      return str.slice(0, amount) + '...';
    }
    return str;
  }

  return(
    <TouchableOpacity onPress={triggerFeedBox}>

      <View 
        style={isHovered ? styles.feedBoxHovered : styles.feedBox} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        
        <View style={{flex: 1}}>
          <View style={{}}>
            <View 
              style={{
                
                height: "100%",
                width: 170,
                aspectRatio: 1,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
            
              <ImageBackground
                source={props.imageSource ? props.imageSource : require("./../images/png/test_album.png")}
                style={{flex:1,}}
                />
              
            </View>
          </View>
          
          <View style={{flex: 1}}>
            
            <View style={{paddingTop: 5}}>
              <Text style={{color:"white", fontWeight: "bold", fontSize: "1.25rem"}}>{props.rowName ? truncateString(props.rowName) : "Playlist Name"}</Text>
            </View>
            <View style={{}}>
              <Text style={{color:"white"}}>{props.rowDesc ? truncateString(props.rowDesc) : "Artist Name"}</Text>
            </View>

          </View>
        </View>
        
      </View>

    </TouchableOpacity>
  );
}

let RecentsButton = () => {
  return(
  
  <TouchableOpacity>

    <View style={styles.recentsGroup}>

      <View>
        <Text style={styles.recentsText}>
          Recents
        </Text>
      </View>

      <View>
        <Image
          source={require("./../images/png/list.png")}
          style={styles.recentsImage}
        />
      </View>

    </View>
  </TouchableOpacity>
  );
}



let Catagory = (props) => {


  return(
    <View>
      <View style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 20}}>
        <Text style={{color: "white", fontWeight: "bold", fontSize: "1.75rem"}}>{props.name ? props.name : "{Unnamed Catagory, please set 'name' property}"}</Text>
      </View>

      <WebScrollView disableShiftScrolling scrollSpeed={1} contentContainerStyle={{paddingBottom: 20,}}>
        <View style={styles.feedContents}>
          { !(props.sectionContent === undefined) ? 
          <FlatList
              data={props.sectionContent}
              horizontal
              renderItem={({ item }) => (
                      
                <FeedBox rowName={item.title}rowDesc={item.artist} imageSource={item.imagePath} setCurrentSong={props.setCurrentSong} songdata={item} currSong={props.currSong}></FeedBox>
                      
              )}
              keyExtractor={item => item._id} // Unique key for each item
            >
        
          </FlatList>
          : <FeedBox rowName={"EMPTY CATAGROY DATA"}rowDesc={"MAKE SURE YOU ARE REQUESTING DATA"} imageSource={{uri: "https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"}}></FeedBox>}
        </View>
      </WebScrollView>
    </View>
  );

};


const styles = StyleSheet.create({
      libraryHeader:{
        fontWeight: "bold",
        color: "white",
        fontSize: "1.1rem"
      },
      barImage:{
        height: "2.25vw",
        width: "2.25vw",
        borderRadius: 6,
      },
    
      centerbar:{
        flex:1,
        flexDirection:"row",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10,
        overflow: "hidden",
      },

    
      centerbarWindow:{
        flex:0.75,
        flexDirection:"column",
        alignItems: "flex-start",
        backgroundColor: "#222823",
        height: "100%",
        borderRadius: 10,
        
        paddingTop: 30,
        paddingHorizontal: 10,
        rowGap: 10,
      },

      centerbarWindowCollapsed:{
        flex:0.2,
        flexDirection:"column",
        alignItems: "flex-start",
        backgroundColor: "#222823",
        height: "100%",
        borderRadius: 10,
        
        paddingTop: 30,
        paddingHorizontal: 10,
        rowGap: 10,
      },

      centerbarWindowFeed:{
        flex:3,
        flexDirection:"column",
        alignItems: "flex-start",
        backgroundColor: "#222823",
        height: "100%",
        borderRadius: 10,
        paddingTop: 30,
        paddingHorizontal: 10,
        rowGap: 10,
      },

      centerbarWindowContent:{
        flex:3,
        flexDirection:"column",
        alignItems: "flex-start",
        backgroundColor: "#222823",
        height: "100%",
        borderRadius: 10,
        paddingTop: 30,
        paddingHorizontal: 10,
        rowGap: 10,
        gap: 5,
      },

      PlaylistBar:{
        width: "100%",
        height: "10%",

        flexDirection: "row",
        alignItems: "center",



      },

      PlaylistBarCollapsed:{
        width: "100%",
        height: "10%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",



      },

      PlaylistBarGroupLeft:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        

      },

      PlaylistBarGroupRight:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",

      },

      PlaylistBarGroupCenter:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },

      WindowButtonsGroup:{
        flexDirection: "row",
        gap: 10,
      },

      PlaylistSearchbar:{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingRight: 0,
      },

      PlaylistSearchbarGroupLeft:{
        flex: 1,
        alignItems: "flex-start",
      },

      PlaylistSearchbarGroupRight:{
        flex: 1,
        alignItems: "flex-end",
        width: "50%",
      },

      recentsGroup:{
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 0,
        paddingLeft: 0,
      },

      recentsImage:{
        height: "2rem",
        height: "2rem",
        resizeMode: "contain",
      },

      recentsText:{
        color: "white",
      },

      libraryContents:{
        width: "100%",
        flexDirection: 'column-reverse'
      },

      feedContents:{
        width: "100%",
        flexDirection: "row"
      },

      libraryPlaylistImage:{
        height: 75,
        width: 75,
        resizeMode: "contain",
        borderRadius: 6,
      },
      libraryArtistImage:{
        height: 75,
        width: 75,
        resizeMode: "contain",
        borderRadius: 40,
      },

      feedPlaylistImage:{
        height: "7rem",
        width: "7rem",
        resizeMode: "contain",
        borderRadius: 6,
      },
      feedArtistImage:{
        height: "7rem",
        width: "7rem",
        resizeMode: "contain",
        borderRadius: 80,
      },


      libraryPlaylistTextHeader:{
        color: "white",
        fontWeight: "bold",
      },
      libraryPlaylistTextDescription:{
        color: "white",
      },

      libraryRow:{
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        width: "100%",
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
      },

      libraryRowHovered:{
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        width: "100%",
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
      },

      CollapseLibraryRow:{
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 10,
        width: "100%",
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        opacity: 0.95,
      },

      CollapseLibraryRowHovered:{
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 10,
        width: "100%",
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        opacity: 1,
      },

      feedBox:{
        flexDirection: "column",
        paddingTop: 10,
        alignItems: "center",
        aspectRatio: 1,
        width: 200,
        height: 275,
        overflow: "hidden",
      },

      feedBoxHovered:{
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        aspectRatio: 1,
        width: 200,
        height: 275,
        overflow: "hidden",
        borderRadius: 5,
      },

      libraryRowSelected:{
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        width: "100%",
        height: "4rem",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
      },

      background: {
        flex: 1, // Make sure the ImageBackground takes up the entire space
        justifyContent: 'center', // Center your content
        alignItems: 'center', // Center your content
      },
      container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
        padding: 20,
      },
      text: {
        color: 'white',
        fontSize: 20,
      },
});

export { Centerbar, LibraryRow, CenterbarWindow };