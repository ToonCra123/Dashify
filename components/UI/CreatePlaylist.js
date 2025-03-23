import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Image, StyleSheet, Platform } from 'react-native';
import { addPlaylistToUser, createPlaylist } from './WebRequests';

const PlaylistPopup = (props) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
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
        <View style={styles.modalOverlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>Playlist Details</Text>

            <TouchableOpacity style={styles.arrow} onPress={() => setIsVisible(false)}>
              <Image source={require('../../images/png/close.png')} style={styles.arrow}/>
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              value={playlistName}
              onChangeText={setPlaylistName}
            />
            
            <TextInput
              style={[styles.input2, styles.descriptionInput]}
              placeholder="Description"
              placeholderTextColor="#888"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />
            
            <TouchableOpacity style={styles.imageButton}>
              <Image source={require("../../images/png/test_album.png")} style={styles.imagePreview}
              ></Image>
            </TouchableOpacity>
            
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSubmit}
              >
                <Text styles={styles.actionButtonText}>Create</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};




const styles = StyleSheet.create({
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popup: {
    backgroundColor: '#272727',
    width: '40%',
    borderRadius: 12,
    padding: 20,
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
    width: "50%",
    color: "white"
  },
  input2: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 15,
    padding: 10,
    marginBottom: 15,
    width: "50%",
    color: "white"
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  imageButton: {
    position: "absolute",
    right: 60,
    bottom: 75,
    backgroundColor: '#282828'
  },
  imagePreview: {
    width: 205,
    height: 205,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    width: "30%",
    backgroundColor: 'white'
  },
  actionButtonText: {
    color: 'black',
    fontWeight: "bold",
  },
  arrow: {
    position: "absolute",
    right: 5,
    height: "3vh",
    width: "3vw",
  }
});

export default PlaylistPopup;