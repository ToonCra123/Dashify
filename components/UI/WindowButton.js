import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

//Image is only rendered if an image source is provided
let Window_Button = (props) => {
    return(
        <TouchableOpacity onPress={props.activation}>
            
            <View style={styles.window_button}>

                {props.imageSource ? (                
                    <Image 
                        style={styles.window_button}
                        source={props.imageSource}
                    />) : null}
                

                <Text style={styles.window_button_text}>{props.content}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    window_button_text:{
        color: "white",
        fontWeight: "bold",
    },

    window_button:{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export {Window_Button};