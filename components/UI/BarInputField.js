import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Pressable } from 'react-native';

let BarInput = (props) => {

    const [text, setText] = useState(props.initalValue);
    const [isToggled, setIsToggled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    const handlePress = () => {
        setIsToggled(!isToggled); // Toggle the state
    };

    const handleHover = (v) => {
        setIsHovered(v);
    }




    return(
        <View style={styles.fieldView}>


            <View 
            style={(isHovered || !isEmptyOrNull(text)) ? styles.searchBarHovered : styles.searchBar}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}>
            
                <Image
                source={require("./../../images/png/search.png")}
                style={{width: "1.5rem", height: "1.5rem"}}
                />

                <TextInput
                    placeholder={props.placeholder}
                    value={text}
                    onChangeText={setText}
                    style={styles.windowInput}
                />

                {isEmptyOrNull(text) ? null :  

                <TouchableOpacity onPress={() => setText('')} style={{paddingRight: 10, justifyContent: "center"}}>
                        <Image 
                            style={styles.inputImage} 
                            source={require("./../../images/png/close.png")}>
                        </Image>
                </TouchableOpacity>
                
                } 
            </View>  


            </View>
    );
}


function isEmptyOrNull(str) {
    return !str || str.trim() === "";
}


const styles = StyleSheet.create({
    windowInput:{
        height: 40,
        width: "24rem",
        paddingHorizontal: 10,
        color:"white",

        border: "0px solid black",

        outlineStyle: "none",
    },


    inputImage:{
        height: "1.5rem",
        width: "1.5rem",
        resizeMode: "contain",
    },

    fieldView:{
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 35,
        gap: 5,
    },

    fieldViewHidden:{
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },

    searchHoverEffect:{
        backgroundColor:"rgba(255, 255, 255, 0.1)", 
        height: 50 * 1.75 + "%", 
        width: 100 * 1.75 + "%", 
        justifyContent: "center", 
        alignItems:"center",
        borderRadius: 35,
    },


    searchEffect:{
        backgroundColor:"rgba(255, 255, 255, 0)", 
        height: 50 * 1.75 + "%", 
        width: 100 * 1.75 + "%", 
        justifyContent: "center", 
        alignItems:"center",
        borderRadius: 35,
    },

    searchBarHovered:{
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,

        boxShadow: "0 0 0 1.75px white", /* Acts like a border but doesn’t change size */
        borderRadius: 35,
        
    },

    searchBar:{
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        opacity: 0.8,
    }

    


    



    
});

export {BarInput};