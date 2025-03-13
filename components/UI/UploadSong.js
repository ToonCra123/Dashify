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
                <Image style={styles.uploadImg} source={require('../../images/png/close.png')}/>
              </TouchableOpacity>
              <Text style={styles.text}>Upload a Song</Text>
              <Text style={styles.text}>MP3 or WAV file format</Text>

              <Text style={styles.errorText}>{errorMsg}</Text>


              <View style={styles.uploadBar}>
                <Text>Upload Image</Text>
                {selectedFile && (
                  <Text>
                    Selected: {selectedFile.name} (Size: {(selectedFile.size / 1024).toFixed(2)} kbs)
                  </Text>
                )}
                <TouchableOpacity onPress={handlePress}>
                  <Image style={styles.uploadImg} source={require('../../images/png/upload_icon.jpg')}/>
                </TouchableOpacity>
              </View>


              <View style={styles.uploadBar}>
                <Text>Upload Song</Text>
                {selectedSong && (
                  <Text>
                    Selected: {selectedSong.name} (Size: {(selectedSong.size / 1024).toFixed(2)} kbs)
                  </Text>
                )}
                <TouchableOpacity onPress={handleSongPress}>
                  <Image style={styles.uploadImg} source={require('../../images/png/upload_icon.jpg')}/>
                </TouchableOpacity>
              </View>


              <View style={styles.uploadBar}>
                <Text>Title</Text>
                <TextInput
                  style={{ height: 45, width: 300, borderWidth: 2, borderRadius: 10, padding: 10}}
                  onChangeText={text => setTitle(text)}
                  value={title} />
              </View>


              <View style={styles.uploadBar}>
                <Text>Artist</Text>
                <TextInput
                  style={{ height: 45, width: 300, borderWidth: 2, borderRadius: 10, padding: 10}}
                  onChangeText={text => setArtist(text)}
                  value={artist} />
              </View>

              
              <View style={styles.uploadBar}>
                <Text>Year</Text>
                <TextInput
                  style={{ height: 45, width: 300, borderWidth: 2, borderRadius: 10, padding: 10}}
                  onChangeText={text => setYear(text)}
                  value={year} />
              </View>

              <Button title="Upload" onPress={handleUpload} />


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
      flexDirection: "row",
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
    padding: 20,
    borderRadius: 50,
    height: '70%',
    width: '50%',
    alignItems: "center"
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15
  },
  arrow: {
    position: "absolute",
    left: 20
  },
  text2: {
    color: "white",
    fontWeight: "bold"
  },
  uploadImg: {
    width: 50,
    height: 50
  },
  uploadBar: {
    color: "black",
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10
  }
});