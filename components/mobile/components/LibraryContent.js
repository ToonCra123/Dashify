import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { getPlaylist, getSong } from "../../UI/WebRequests";

let makeHttps = (url) => {
    if (url.startsWith("http://")) {
        return "https://" + url.substring(7);
    } else if (url.startsWith("https://")) {
        return url;
    }
    return url;
}

let LibraryContent = (props) => {
    let [playlistList, setPlaylistList] = useState([]);
    let [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        if(props.libraryContent !== undefined) {
            props.libraryContent.forEach(async (item) => {
                let playlist = await getPlaylist(item);
                if (playlist.songs !== undefined) {
                    let imageUrl = "";
                    if (playlist.songs.length > 0) {
                        await getSong(playlist.songs[0]).then((song) => {
                            imageUrl = song.imagePath;
                        });
                    }
                    setPlaylistList([...playlistList, {
                        title: playlist.title, 
                        description: playlist.description, 
                        image: imageUrl
                    }]);
                    setIsLoaded(true);
                }
            });
        }
    }, []); 

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Library Content</Text>
            { isLoaded ?
                <FlatList 
                    data={playlistList}
                    renderItem={({item}) => (
                        <PlaylistCard playlist={item} />
                    )}
                    keyExtractor={(item) => item._id}
                /> : null
            }   
        </View>
    );
};

let PlaylistCard = (props) => {
    return (
        <View style={styles.playlistCardContainer}>
            <Image source={{ uri: makeHttps(props.playlist.image) }}
                style={{ width: 50, height: 50, paddingLeft: 10 }}
                resizeMode="stretch"
            />
            <Text style={styles.playlistCardText}>{props.playlist.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 80,
        height: "100%",
        width: "100%",
    },
    playlistCardContainer: {
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 10,
    },
    playlistCardText: {
        paddingLeft: 10,
        color: "white",
        fontSize: 20,
    },

    textStyle: {
        paddingLeft: 10,
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
    }
});

export default LibraryContent;