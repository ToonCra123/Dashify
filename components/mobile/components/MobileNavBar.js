import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


let MobileNavBar = () => {
    return (
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
                <Text style={{color: "white"}}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#0E0F10",
        height: "100%",
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