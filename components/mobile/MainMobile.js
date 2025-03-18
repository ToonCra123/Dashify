import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { MobileNavBar } from "./components/MobileNavBar.js";
import HomeContent from "./components/HomeContent.js";
import SearchContent from "./components/SearchContent.js";
import LoginPage from "./components/LoginPage.js";
import LibraryContent from "./components/LibraryContent.js";

let MainMobile = () => {
    // Will implement later the queue functionality
    let [mainQueue, setMainQueue] = useState([]);
    let [pageSelection, setPageSelection] = useState(0);
    let [user, setUser] = useState({});
    let [loggedIn, setLoggedIn] = useState(false);


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
        </View> : <LoginPage setUser={setUser} setLoggedIn={setLoggedIn} />
        }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: "100%",
    },

    mainContent: {
        width: "100%",
        flex: 1,
        backgroundColor: '#0E0F10',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomNavigation: {
        width: "100%",
        height: 100,
        backgroundColor: '#0E0F10',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default MainMobile;