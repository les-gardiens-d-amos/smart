import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "@react-native-material/core";
import { Header } from "react-native-elements";

import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { API_URL } from "@env";

import { colors } from "../style/theme";
const { success_c, primary_c, tertiary_c } = colors;

const LoginScreen = (props) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [userIsRegister, setUserIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const switchLoginRegister = () => {
    setIsNewUser(!isNewUser);
  };

  const registerUser = () => {
    let userInfo = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      url: API_URL + "users?controller=users&action=create",
      headers: {
        "Content-Type": "application/json",
      },
      data: userInfo,
    };

    axios(config)
      .then((response) => {
        if (response.status === 201) {
          setUserIsRegister(true);
          login();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = () => {
    let userInfo = JSON.stringify({ email: email, password: password });

    let config = {
      method: "post",
      url: API_URL + "login",
      headers: {
        "Content-Type": "application/json",
      },
      data: userInfo,
    };

    axios(config)
      .then((response) => {
        manageLoginResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const manageLoginResponse = (data) => {
    SecureStore.setItemAsync("jwt", data.token);
    login();
  };

  const login = () => {
    props.onLogin();
  };

  if (!isNewUser) {
    return (
      <View style={styles.container}>
        {/* <Header
          backgroundColor={primary_c}
          placement="center"
          centerComponent={{
            text: "Login",
            style: { color: "#fff", fontSize: 20 },
          }}
        /> */}
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
        <Button style={styles.btn} title="Login" onPress={loginUser} />
        <Button
          style={styles.btn}
          title="New user ? can you create an account"
          onPress={switchLoginRegister}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={primary_c}
          placement="center"
          centerComponent={{
            text: "Register",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
        {userIsRegister ? (
          <View style={styles.flashMessage}>
            <Text style={{ color: "white" }}>Welcome to the adventure</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter your email..."
          onChangeText={setEmail}
          value={email}
          secureTextEntry={false}
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
        <Button style={styles.btn} title="Register" onPress={registerUser} />
        <Button
          style={styles.btn}
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
    alignItems: "center",
  },
  title: {
    fontSize: 35,
  },
  input: {
    width: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 25,
    margin: 15,
  },
  btn: {
    backgroundColor: primary_c,
    color: tertiary_c,
    margin: 15,
    textAlign: "center",
  },
  flashMessage: {
    backgroundColor: success_c,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 15,
  },
});
