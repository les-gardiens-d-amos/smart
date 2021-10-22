import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from "react-native";

import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import { API_URL } from "@env";

const LoginScreen = (props) => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [userIsRegister, setUserIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const switchLoginRegister = () => {
        setIsNewUser(!isNewUser);
    }

    const registerUser = () => {
        var data = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        });

        var config = {
            method: 'post',
            url: API_URL + 'users?controller=users&action=create',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config).then(response => {
            if (response.status === 201) {
                setUserIsRegister(true);
                login();
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const loginUser = () => {
        let userInfo = JSON.stringify({"email": email, "password": password});

        var config = {
            method: 'post',
            url: API_URL + "login",
            headers: { 
                'Content-Type': 'application/json'
            },
            data : userInfo
        };

        axios(config).then(response => {
            manageLoginResponse(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const manageLoginResponse = (data) => {
        SecureStore.setItemAsync("jwt", data.token);
        login();
    }

    const login = () => {
        props.onLogin();
    }

    if (!isNewUser) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Login :)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email..."
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password..."
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
                    onPress={loginUser}
                />
                <Button 
                    title="New user ? can you create an account"
                    onPress={switchLoginRegister}
                />
            </SafeAreaView>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Register :)</Text>
                { userIsRegister ?
                    <View style={styles.flashMessage}>
                        <Text style={{color:'white'}}>Welcome to the adventure</Text>
                    </View>
                    : null
                }
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email..."
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name..."
                    onChangeText={setName}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password..."
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                <Button
                    title="Register"
                    onPress={registerUser}
                />
                <Button 
                    title="You have an account ? can you login to your account"
                    onPress={switchLoginRegister}
                />
            </View>
        );
    }
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
        marginTop: 25
	},
    title: {
        fontSize: 35
    },
    input: {
        width: "70%",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        fontSize: 25,
        margin: 15
    },
    flashMessage:{
        backgroundColor:'green', 
        width:'70%', 
        justifyContent:'center', 
        alignItems:'center',           
        height:40,
        margin: 15
    }
});
