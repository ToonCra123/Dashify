import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


let MobileNavBar = (props) => {
    let pageHandler = (page) => {
        if (!props.pageHandler) return;
        props.pageHandler(page);
    }

    return (
        <View style={styles.mainContent}>
            <View style={styles.container}>
                <MobileNavBarButton 
                    pageHandler={() => pageHandler(0)}
                    imageSource={require("../../../images/png/home.png")}
                    text={"Home"}
                />
                <MobileNavBarButton 
                    pageHandler={() => pageHandler(1)}
                    imageSource={require("../../../images/png/search.png")}
                    text={"Search"}

                />
                <MobileNavBarButton 
                    pageHandler={() => pageHandler(2)}
                    imageSource={require("../../../images/png/library.png")}
                    text={"Library"}
                />
            </View>
            <View style={{height: 30, backgroundColor: '#0E0F10'}}></View>
        </View>
    );
};

let MobileNavBarButton = (props) => {
    return (
        <TouchableOpacity onPress={props.pageHandler}>
            <View style={styles.buttonContainer}>
                {props.imageSource ? (                
                    <Image 
                        style={styles.imageStyle}
                        source={props.imageSource}
                    />) : null
                }
                <Text style={{color: "white", fontWeight: 'bold'}}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#08090A',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: "100%",
        flexDirection: "column",
    },
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "black",
        width: "100%",
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 30,
        height: 30,
    }
});

export { MobileNavBar };