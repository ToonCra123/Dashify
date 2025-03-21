import React, { useState, useRef} from 'react';
import { View, Button, Modal, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';

const Popup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); 


  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const songInputRef = useRef(null);
  const [selectedSong, setSelectedSong] = React.useState(null);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const handleUpload = () => {
    if (!selectedFile) {
      setErrorMsg('Please select an image!');
      return;
    }
    if (!selectedSong) {
      setErrorMsg('Please select a song!');
      return;
    }
    if (title === '') {
      setErrorMsg('Please enter a title!');
      return;
    }
    if (artist === '') {
      setErrorMsg('Please enter an artist!');
      return;
    }
    if (year === '') {
      setErrorMsg('Please enter a year!');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('mp3', selectedSong);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('year', year);

    fetch('https://api.toonhosting.net/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        setIsPopupVisible(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePress = () => {
    fileInputRef.current.click();
  };

  const handleSongPress = () => {
    songInputRef.current.click();
  };

  const handleSongChange = (event) => {
    const song = event.target.files[0];

    if (!song.type.startsWith('audio/')) {
      setErrorMsg('File type not supported!');
      return;
    }
    
    setErrorMsg('');
    if (song) {
      setSelectedSong(song);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setErrorMsg('');
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('File type not supported!');
        return;
      }

      if (file.size > 1024 * 1024) {
        setErrorMsg('File size too large!');
        return;
      }

      setSelectedFile(file);
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
                <Image style={{height: 50, width: 50}} source={require('../../images/png/close.png')}/>
              </TouchableOpacity>
              <Text style={styles.text}>Upload a Song</Text>
              <Text style={styles.text}>MP3 or WAV file format</Text>
              <Text style={styles.errorText}>{errorMsg}</Text>

              <View style={styles.uploadContainer}>

              <View>
              <Text style={styles.label}>Song Title</Text>
              <TextInput
                  style={styles.TextInput}
                  onChangeText={text => setTitle(text)}
                  placeholder='Title'
                  value={title} />
                  </View>
                
                  <View>
                  <Text style={styles.label}>Song Artist</Text>
                <TextInput
                  style={styles.TextInput}
                  onChangeText={text => setArtist(text)}
                  placeholder='Artist'
                  value={artist} />
                  </View>
                
                  <View>
                  <Text style={styles.label}>Release Year</Text>
                <TextInput
                  style={styles.TextInput}
                  onChangeText={text => setYear(text)}
                  placeholder='Year'
                  value={year} />
                  </View>

              <View style={styles.uploadBar}>
                <Text style={styles.text2}>Upload Image</Text>
                {selectedFile && (
                  <Text style={styles.text2}>
                    Selected: {selectedFile.name} (Size: {(selectedFile.size / 1024).toFixed(2)} kbs)
                  </Text>
                )}
                <TouchableOpacity onPress={handlePress}>
                  <Image style={styles.uploadImg} source={require('../../images/png/Red-icon.png')}/>
                </TouchableOpacity>
                </View>

                <View style={styles.uploadBar}>
                <Text style={styles.text2}>Upload Audio</Text>
                {selectedSong && (
                  <Text style={styles.text2}>
                    Selected: {selectedSong.name} (Size: {(selectedSong.size / 1024).toFixed(2)} kbs)
                  </Text>
                )}
                <TouchableOpacity onPress={handleSongPress}>
                  <Image style={styles.uploadImg} source={require('../../images/png/Red-icon.png')}/>
                </TouchableOpacity>
                </View>

              </View>

                <TouchableOpacity style={styles.button} onPress={handleUpload}>
                  <Text style={styles.text2}>Upload</Text>
                </TouchableOpacity>


              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the input element
              />
              <input
                type="file"
                ref={songInputRef}
                onChange={handleSongChange}
                style={{ display: 'none' }} // Hide the input element
              />
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
      alignItems: "center",
      justifyContent: "center",
      gap: 2.5,
  },
  modalOverlay: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgb(32, 31, 31)',
    borderRadius: 20,
    padding: 15,
    color: "white",
    width: "50%",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25
  },
  errorText: {
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 15
  },
  arrow: {
    position: "absolute",
    left: 15
  },
  text2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  uploadImg: {
    width: 150,
    height: 150
  },
  uploadBar: {
    color: "white",
    backgroundColor: "#323232",
    borderRadius: 10,
    margin: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#E50000",
    width: "35%",
    paddingBottom: 0
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    padding: 10,
    gap: 20,
    marginTop: 5,
  },
  TextInput: {
    color: "white",
    padding: 10,
    backgroundColor: "#323232",
    outlineColor: "transparent",
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#E50000",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#E50000",
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: "50%",
    marginBottom: 5
},
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 5,
  },
});