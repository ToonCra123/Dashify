import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

function Centerbar(props)
{
  return(
    <View style={styles.centerbar}>
      <CenterbarWindow></CenterbarWindow>
      <CenterbarWindow></CenterbarWindow>
      <CenterbarWindow></CenterbarWindow>
    </View>
  );
}

function CenterbarWindow(props){
    return(
      <View style={styles.centerbarWindow}>
        <Image 
                style={styles.barImage}
                source={require("../images/png/library.png")}/>
        <Text style={styles.libraryHeader}>Your Library</Text>
      </View>
    );
}


const styles = StyleSheet.create({
    libraryHeader:{
        fontWeight: "bold",
        color: "white",
      },
      barImage:{
        height: "2.25vw",
        width: "2.25vw",
        borderRadius: 6,
      },
    
      centerbar:{
        flex:1,
        flexDirection:"row",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10,
      },
    
      centerbarWindow:{
        flex:1,
        flexDirection:"row",
        alignItems: "center",
        backgroundColor: "#222823",
        height: "100%",
        borderRadius: 10,
      },
});

export { Centerbar };