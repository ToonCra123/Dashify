import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { MobileNavBar } from "./components/MobileNavBar.js";
import HomeContent from "./components/HomeContent.js";
import SearchContent from "./components/SearchContent.js";

let MainMobile = () => {
    // Will implement later the queue functionality
    let [mainQueue, setMainQueue] = useState([]);
    let [pageSelection, setPageSelection] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                {pageSelection === 0 ? (<HomeContent />) : null}
                {pageSelection === 1 ? (<SearchContent />) : null}
            </View>
            <View style={styles.bottomNavigation}>
                <MobileNavBar pageHandler={setPageSelection} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08090A',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: "100%",
    },

    mainContent: {
        width: "100%",
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomNavigation: {
        width: "100%",
        height: 100,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default MainMobile;