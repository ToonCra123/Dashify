import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Touchable, StyleSheet } from "react-native"; 
import { MobileNavBar } from "./components/MobileNavBar.js";
import HomeContent from "./components/HomeContent.js";
import SearchContent from "./components/SearchContent.js";
import LoginPage from "./components/LoginPage.js";
import LibraryContent from "./components/LibraryContent.js";
import { Audio } from "expo-av";

// Make a function that makes http:// at the beginning of string to
// https:// and return the string
let makeHttps = (url) => {
    if (url.startsWith("http://")) {
        return "https://" + url.substring(7);
    } else if (url.startsWith("https://")) {
        return url;
    }
    return url;
}

let setAudioSettings = async () => {
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
    });
}

let MainMobile = () => {
    // Audio States
    let [mainQueue, setMainQueue] = useState([]);
    let [currSong, setCurrSong] = useState({});
    let [sound, setSound] = useState(null);
    let [isPlaying, setIsPlaying] = useState(false);
    let [position, setPosition] = useState(0); // Track current position (0 to 1)
    let [duration, setDuration] = useState(0);

    // Called when the mainQueue changes
    useEffect(() => {
        console.log(mainQueue)
        if (mainQueue.length === 0) {
            stopSound();
        } else if (mainQueue[0] !== currSong) {
            stopSound().then(() => {
                playSound();
            });
        }
    }, [mainQueue]);

    // Audio Functions
    let playSound = async () => {
        await setAudioSettings();
        console.log("Playing sound");

        setCurrSong(mainQueue[0]);
        const { sound } = await Audio.Sound.createAsync(
            { uri: makeHttps(mainQueue[0].mp3Path) },
            { shouldPlay: true }
        )

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                handlePlayNextSong();
                return;
            }
            setPosition(status.positionMillis / status.durationMillis);
            setDuration(status.durationMillis);
        });

        setSound(sound);
        setIsPlaying(true);
    };

    let pauseSound = async () => {
        if (!sound) return;
        await sound.pauseAsync();
        setIsPlaying(false);
    }

    let resumeSound = async () => {
        if (!sound) return;
        await sound.playAsync();
        setIsPlaying(true);
    }

    let handlePlayNextSong = async () => {
        if (mainQueue.length <= 1) {
            stopSound();
            return;
        }
        setMainQueue(mainQueue.slice(1));
    }

    let stopSound = async () => {
        if (!sound) return;
        await sound.stopAsync();
        setIsPlaying(false);
        setSound(null);
        setCurrSong({});
        setPosition(0);
        setDuration(0);
    }

    // position is a float from 0 to 1
    let seekSound = async (position) => {
        await sound.setPositionAsync(position * duration);
    }

    // Page States and User States
    let [pageSelection, setPageSelection] = useState(0);
    let [user, setUser] = useState({});
    let [loggedIn, setLoggedIn] = useState(false);


    return (  
        <View style={styles.container}>
        { loggedIn ?
        <View style={styles.container}>
            <View style={styles.mainContent}>
                {pageSelection === 0 ? (<HomeContent mainQueue={mainQueue} setMainQueue={setMainQueue} />) : null}
                {pageSelection === 1 ? (<SearchContent mainQueue={mainQueue} setMainQueue={setMainQueue} />) : null}
                {pageSelection === 2 ? (<LibraryContent libraryContent={user.playlists}/>) : null}
            </View>
            <View style={styles.bottomNavigation}>
                <MobileNavBar pageHandler={setPageSelection} />
            </View>
            {mainQueue.length > 0 ? <SongDetails song={mainQueue[0]} isPlaying={isPlaying} pauseSound={pauseSound} resumeSound={resumeSound} /> : null}
        </View> : <LoginPage setUser={setUser} setLoggedIn={setLoggedIn} />
        }
        </View>
    );
};

let SongDetails = (props) => {

    return (
        <TouchableOpacity style={styles.songDetails} activeOpacity={1}>
            <View style={styles.songCardContainer}>
                <Image source={{ uri: makeHttps(props.song.imagePath) }}
                       style={styles.songCardImage} 
                       resizeMode="stretch"
                />
                <View>
                    <Text style={styles.songCardText}>{props.song.title}</Text>
                    <Text style={styles.songCardText}>{props.song.artist}</Text>
                </View>            
            </View>
            <View>
                { !props.isPlaying ?
                <TouchableOpacity style={{paddingRight: 20}} onPress={props.resumeSound} >
                    <Image source={require("../../images/png/play_arrow.png")} style={{width: 30, height: 30}} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{paddingRight: 20}} onPress={props.pauseSound}>
                    <Image source={require("../../images/png/pause_arrow.png")} style={{width: 30, height: 30}} />
                </TouchableOpacity>
                }

            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({

    textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        bottom: 100,
        width: "98%",
        height: 70,
        borderRadius: 10,
        backgroundColor: '#7d6bdc',
    },
    songCardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    songCardImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    songCardText: {
        width: 150,
        paddingLeft: 5,
        color: '#bcb9f9',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default MainMobile;