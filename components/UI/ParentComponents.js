import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LibraryRow } from '../CenterBar';
import PlaylistPopup from './CreatePlaylist';
import { useNavigation } from '@react-navigation/native';

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
      
      <PlaylistPopup onCreatePlaylist={handleAddPlaylist} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
});

export default ParentComponent;