import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarButton } from './UI/BarButton';

let TopBar = () => {
    return (
        <View style={styles.topBar}>
            <BarButton imageSource={require('../images/png/more.png')} activation={buttonTest2} />
            <BarButton imageSource={require('../images/png/arrow_back.png')} activation={buttonTest} />
            <BarButton imageSource={require('../images/png/arrow_forward.png')} activation={buttonTest} />
        </View>
    );
};

// Button Functions
let buttonTest = () => {
    console.log("test worked");
};

let buttonTest2 = () => {
    console.log("test 2 worked");
};

const styles = StyleSheet.create({
    topBar:{
        flex:0.05,
        flexDirection:"row",
        backgroundColor: "#08090A",
        alignItems: "center"
        
      },
});

export { TopBar };
