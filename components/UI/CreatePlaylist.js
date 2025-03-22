import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Image, StyleSheet, Platform } from 'react-native';
import { addPlaylistToUser, createPlaylist } from './WebRequests';

const PlaylistPopup = (props) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleSubmit = async () => {

    let hasError = false;
    
    if (!playlistName.trim()) {
      setNameError(true);
      hasError = true;
    }
    if (!description.trim()) {
      setDescriptionError(true);
      hasError = true;
    }
    
    if (hasError) return;

    console.log(props.username, props.password);

    let playlist_id = "";

    await createPlaylist(playlistName, description).then(async (data)=>{
      console.log(data)

      if(data.status === 201)
        {
          playlist_id = data._id;

          console.log(props.username, props.password, playlist_id);

          //await addPlaylistToUser(props.username, props.password, playlist_id).then((r)=>{console.log(r, "this")});
        }
    });


    setIsVisible(false);
  };


  const [playlistButtonHovered, setPlaylistButtonHovered] = useState(false);

  let toggle_hovered_state = (v) => {
    v === undefined ? setPlaylistButtonHovered(!playlistButtonHovered) : setPlaylistButtonHovered(v);
  }


  return (
    <View>
      
      {props.windowMinimized ? (

        <TouchableOpacity onPress={() => setIsVisible(true)} onMouseEnter={() => toggle_hovered_state(true)} onMouseLeave={() => toggle_hovered_state(false)}>
          <View style={playlistButtonHovered ? styles.buttonWindowMinimizedHovered : styles.buttonWindowMinimized}>
            
            <Image source={require("../../images/png/add.png")} style={styles.button}></Image>
          </View>
        </TouchableOpacity>
        ) : (
          
          <TouchableOpacity onPress={() => setIsVisible(true)} onMouseEnter={() => toggle_hovered_state(true)} onMouseLeave={() => toggle_hovered_state(false)}>
            <View style={playlistButtonHovered ? styles.buttonWindowHovered : styles.buttonWindow}>
                
              <Image source={require("../../images/png/add.png")} style={styles.button}></Image>

              <View>
                <Text style={{color: "white", fontWeight: "bold"}}>Create</Text>
              </View>
            </View>
          </TouchableOpacity>
      )}

      <Modal visible={isVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Playlist Details</Text>

            

            <View style={styles.contentRow}>
              
            <TouchableOpacity style={styles.arrow} onPress={() => setIsVisible(false)}>
              <Image style={styles.arrow} source={require('../../images/png/close.png')}/>
            </TouchableOpacity>

              <Image source={require("../../images/png/test_album.png")} style={styles.image}
              />
          
            <View style={styles.formContainer}>

            <TextInput
              style={[styles.input, nameError && styles.errorInput]}
              placeholder="Name"
              placeholderTextColor="#888"
              value={playlistName}
              onChangeText={(text) => {
                setPlaylistName(text);
                setNameError(false);
              }}
            />
            {nameError && <Text style={styles.errorText}>Please enter a playlist name</Text>}
          
            
            <TextInput
              style={[styles.descriptionInput, , descriptionError && styles.errorInput]}
              placeholder="Description"
              placeholderTextColor="#888"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                setDescriptionError(false);
              }}
            />
            {descriptionError && <Text style={styles.errorText}>Please enter a description</Text>}
            
            
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSubmit}>
                <Text >Create</Text>
              </TouchableOpacity>
                </View>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};




const styles = StyleSheet.create({
    errorInput: {
      borderColor: 'red',
      borderWidth: 1,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
      marginLeft: 10,
    },
    buttonWindowMinimized: {
      backgroundColor: "rgba(255, 255, 255, 0.05)", 
      padding: 10,
      borderRadius: 35,
      opacity: 0.8,
    },
    buttonWindowMinimizedHovered: {
      backgroundColor: "rgba(255, 255, 255, 0.05)", 
      padding: 10,
      borderRadius: 35,
    },
    buttonWindow:{
      flexDirection: "row", 
      backgroundColor: "rgba(255, 255, 255, 0.05)", 
      justifyContent: "center", 
      alignItems:"center", 
      gap: 5, 
      padding: 5, 
      borderRadius: 35,
      paddingHorizontal: 10,
      paddingRight: 15,
      opacity: 0.8,
    },
    buttonWindowHovered:{
      flexDirection: "row", 
      backgroundColor: "rgba(255, 255, 255, 0.05)", 
      justifyContent: "center", 
      alignItems:"center", 
      gap: 5, 
      padding: 5, 
      borderRadius: 35,
      paddingHorizontal: 10,
      paddingRight: 15,
    },
    button: {
      height: 30,
      width: 30,
      resizeMode: "contain",
    },
    overlay: {
      flex: 1,  
      backgroundColor: 'rgba(0,0,0,0.5)', 
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContainer: {
      width: "50%",
      padding: 20,
      backgroundColor: '#171717',
      borderRadius: 10,
    },
    image: {
      width: "15vw",
      height: "24vh",
      marginRight: 30,
      marginLeft: 50
    },
    contentRow: {
      flexDirection: 'row-reverse',
      alignItems: 'center'
    },
    title: {
      position: "absolute",
      fontSize: 20,
      fontWeight: 'bold',
      left: 20,
      color: "white"
    },
    input: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      marginTop: 50,
      padding: 10,
      color: "white",
      outlineColor: "Transparent",
    },
    descriptionInput: {
      height: 150,
      textAlignVertical: 'top',
      outlineColor: "Transparent",
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      marginTop: 15,
      padding: 10,
      color: "white"
    },
    formContainer: {
      flex: 1
    },
    actionButton: {
      padding: 10,
      borderRadius: 100,
      alignItems: 'center',
      width: "30%",
      backgroundColor: 'white',
      marginTop: 15,
    },
    arrow: {
      position: "absolute",
      right: 5,
      height: "3vh",
      width: "3vw",
      top: 0,
      right: -5
    },
});

export default PlaylistPopup;