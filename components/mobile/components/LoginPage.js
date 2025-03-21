import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { registerUser, loginUser } from "../../UI/WebRequests";


let LoginPage = (props) => {
    let [username, setUsername] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [error, setError] = React.useState("");

    let handleLogin = async () => {
        let response = await loginUser(username, password);
        if (response.status === 200) {
            //Redirect to main page
            if(props.setLoggedIn && props.setUser) {
                props.setUser(response);
                props.setLoggedIn(true);
            }
        } else {
            //Display error message
            setError("Invalid username or password");
        }
    }

    let handleRegister = async () => {
        let response = await registerUser(username, password);
        if (response.status === 201) {
            //Redirect to main page
            if(props.setLoggedIn && props.setUser) {
                props.setUser(response);
                props.setLoggedIn(true);
            }
        } else {
            //Display error message
            setError("Username already taken");
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.loginPageHeader}>Dashify</Text>
            <View style={styles.inputContainer}>
                <TextInput placeholderTextColor={'grey'} placeholder="Username"
                            value={username} onChangeText={setUsername} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput placeholderTextColor={'grey'} placeholder="Password" 
                            value={password} onChangeText={setPassword} secureTextEntry={true}/>
            </View>
            <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
                <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.LoginButton} onPress={handleRegister}>
                <Text style={styles.textStyle}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: "100%",
    },
    inputContainer: {
        width: "80%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        padding: 10,
    },
    LoginButton: {
        width: "70%",
        height: 50,
        backgroundColor: "blue",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    }, 
    loginPageHeader: {
        paddingBottom: 100,
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    errorText: {
        color: "red",
        fontSize: 20,
    },
    textStyle: {
        color: "white",
        fontSize: 20,
    }
});
export default LoginPage;