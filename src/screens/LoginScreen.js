import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "@react-native-material/core";
import { Header } from "react-native-elements";

import { API } from "../store/axios";
import * as SecureStore from "expo-secure-store";

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

    API.post("users?controller=users&action=create", userInfo)
      .then(response => {
        setUserIsRegister(true);
        login();
      })
      .catch(error => { console.log("Register post error", error); })
  };

  const loginUser = () => {
    let userInfo = JSON.stringify({ email: email, password: password });

    API.post("login", userInfo)
      .then(response => {
        manageLoginResponse(response.data);
      })
      .catch(error => { console.log("login post error", error); })
  };

  const manageLoginResponse = (data) => {
    console.log(data);
    SecureStore.setItemAsync("jwt", data.token);
    SecureStore.setItemAsync("user_id", data.user_info.id);
    login();
  };

  const login = () => {
    props.onLogin();
  };

  if (!isNewUser) {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={primary_c}
          placement="center"
          centerComponent={{
            text: "Connexion",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="e-mail"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <Button
          color={primary_c}
          style={styles.btn}
          title="Se connecter"
          onPress={loginUser}
        />
        <Button
          color={primary_c}
          style={styles.btn}
          title="Nouveau par ici ? créez cotre compte"
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
            text: "Inscription",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
        {userIsRegister ? (
          <View style={styles.flashMessage}>
            <Text style={{ color: "white" }}>Bienvenue dans l'aventure</Text>
          </View>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="e-mail"
          onChangeText={setEmail}
          value={email}
          secureTextEntry={false}
        />
        <TextInput
          style={styles.input}
          placeholder="nom ou pseudo"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <Button
          color={primary_c}
          style={styles.btn}
          title="S'inscrire"
          onPress={registerUser}
        />
        <Button
          color={primary_c}
          style={styles.btn}
          title="Vous avez déjà un compte ? connectez vous"
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
