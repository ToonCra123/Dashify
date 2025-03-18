import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarButton } from './UI/BarButton';
import { BarInput } from './UI/BarInputField';
import { ImageBackground } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { searchSongByArtist, searchSongByTitle } from './UI/WebRequests';
import { navigationRef } from '../App.js'; 


let TopBar = (props) => {
    const handleHomePress = () => {
        if (navigationRef.current) {
            navigationRef.current.navigate('Home');
        }
    }

    const navigation = useNavigation();
    
    let haspfp = true;
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {

        const fetchData = async () => {

            try{
                if(searchQuery.length > 0){
                    props.setQuery(searchQuery);

                    let songData = await searchSongByTitle(searchQuery, 20);
                    let artistData = await searchSongByArtist(searchQuery, 20);

                    let data = [songData, artistData]

                    props.setQueryData(data);

                }
                else
                {
                    props.setQuery(searchQuery);
                }
            }
            catch (error)
            {
                console.log("ERROR FETCHING SEARCH DATA: ", error);
                searchQuery ? props.setQuery(searchQuery) : props.setQuery("");
            }
        }

        fetchData();

    }, [searchQuery]);


    const home_icons = {
        home: require("../images/png/home.png"),
        homeHovered: require("../images/png/home_solid.png"),
    }

    return (
        <View style={styles.topBar}>
            <View style={styles.topBarGroupLeft}>
                <BarButton imageSource={require('../images/png/more.png')} activation={buttonTest} />
                <BarButton imageSource={require('../images/png/arrow_back.png')} activation={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}/>
                <BarButton imageSource={require('../images/png/arrow_forward.png')} activation={buttonTest} />
            </View>

            <View style={styles.topBarGroupCenter}>
                <View style={{justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 35}}>
                    <BarButton imageSource={home_icons.home} imageSourceHovered={home_icons.homeHovered} activation={handleHomePress}/>
                </View>

                <BarInput placeholder="What do you want to play?" setQuery={setSearchQuery}></BarInput>
            </View>
            
            { haspfp ? (
                <View style={styles.topBarGroupRight}>
                    <ImageBackground 
                    style={styles.profilePicutureImage}
                    source={require("./../images/png/test_album.png")}>
                    </ImageBackground>
                </View>
            ) : (
                <View style={styles.topBarGroupRight}>
                    <View style={styles.profilePicutureDefault}>
                        <Text style={styles.pfpText}>J</Text>
                    </View>
                </View>
            )}
            
        </View>
    );
};

// Button Functions
let buttonTest = () => {
    console.log("test worked");
};

let buttonTest2 = () => {
    console.log("test 2 worked");
};

const styles = StyleSheet.create({
    topBar:{
        flex:0.075,
        flexDirection:"row",
        backgroundColor: "#08090A",
        alignItems: "center",
        overflow: "hidden",
      },

      topBarGroupLeft:{
        flex: 0.1,
        flexDirection: "row",
        gap: 0,
        paddingHorizontal: 10,
      },
    
      topBarGroupCenter:{
        flex: 1,
        flexDirection: "row",
        gap: 15,
        paddingHorizontal: 10,
        justifyContent: "center",
      },
    

    
      topBarGroupRight:{
        flex: 0.1,
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 15,

        paddingRight: 20,
      },

      profilePicutureDefault:{
        backgroundColor: "rgb(0, 183, 255)", 
        borderRadius: 35, 
        height: "3rem", 
        width: "3rem", 
        justifyContent: "center", 
        alignItems: "center",

        boxShadow: "0 0 0 10px rgba(255, 255, 255, 0.1)",
      },

      profilePicutureImage:{
        borderRadius: 35,
        overflow: "hidden",
        height: "3rem", 
        width: "3rem", 
        justifyContent: "center", 
        alignItems: "center",

        boxShadow: "0 0 0 10px rgba(255, 255, 255, 0.1)",
      },

      pfpText:{
        fontWeight: "bold",
        fontSize: "1.15rem",
        userSelect: "none",
      },
});

export { TopBar };
