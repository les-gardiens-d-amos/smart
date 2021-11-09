import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button } from "@react-native-material/core";

import { colors } from "../style/theme";
const { success_c, primary_c, tertiary_c } = colors;

import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/userSlice";
import { serviceLoginUser, serviceRegisterUser } from "../services/user";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [registerPage, setRegisterPage] = useState(false);
  const [userIsRegister, setUserIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    let userInfo = JSON.stringify({
      email: email,
      password: password,
    });
    serviceLoginUser(dispatch, userInfo);
  };

  const registerUser = () => {
    let userInfo = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    serviceRegisterUser(dispatch, userInfo);
  };

  if (!registerPage) {
    // Displays login page
    return (
      <View style={styles.container}>
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
          title="Nouveau par ici ? créez votre compte"
          onPress={() => setRegisterPage(!setRegisterPage)}
        />
      </View>
    );
  }

  return (
    // Displays register page
    <View style={styles.container}>
      {userIsRegister && (
        <View style={styles.flashMessage}>
          <Text style={{ color: "white" }}>Bienvenue dans l'aventure</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom ou pseudo"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
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
        onPress={() => setRegisterPage(!setRegisterPage)}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
