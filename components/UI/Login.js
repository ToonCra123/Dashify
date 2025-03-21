import React, { useState, useEffect, useRef } from "react";
import { Platform, StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Switch, Image, Animated, Easing } from "react-native";
import { loginUser } from './WebRequests';
import { registerUser } from './WebRequests';

export default function LoginWindow(props) {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    // Create a rotation animated value
    const spinValue = useRef(new Animated.Value(0)).current;
    
    // Set up the spinning animation when component mounts
    useEffect(() => {
        // Create a looping animation that spins the image 360 degrees over 5 seconds
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 5000, // 5 seconds per rotation
                easing: Easing.linear,
                useNativeDriver: true, // Better performance
            })
        ).start();
    }, []);
    
    // Map the spin value to a rotation interpolation
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    // Reset form fields when toggling between login and signup
    useEffect(() => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setSuccessMessage("");
    }, [isSignup]);


    const handleLogin = async () => {
        setError("");
        setIsLoading(true);
        await props.syncUserData(username, password).then((data)=>{
            //console.log(data);

            if(data.valid)
            {
                setIsLoggedIn(true);
                props.setIsLoggedIn(true);
            }
            else
            {
                setError("Username or Password does not exist. Please try again.");
            }

            setIsLoading(false);
        });
    };

    const handleSignup = async () => {
        // Validate input fields
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        
        setIsLoading(true);
        setError("");
        try {
            // Simulate a server request to create a new account;
            
            // Simulate sending data to server
            const userData = {
                username,
                password
            };

            let user = await loginUser(userData.username, userData.password);
            let response = await registerUser(userData.username, userData.password);
             // Call the function to send data to the server
            
            //console.log("User data to be sent to server:", userData);
            //console.log("Response from server:", userData);
            
            // Show success message
            setSuccessMessage("Account created successfully! You can now login.");
            
            // Switch to login mode after successful signup
            setTimeout(() => {
                setIsSignup(false);
                setSuccessMessage("");
                setPassword("");
            }, 2000);
            
        } catch (error) {
            setError("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    const [isUserInputHovered, setIsUserInputHovered] = useState(false);
    const [isPassInputHovered, setIsPassInputHovered] = useState(false);
    const [isConfirmPassInputHovered, setIsConfirmPassInputHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isToggleAccountButton, setIsToggleAccountButton] = useState(false);

    return ( 
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Text style={{color: "white", fontWeight: "bold", fontSize: "4rem"}}>Dashify</Text>
            </View>

            <View>
                <View>
                    <Text style={styles.title}>{isSignup ? "Create Account" : ""}</Text>
                </View>

                <View style={styles.subtitle}>
                
                    {successMessage ? (
                        <Text style={styles.successText}>{successMessage}</Text>
                    ) : null}

                    <View style={styles.container2}>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Username</Text>

                            <TextInput
                                style={isUserInputHovered ? styles.inputHovered : styles.input}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                editable={!isLoading}
                                onMouseEnter={() => setIsUserInputHovered(true)}
                                onMouseLeave={() => setIsUserInputHovered(false)}
                            />
                        </View>
                    
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={isPassInputHovered ? styles.inputHovered : styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!isLoading}

                                onMouseEnter={() => setIsPassInputHovered(true)}
                                onMouseLeave={() => setIsPassInputHovered(false)}
                            />
                        </View>
                        
                        {isSignup && (
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Confirm Password</Text>
                                <TextInput
                                    style={isConfirmPassInputHovered ? styles.inputHovered : styles.input}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    editable={!isLoading}

                                    onMouseEnter={() => setIsConfirmPassInputHovered(true)}
                                    onMouseLeave={() => setIsConfirmPassInputHovered(false)}
                                />
                            </View>
                        )}

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        
                        <View                 
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                        >
                            <TouchableOpacity 
                                style={isLoading ? styles.buttonDisabled : isButtonHovered ? styles.buttonHovered : styles.button} 
                                onPress={isSignup ? handleSignup : handleLogin}
                                disabled={isLoading || !username || !password || (isSignup && (!confirmPassword))}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#ffffff" /> //???????
                                ) : (
                                    <Text style={styles.buttonText}>{isSignup ? "Sign Up" : "Login"}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                
                    <TouchableOpacity 
                        style={styles.toggleMode} 
                        onPress={() => setIsSignup(!isSignup)}
                        onMouseEnter={() => setIsToggleAccountButton(true)}
                        onMouseLeave={() => setIsToggleAccountButton(false)}
                    >
                        <Text style={isToggleAccountButton ? styles.toggleModeTextHovered : styles.toggleModeText}>
                            {isSignup 
                                ? "Already have an account? Login" 
                                : "Don't have an account? Sign up"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

let WelcomeLoginPage = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>You are successfully logged in.</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {

                }}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        gap: 100,
        justifyContent: "center",
        backgroundColor: "#121212",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: "1rem",
        fontWeight: "500",
        color: "white",
        marginBottom: 10,
        marginLeft: 5,
        textShadow: " -1px 1px 0 black" // corrected property name
    },
    input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 15,
        outlineColor: "transparent",
        color: "white",
        placeholderTextColor: "white",
        boxShadow: "1px 1px 1px 1px black",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        outlineStyle: "none",
    },

    inputHovered: {
        height: 50,
        boxShadow: "0 0 0 1.5px white", /* Acts like a border but doesn’t change size */
        borderRadius: 10,
        paddingHorizontal: 10,
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
    },

    buttonDisabled: {
        backgroundColor: "rgba(255, 255, 255, 0.025)",
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        boxShadow: "1px 1px 1px 1px black",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
    modeToggle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    modeText: {
        marginHorizontal: 10,
        fontSize: 14,
    },
    toggleMode: {
        marginTop: 20,
        alignItems: "center",
    },
    toggleModeText: {
        color: "white",
        fontSize: "1rem",
    },
    toggleModeTextHovered: {
        color: "white",
        fontSize: "1rem",
        textDecorationLine: "underline",
    },
    successText: {
        color: "green",
        padding: 10,
        marginBottom: 10,
        textAlign: "center",
        backgroundColor: "#e8f5e9",
        borderRadius: 5,
    },
    subtitle: {
        borderRadius: 5,
        padding: 10,
    },
    container2: {
        width: "50%",
        alignSelf: "center",
    }
});
