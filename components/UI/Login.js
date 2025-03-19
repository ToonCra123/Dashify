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
        setIsLoading(true);
        setError("");
        try {
            // Simulate a login request
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Check if the username and password are correct (for demo purposes)
            if (username === "user" && password === "password") {
                setIsLoggedIn(true);
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
            
            console.log("User data to be sent to server:", userData);
            console.log("Response from server:", userData);
            
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

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.subtitle}>You are successfully logged in.</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                        setIsLoggedIn(false);
                        setUsername("");
                        setPassword("");
                    }}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.Image 
                source={require("../../images/png/Red8.png")} 
                style={{ 
                    width: 175, 
                    height: 175, 
                    alignSelf: 'center', 
                    position: 'absolute', 
                    top: 20,
                    transform: [{ rotate: spin }]
                }}
            />
            <Text style={styles.title}>{isSignup ? "Create Account" : "Dashify Login"}</Text>
            <View style={styles.subtitle}>
            
            {successMessage ? (
                <Text style={styles.successText}>{successMessage}</Text>
            ) : null}
            
            <View style={styles.formGroup}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
            </View>
            
            <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    editable={!isLoading}
                />
            </View>
            
            {isSignup && (
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm password"
                        secureTextEntry
                        editable={!isLoading}
                    />
                </View>
            )}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={isSignup ? handleSignup : handleLogin}
                disabled={isLoading || !username || !password || (isSignup && (!confirmPassword))}
            >
                {isLoading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>{isSignup ? "Sign Up" : "Login"}</Text>
                )}
            </TouchableOpacity>
            
            
            <TouchableOpacity 
                style={styles.toggleMode} 
                onPress={() => setIsSignup(!isSignup)}
            >
                <Text style={styles.toggleModeText}>
                    {isSignup 
                        ? "Already have an account? Login" 
                        : "Don't have an account? Sign up"}
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "black",
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
        fontSize: 20,
        fontWeight: "500",
        color: "white",
        marginBottom: 10,
        marginLeft: 5,
        textShadow: " -1px 1px 0 black" // corrected property name
    },
    input: {
        height: 50,
        borderWidth: 5,
        borderColor: "#E50000",
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        backgroundColor: "transparent",
        color: "white",
        placeholderTextColor: "white",
        boxShadow: "1px 1px 1px 1px black",
        backgroundColor: "#5E5E5E"
    },
    
    button: {
        backgroundColor: "#E50000",
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        boxShadow: "1px 1px 1px 1px black",
    },
    buttonDisabled: {
        backgroundColor: "#97c3f7",
        opacity: 0.5,
    },
    buttonText: {
        color: "#fff",
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
        color: "#E50000",
        fontSize: 14,
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
});
