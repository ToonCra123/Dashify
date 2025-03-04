import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';


let WindowInput = (props) => {

    const [text, setText] = useState(props.initalValue);
    const [isToggled, setIsToggled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    const handlePress = () => {
        setIsToggled(!isToggled); // Toggle the state
    };

    const handleHover = () => {
        setIsHovered(!isHovered);
    }





    return(
        <View style={!isToggled ? styles.fieldViewHidden : styles.fieldView}>
            
            <TouchableOpacity 
                onPress={handlePress} 
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                style={{height:"2.5rem", justifyContent: "center"}}

                >

                <View style={isHovered && !isToggled ? styles.searchHoverEffect : styles.searchEffect}>
                    <Image 
                        style={styles.inputImage} 
                        source={require("./../../images/png/search.png")}
                    />
                </View>
                
            </TouchableOpacity>

            {!isToggled ? null :  

            <View>
                <TextInput
                    placeholder={props.placeholder}
                    value={text}
                    onChangeText={setText}
                    style={styles.windowInput}
                />
            </View>  

            }

            {isEmptyOrNull(text) || !isToggled ? null :  

            <TouchableOpacity onPress={() => setText('')}>
                    <Image 
                        style={styles.inputImage} 
                        source={require("./../../images/png/close.png")}>
                    </Image>
            </TouchableOpacity>
            
            } 


            </View>
    );
}


function isEmptyOrNull(str) {
    return !str || str.trim() === "";
}


const styles = StyleSheet.create({
    windowInput:{
        height: 40,
        width: 400,
        paddingHorizontal: 10,
        color:"white",

        border: "0px solid black",

        outlineStyle: "none",
    },


    inputImage:{
        height: "100%",
        width: "1.25rem",
        resizeMode: "contain",
    },

    fieldView:{
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
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

    


    



    
});

export {WindowInput};