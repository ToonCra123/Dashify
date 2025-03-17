import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";

let SearchContent = (props) => {
    let [searchTerm, setSearchTerm] = useState("");
    let [searchResults, setSearchResults] = useState([]);

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <SearchBar />
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
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
            <TextInput style={styles.searchBarInput}/>
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
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        height: 30,
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 15,
    },
    searchBarInput: {
        width: 280,
        fontSize: 14,
        marginLeft: 10,
    },
    cancelButton: {
        alignContent: "center",
        justifyContent: "center",
        marginBottom: 15,
        marginLeft: 20,
    }, 
    cancelButtonText: {
        color: "white",
        fontSize: 16,
    },
    textStyle: {
        color: "white",
        fontSize: 20,
    }
});

export default SearchContent;