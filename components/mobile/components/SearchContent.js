import React, { useState, useEffect, use } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Keyboard } from "react-native";
import { searchSongByTitle } from "../../UI/WebRequests";

let makeHttps = (url) => {
    if (url.startsWith("http://")) {
        return "https://" + url.substring(7);
    } else if (url.startsWith("https://")) {
        return url;
    }
    return url;
}

let SearchContent = (props) => {
    let [searchTerm, setSearchTerm] = useState("");
    let [searchResults, setSearchResults] = useState([]);
    let [found, setFound] = useState(false);

    let searchHandler = (searchT) => {
        setSearchTerm(searchT);
    }

    let cancelButtonHandler = () => {
        // reset search term and make keyboard go down
        Keyboard.dismiss();
        setSearchTerm("");
    }

    useEffect(() => {
        let fetchResults = async () => {
            let results = await searchSongByTitle(searchTerm, 20);
            setSearchResults(results);
            setFound(true);
        }
        fetchResults();
    }, [searchTerm]);

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={searchHandler} />
                <TouchableOpacity onPress={cancelButtonHandler} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.resultContainer}>
                {found && searchResults.length > 0 ? 
                    <FlatList
                        data={searchResults}
                        renderItem={({item}) => (
                            <SearchSongResult song={item} />
                        )}
                        keyExtractor={(item) => item._id}
                    /> : null
                }
            </View>
        </View>
    );
}

let SearchSongResult = (props) => {
    return (
        <View style={styles.songCardContainer}>
            <Image source={{ uri: makeHttps(props.song.imagePath) }}
                style={{ width: 50, height: 50, paddingLeft: 10 }}
                resizeMode="stretch"
            />
            <Text style={styles.songCardText}>{props.song.title}</Text>
        </View>
    );
}

let SearchBar = (props) => {

    return (
        <View style={styles.searchBar}>
            <TouchableOpacity>
                <Image
                    source={require("../../../images/png/search.png")}
                    style={{ width: 20, height: 20 }}
                />
            </TouchableOpacity>
            <TextInput style={styles.searchBarInput}
                placeholder="Search"
                placeholderTextColor="#444444"
                value={props.searchTerm}
                onChangeText={props.setSearchTerm}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08090A',
        width: "100%",
    },
    searchBarContainer: {
        height: 105,
        backgroundColor: "#444444",
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        height: 30,
        width: 300,
        backgroundColor: "#666666",
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 15,
    },
    searchBarInput: {
        color: "white",
        width: 280,
        fontSize: 14,
        marginLeft: 10,
    },
    cancelButton: {
        alignContent: "center",
        justifyContent: "center",
        height: 45,
        width: 60,
        marginLeft: 25,

    }, 
    cancelButtonText: {
        color: "white",
        fontSize: 14,
    },
    resultContainer: {
        backgroundColor: "black",
        height: "100%",
        width: "100%",
    },
    songCardContainer: {
        width: "100%",
        flexDirection: "row",
        padding: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },
    songCardText: {
        paddingLeft: 10,
        color: 'white',
        fontSize: 14,
        flexShrink: 1,
        width: 250,
    },
    textStyle: {
        color: "white",
        fontSize: 20,
    }
});

export default SearchContent;