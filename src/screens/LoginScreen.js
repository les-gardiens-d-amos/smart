import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from "react-native";

import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import { API_URL } from "@env";

const LoginScreen = (props) => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const switchLoginRegister = () => {
        setIsNewUser(!isNewUser);
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
                    onPress={login}
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
    }
});
