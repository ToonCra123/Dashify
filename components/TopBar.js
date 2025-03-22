import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { BarButton } from './UI/BarButton';
import { BarInput } from './UI/BarInputField';
import { ImageBackground } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { searchSongByArtist, searchSongByTitle } from './UI/WebRequests';
import { navigationRef } from '../App.js'; 


let TopBar = (props) => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isProfileHovered, setProfileHovered] = useState(false);
    const [isSettingsHovered, setSettingsHovered] = useState(false);
    const [isLogoutHovered, setLogoutHovered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleProfilePress = () => {
        console.log("Profile pressed");
        setDropdownVisible(false);
        // Navigate to profile page
    };

    const handleSettingsPress = () => {
        console.log("Settings pressed");
        setDropdownVisible(false);
        // Navigate to settings page
    };

    const handleLogout = async () => {
            setIsLoggedIn(true);
            props.setIsLoggedIn(true);
            window.location.reload();
            window.localStorage.removeItem('user');
    };



    const handleHomePress = () => {
        if (navigationRef.current) {
            navigationRef.current.navigate('Home');
        }

        props.setQuery("");
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
                <TouchableOpacity 
                    style={styles.topBarGroupRight}
                    onPress={toggleDropdown}
                >
                    <ImageBackground 
                    style={styles.profilePictureImage}
                    source={require("./../images/png/test_album.png")}>
                    </ImageBackground>
                    
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={dropdownVisible}
                        onRequestClose={() => {
                            setDropdownVisible(false);
                        }}
                    >
                        <TouchableOpacity 
                            style={styles.modalOverlay}
                            activeOpacity={1}
                            onPress={() => setDropdownVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.dropdown}>
                                    <TouchableOpacity 
                                        style={isProfileHovered ? styles.dropdownItemHovered : styles.dropdownItem} 
                                        onPress={handleProfilePress}
                                        onMouseEnter={() => setProfileHovered(true)}
                                        onMouseLeave={() => setProfileHovered(false)}
                                    >
                                        <Text style={styles.dropdownText}>Profile</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style={isSettingsHovered ? styles.dropdownItemHovered : styles.dropdownItem} 
                                        onPress={handleSettingsPress}
                                        onMouseEnter={() => setSettingsHovered(true)}
                                        onMouseLeave={() => setSettingsHovered(false)}
                                    >
                                        <Text style={styles.dropdownText}>Settings</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style={isLogoutHovered ? styles.dropdownItemHovered : styles.dropdownItem} 
                                        onPress={handleLogout}
                                        onMouseEnter={() => setLogoutHovered(true)}
                                        onMouseLeave={() => setLogoutHovered(false)}
                                    >
                                        <Text style={styles.dropdownText}>Logout</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </TouchableOpacity>
            ) : (
                <View style={styles.topBarGroupRight}>
                    <View style={styles.profilePictureDefault}>
                        <Text style={styles.pfpText}>D</Text>
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
        alignItems: "center",
      },
    
      topBarGroupRight:{
        flex: 0.1,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 15,
        paddingRight: 20,
      },

      profilePictureDefault:{
        backgroundColor: "rgb(0, 183, 255)", 
        borderRadius: 35, 
        height: "3rem", 
        width: "3rem", 
        justifyContent: "center", 
        alignItems: "center",

        boxShadow: "0 0 0 10px rgba(255, 255, 255, 0.1)",
      },

      profilePictureImage:{
        borderRadius: 35,
        overflow: "hidden",
        height: "3rem", 
        width: "3rem", 
        justifyContent: "center", 
        alignItems: "center",
        boxShadow: "0 0 0 5px rgba(255, 255, 255, 0.1)",
      },

      pfpText:{
        fontWeight: "bold",
        fontSize: "1.15rem",
        userSelect: "none",
      },

      dropdown: {
        backgroundColor: '#2E2E2E',
        borderRadius: 5,
        padding: 5,
        width: 150,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
      
    dropdownItem: {
        padding: 10,
        borderRadius: 5,
    },
    dropdownItemHovered: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    dropdownText: {
        color: 'white',
        fontSize: '0.9rem',
    },

    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },

    modalContainer: {
        position: 'absolute',
        top: 60, // Position below the top bar
        right: 50,
        zIndex: 1000,
    },
});

export { TopBar };
