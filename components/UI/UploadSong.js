import React, { useState, useRef} from 'react';
import { View, Button, Modal, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';



const Popup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handlePress = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file);
    }
  };

  return (
    <TouchableOpacity onPress={() => setIsPopupVisible(true)} >
    <View style={styles.container}>
    <Text style={styles.text2}>Upload Song</Text>
      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPopupVisible(false)} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <TouchableOpacity style={styles.arrow} onPress={() => setIsPopupVisible(false)}>
                <Image source={require('../../images/png/close.png')}/>
              </TouchableOpacity>
            <Text style={styles.text}>Upload a Song</Text>
            <Text style={styles.text}>MP3 or WAV file format</Text>
            <TouchableOpacity onPress={handlePress}>
            <Image source={require('../../images/png/upload_icon.jpg')}/>
            </TouchableOpacity>
            <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input
      />      {selectedFile && (
        <Text style={styles.text}>
          Selected: {selectedFile.name} (Size: {selectedFile.size} bytes)
        </Text>
      )}

          </View>
        </View>
      </Modal>
    </View>
    </TouchableOpacity>
  );
};

export default Popup; 

const styles = StyleSheet.create({
  container: {
    width: "auto",
      height: "auto",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: 20,
      padding: 10,
      alignItems: "center"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgb(32, 31, 31)',
    padding: 20,
    borderRadius: 50,
    width: '50%',
    alignItems: "center"
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25
  },
  arrow: {
    position: "absolute",
    left: 20
  },
  text2: {
    color: "white",
    fontWeight: "bold"
  }
});