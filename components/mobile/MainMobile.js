import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { MobileNavBar } from "./components/MobileNavBar.js";
import HomeContent from "./components/HomeContent.js";
import SearchContent from "./components/SearchContent.js";
import LoginPage from "./components/LoginPage.js";
import LibraryContent from "./components/LibraryContent.js";
import { Audio } from "expo-av";


let MainMobile = () => {
    // Audio States
    let [mainQueue, setMainQueue] = useState([]);
    let [sound, setSound] = useState(null);
    let [isPlaying, setIsPlaying] = useState(false);
    let [position, setPosition] = useState(0); // Track current position (0 to 1)
    let [duration, setDuration] = useState(0);

    // Called when the mainQueue changes
    useEffect(() => {

    }, [mainQueue]);

    // Audio Functions
    let playSound = async () => {
        const { sound } = await Audio.Sound.createAsync({
            uri: mainQueue[0].audioPath,
            shouldPlay: true,
        });

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                setMainQueue(mainQueue.slice(1));
            }
            setPosition(status.positionMillis / status.durationMillis);
            setDuration(status.durationMillis);
        });

        setSound(sound);
        setIsPlaying(true);
    };

    // Page States and User States
    let [pageSelection, setPageSelection] = useState(0);
    let [user, setUser] = useState({});
    let [loggedIn, setLoggedIn] = useState(true);


    return (  
        <View style={styles.container}>
        { loggedIn ?
        <View style={styles.container}>
            <View style={styles.mainContent}>
                {pageSelection === 0 ? (<HomeContent />) : null}
                {pageSelection === 1 ? (<SearchContent />) : null}
                {pageSelection === 2 ? (<LibraryContent libraryContent={user.playlists}/>) : null}
            </View>
            <View style={styles.bottomNavigation}>
                <MobileNavBar pageHandler={setPageSelection} />
            </View>
            <SongDetails />
        </View> : <LoginPage setUser={setUser} setLoggedIn={setLoggedIn} />
        }
        </View>
    );
};

let SongDetails = () => {
    return (
        <View style={styles.songDetails}></View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181522',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: "100%",
    },

    mainContent: {
        width: "100%",
        flex: 1,
        backgroundColor: '#2d2a37',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomNavigation: {
        width: "100%",
        height: 100,
        backgroundColor: '#2d2a37',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    songDetails: {
        position: "absolute",
        bottom: 100,
        width: "98%",
        height: 70,
        borderRadius: 10,
        backgroundColor: '#7d6bdc',
    }
});

export default MainMobile;