import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


let MobileNavBar = () => {
    return (
        <View style={styles.mainContent}>
            <View style={styles.container}>
                <MobileNavBarButton 
                    imageSource={require("../../../images/png/home.png")}
                    text={"Home"}
                />
                <MobileNavBarButton 
                    imageSource={require("../../../images/png/search.png")}
                    text={"Search"}
                />
                <MobileNavBarButton 
                    imageSource={require("../../../images/png/library.png")}
                    text={"Library"}
                />
            </View>
            <View style={{height: 30}}></View>
        </View>
    );
};

let MobileNavBarButton = (props) => {
    return (
        <TouchableOpacity>
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
        backgroundColor: "#0E0F10",
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