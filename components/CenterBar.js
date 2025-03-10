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
import { ScrollView } from 'react-native-web';

function Centerbar(props)
{
  return(
    <View style={styles.centerbar}>
      <CenterbarWindow></CenterbarWindow>
      <CenterbarWindowFeed></CenterbarWindowFeed>
    </View>
  );
}

function CenterbarWindowFeed(props){
  return(
    <View style={styles.centerbarWindowFeed}>

      <View style={{paddingLeft: 10, flexDirection: "row", columnGap: 5}}>
        <Window_Button content="All"></Window_Button>
        <Window_Button content="Music"></Window_Button>
        <Window_Button content="Podcasts"></Window_Button>
        <Window_Button content="Audiobooks"></Window_Button>
        <Popup content="Upload Song" />
      </View>

      <ScrollView style={{width:"100%"}} showsHorizontalScrollIndicator={false}>

        <Catagory name="Trending Songs"></Catagory>
        <Catagory name="Recently Played"></Catagory>
        <Catagory name="Dashify's Picks"></Catagory>
        
      </ScrollView>

    </View>
  );
}

function CenterbarWindow(props){
    return(
      <View style={styles.centerbarWindow}>

        <View style={styles.PlaylistBar}>

          <View style={styles.PlaylistBarGroupLeft}>
          <WindowBarButtonUI
                imageSource={require('../images/png/left_panel_open.png')}>
                </WindowBarButtonUI>
            <Text style={styles.libraryHeader}>Your Library</Text>
          </View>
          
          <View style={styles.PlaylistBarGroupRight}>
            <PlaylistPopup/>
            <WindowBarButton2UI
              imageSource={require('../images/png/arrow_forward_alt.png')}
            ></WindowBarButton2UI>
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
            <RecentsButton></RecentsButton>
          </View>
        </View>

        {/* library rows examples*/}
        {/* replace with a for loop that gets songs from back end vvv */}

        <ScrollView style={{width:"100%"}} showsHorizontalScrollIndicator={false}>
          <View style={styles.libraryContents}>
          <ParentComponent />
            <LibraryRow rowName="Skibity" rowDesc="very cool playlist"></LibraryRow>
          </View>
        </ScrollView>



      </View>
    );
}

const LibraryRow = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Add this handler function
  const handlePress = () => {
    console.log('Row pressed');
    if (props.activation) {
      props.activation();
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
          source={props.imageSource ? props.imageSource : require("./../images/png/test_album.png")}
          style={props.isArtist ? styles.libraryArtistImage : styles.libraryPlaylistImage}
        />
        
        <View>
          <View>
            <Text style={styles.libraryPlaylistTextHeader}>
              {props.rowName ? props.rowName : "Playlist Name"}
            </Text>
          </View>
          <View>
            <Text style={styles.libraryPlaylistTextDescription}>
              {props.rowDesc ? props.rowDesc : "Description"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};


let FeedBox = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return(
    <TouchableOpacity onPress={() => props.activation}>

      <View 
        style={isHovered ? styles.feedBoxHovered : styles.feedBox} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <Image
          source={props.imageSource ? props.imageSource : require("./../images/png/test_album.png")}
          style={props.isArtst ? styles.feedArtistImage : styles.feedPlaylistImage}
          />
        
        <view>
          <View style={{paddingTop: 10}}>
            <Text style={{color:"white"}}>{props.rowName ? props.rowName: "Playlist Name"}</Text>
          </View>
        </view>
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
          <FeedBox rowName="Skibity" rowDesc="very cool playlist"></FeedBox>
          <FeedBox rowName="Sigma" rowDesc="skibity cool playlist"></FeedBox>
          <FeedBox rowName="Dogma" rowDesc="this a artist" isArtst={true}></FeedBox>
          <FeedBox rowName="John Pork" rowDesc="ye playlist"></FeedBox>
          <FeedBox rowName="John Pork" rowDesc="ye playlist"></FeedBox>
          <FeedBox rowName="John Pork" rowDesc="ye playlist"></FeedBox>
          <FeedBox rowName="John Pork" rowDesc="ye playlist"></FeedBox>
          <FeedBox rowName="John Pork" rowDesc="ye playlist"></FeedBox>
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

      PlaylistBar:{
        width: "100%",
        height: "10%",

        flexDirection: "row",
        alignItems: "center",



      },

      PlaylistBarGroupLeft:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2.5,
        

      },

      PlaylistBarGroupRight:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
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
      },

      feedContents:{
        width: "100%",
        flexDirection: "row"
      },

      libraryPlaylistImage:{
        height: "2.7rem",
        width: "2.7rem",
        resizeMode: "contain",
        borderRadius: 6,
      },
      libraryArtistImage:{
        height: "2.7rem",
        width: "2.7rem",
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
        height: "4rem",
        paddingLeft: 10,
        paddingRight: 10,
      },
      libraryRowHovered:{
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        width: "100%",
        height: "4rem",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
      },

      feedBox:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        columnGap: 10,

        width: "10rem",
        height: "10rem",
      },
      feedBoxHovered:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 10,

        backgroundColor: "rgba(255, 255, 255, 0.1)",

        width: "10rem",
        height: "10rem",

        rowGap:0,


        borderRadius: 6,
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
});

export { Centerbar, LibraryRow, CenterbarWindow };