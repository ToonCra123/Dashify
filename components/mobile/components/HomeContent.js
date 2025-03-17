import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { getTrending } from "../../UI/WebRequests";

let HomeContent = () => {
    return (
        <View style={styles.container}>
            <Trending />
        </View>
    );
}

// Make a function that makes http:// at the beginning of string to
// https:// and return the string
let makeHttps = (url) => {
    if (url.startsWith("http://")) {
        return "https://" + url.substring(7);
    } else if (url.startsWith("https://")) {
        return url;
    }
    return url;
}

let SongCard = ({ song }) => {
    return (
        <View style={styles.songCardContainer}>
            <Image source={{ uri: makeHttps(song.imagePath) }}
                   style={styles.songCardImage} 
                   resizeMode="stretch" 
            />
            <Text style={styles.songCardText}>{song.title}</Text>
        </View>
    );
}

let Trending = () => {
    let [trending, setTrending] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTrending(10).then((data) => {
            setTrending(data);
            setIsLoading(false);
        }
        ).catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    }, []);

    return (
        <View>
            <Text style={styles.textStyle}>Trending</Text>
            { isLoading ? (<Text style={styles.textStyle}>Loading...</Text>) : (
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={trending}
                    renderItem={({ item }) => <SongCard song={item} />}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
}

// CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08090A',
        paddingTop: 80,
        height: "100%",
        width: "100%",
    },
    scrollLeft: {
        flexDirection: 'row',
    },
    songCardContainer: {
        width: 170,
        padding: 20,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    songCardText: {
        color: 'grey',
        fontSize: 14,
    },
    songCardImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    textStyle: {
        paddingLeft: 20,
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    }
});

export default HomeContent;