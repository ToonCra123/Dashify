import React from "react";
import { View, Text, StyleSheet } from "react-native"; 
import { MobileNavBar } from "./components/MobileNavBar.js";

let MainMobile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <Text style={{color: "white"}}>Main Content</Text>
            </View>
            <View style={styles.bottomNavigation}>
                <MobileNavBar />
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