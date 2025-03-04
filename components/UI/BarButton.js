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

const styles = StyleSheet.create({
    icon: {
        height: "2vh",
        width: "1vw",
        resizeMode: "contain",
    },
    icon2: {
        height: "2vh",
        width: "1vw",
        resizeMode: "contain",
    },
    
    icon_container:{
        padding: 10,
    },
});


export { BarButton, BarButtonUI };