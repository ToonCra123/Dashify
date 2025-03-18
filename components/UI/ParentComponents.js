import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LibraryRow } from '../CenterBar';
import { useNavigation } from '@react-navigation/native';
import PlaylistPopup from './CreatePlaylist'; 

const ParentComponent = () => {
  const navigation = useNavigation();
  const [playlists, setPlaylists] = useState([]);

  const handleAddPlaylist = (newPlaylist) => {
    setPlaylists(prev => [...prev, {
      id: Date.now().toString(),
    name: newPlaylist.playlistName, // Must match Popup's property name
    description: newPlaylist.description
    }]);
  };

  return (
    <View style={styles.container}>
      <PlaylistPopup onCreatePlaylist={handleAddPlaylist} /> 
      {playlists.map(playlist => (
        <LibraryRow
          key={playlist.id}
          rowName={playlist.name}
          rowDesc={playlist.description}
          activation={() =>  navigation.navigate('AlbumView', { 
            playlist: playlist
          }
        )}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ParentComponent;