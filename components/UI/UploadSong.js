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

  const [isUploadBarHovered, setIsUploadBarHovered] = useState(false);
  const [isUploadBarHovered2, setIsUploadBarHovered2] = useState(false);

  const [isTextInputHovered, setIsTextInputHovered] = useState(false);
  const [isTextInputHovered2, setIsTextInputHovered2] = useState(false);
  const [isTextInputHovered3, setIsTextInputHovered3] = useState(false);

  const [isButtonHovered, setIsButtonHovered] = useState(false);

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
                  style={isTextInputHovered ? styles.TextInputHovered : styles.TextInput}
                  onChangeText={text => setTitle(text)}
                  placeholder='Title'
                  onMouseEnter={() => setIsTextInputHovered(true)}
                  onMouseLeave={() => setIsTextInputHovered(false)}
                  value={title} />
                  </View>
                
                  <View>
                  <Text style={styles.label}>Song Artist</Text>
                <TextInput
                  style={isTextInputHovered2 ? styles.TextInputHovered : styles.TextInput}
                  onChangeText={text => setArtist(text)}
                  placeholder='Artist'
                  onMouseEnter={() => setIsTextInputHovered2(true)}
                  onMouseLeave={() => setIsTextInputHovered2(false)}
                  value={artist} />
                  </View>
                
                  <View>
                  <Text style={styles.label}>Release Year</Text>
                <TextInput
                  style={isTextInputHovered3 ? styles.TextInputHovered : styles.TextInput}
                  onChangeText={text => setYear(text)}
                  placeholder='Year'
                  onMouseEnter={() => setIsTextInputHovered3(true)}
                  onMouseLeave={() => setIsTextInputHovered3(false)}
                  value={year} />
                  </View>

              <View style={isUploadBarHovered ? styles.uploadBarHovered : styles.uploadBar}>
                <Text style={styles.text2}>Upload Image</Text>
                {selectedFile && (
                  <Text style={styles.text2}>
                    Selected: {selectedFile.name} (Size: {(selectedFile.size / 1024).toFixed(2)} kbs)
                  </Text>
                )}
                <TouchableOpacity onPress={handlePress}
                onMouseEnter={() => setIsUploadBarHovered(true)}
                onMouseLeave={() => setIsUploadBarHovered(false)}
                >
                  <Image style={styles.uploadImg} source={require('../../images/png/Red-icon.png')}/>
                </TouchableOpacity>
                </View>

                <View style={isUploadBarHovered2 ? styles.uploadBarHovered : styles.uploadBar}>
                <Text style={styles.text2}>Upload Audio</Text>
                {selectedSong && (
                  <Text style={styles.text2}>
                    Selected: {selectedSong.name} (Size: {(selectedSong.size / 1024).toFixed(2)} kbs)
                  </Text>
                )}
                <TouchableOpacity onPress={handleSongPress}
                onMouseEnter={() => setIsUploadBarHovered2(true)}
                onMouseLeave={() => setIsUploadBarHovered2(false)}
                >
                  <Image style={styles.uploadImg} source={require('../../images/png/Red-icon.png')}/>
                </TouchableOpacity>
                </View>

              </View>

                <TouchableOpacity 
                style={isButtonHovered ? styles.buttonHovered : styles.button} 
                onPress={handleUpload}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                >
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
    borderRadius: 10,
    margin: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "35%",
    boxShadow: "1px 1px 1px 1px black",
  },

  uploadBarHovered: {
    boxShadow: "0 0 0 1.5px white", /* Acts like a border but doesn’t change size */
    borderRadius: 10,
    paddingHorizontal: 10,
    outlineColor: "transparent",
    color: "white",
    placeholderTextColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    margin: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
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
    height: 50,
    color: "white",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    boxShadow: "1px 1px 1px 1px black",
    outlineColor: "transparent",
    borderRadius: 5,
    fontSize: 15,
  },

  TextInputHovered: {
    height: 50,
    boxShadow: "0 0 0 1.5px white", /* Acts like a border but doesn’t change size */
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    outlineColor: "transparent",
    color: "white",
    placeholderTextColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    outlineStyle: "none",
},

  button: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: "50%",
    marginBottom: 5,
    boxShadow: "1px 1px 1px 1px black",
},

buttonHovered: {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  height: 50,
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 15,
  boxShadow: "1px 1px 1px 1px black",
  width: "50%",
  marginBottom: 5,
},

  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 5,
  },
});