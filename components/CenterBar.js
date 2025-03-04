import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { BarButtonUI, WindowBarButtonUI, BarButton, WindowBarButton2UI } from './UI/BarButton';
import { Window_Button } from './UI/WindowButton';
import { WindowInput } from './UI/WindowInputField'

function Centerbar(props)
{
  return(
    <View style={styles.centerbar}>
      <CenterbarWindow></CenterbarWindow>
      <CenterbarWindow></CenterbarWindow>
      <CenterbarWindow></CenterbarWindow>
    </View>
  );
}

function CenterbarWindow(props){
    return(
      <View style={styles.centerbarWindow}>

        <View style={styles.PlaylistBar}>

          <View style={styles.PlaylistBarGroupLeft}>
              <WindowBarButtonUI
                imageSource={require('../images/png/left_panel_open.png')}
              ></WindowBarButtonUI>
            <Text style={styles.libraryHeader}>Your Library</Text>
          </View>

          <View style={styles.PlaylistBarGroupRight}>
            <WindowBarButton2UI
              imageSource={require('../images/png/add.png')}
            ></WindowBarButton2UI>
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



      </View>
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
        flex:1,
        flexDirection:"column",
        alignItems: "flex-start",
        backgroundColor: "#222823",
        height: "100%",
        borderRadius: 10,

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
});

export { Centerbar };