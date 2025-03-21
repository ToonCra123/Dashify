import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

let BarButtonUI = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    let toggle_hover = (v) => {

        setIsHovered(v);

    }

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
    const [isHovered, setIsHovered] = useState(false);

    let toggle_hover = (v) => {

        setIsHovered(v);

    }

    let button_icon = (data) => {

        if(data){
            return isHovered ? data.homeHovered : data.home;
        }
        else
        {
            return props.imageSource;
        }
    }
    

    

    return (
        <TouchableOpacity onPress={props.activation} onMouseEnter={() => toggle_hover(true)} onMouseLeave={() => toggle_hover(false)}>
            <View style={isHovered ? styles.icon_containerHovered : styles.icon_container}>
                <Image 
                    style={styles.icon}
                    source={isHovered ? props.imageSourceHovered : props.imageSource}
                />
            </View>
        </TouchableOpacity>
    );
}

let WindowBarButtonUI = (props) =>{
    const [isHovered, setIsHovered] = useState(false);

    let toggle_hover = (v) => {

        setIsHovered(v);
        console.log(isHovered, "after hovered state");
    }

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

    const [isHovered, setIsHovered] = useState(false);

    let toggle_hover = (v) => {

        setIsHovered(v);
        console.log(isHovered, "after hovered state");
    }

    return(
        <TouchableOpacity onPress={props.activation} onMouseEnter={() => toggle_hover(true)} onMouseLeave={() => toggle_hover(false)}>
            <View style={isHovered ? styles.button_hovered : styles.button_idle}>
                <Image 
                    style={styles.window_icon2}
                    source={props.imageSource}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button_hovered: {
        opacity: 1,
        transform: [{scale: 1.1}]
    },
    button_idle: {
        opacity: 0.7,
    },
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
        opacity: 0.6,
    },

    icon_containerHovered:{
        padding: 10,
        opacity: 1,
        transform: [{scale: 1.2}]
    },
});


export { BarButton, BarButtonUI, WindowBarButtonUI, WindowBarButton2UI };