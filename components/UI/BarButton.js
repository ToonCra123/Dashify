import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

let BarButtonUI = (props) => {
    return (
        <TouchableOpacity onPress={props.activation}>
            <View>
                <Image 
                    style={styles.icon2}
                    source={props.imageSource}
                />
            </View>
        </TouchableOpacity>
    );
}

let BarButton = (props) => {
    return (
        <TouchableOpacity onPress={props.activation}>
            <View style={styles.icon_container}>
                <Image 
                    style={styles.icon}
                    source={props.imageSource}
                />
            </View>
        </TouchableOpacity>
    );
}

let WindowBarButtonUI = (props) =>{
    return(
        <TouchableOpacity onPress={props.activation}>
            <View>
                <Image 
                    style={styles.window_icon}
                    source={props.imageSource}
                />
            </View>
        </TouchableOpacity>
    );
}

let WindowBarButton2UI = (props) =>{
    return(
        <TouchableOpacity onPress={props.activation}>
            <View>
                <Image 
                    style={styles.window_icon2}
                    source={props.imageSource}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        height: "1.5rem",
        width: "1.5rem",
        resizeMode: "contain",
    },
    icon2: {
        height: "1.5rem",
        width: "1.5rem",
        resizeMode: "contain",
    },

    window_icon:{
        height: "3rem",
        width: "3rem",
        resizeMode: "contain",
    },

    window_icon2:{
        height: 35,
        width: 35,
        resizeMode: "contain",
    },
    
    icon_container:{
        padding: 10,
    },
});


export { BarButton, BarButtonUI, WindowBarButtonUI, WindowBarButton2UI };