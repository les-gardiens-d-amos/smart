import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button } from "@react-native-material/core";

import { soulIcons } from "../../assets/amosIcons";

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

  const Header = () => (
    <View style={styles.titleWrapper}>
      <Text>Les Gardiens d'Amos</Text>
      <Image style={styles.gameIcon} source={soulIcons.default} />
    </View>
  );

  if (!registerPage) {
    // Displays login page
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.formWrapper}>
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
          <View style={styles.switchBtnWrapper}>
            <Text>Vous n'êtes pas encore Gardien d'Amos ?</Text>
            <Button
              color={primary_c}
              style={styles.btn}
              title="Inscription"
              onPress={() => setRegisterPage(!registerPage)}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    // Displays register page
    <View style={styles.container}>
      <Header />
      <View style={styles.formWrapper}>
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
      </View>
      <View style={styles.switchBtnWrapper}>
        <Text>Déjà Gardien d'Amos ?</Text>
        <Button
          color={primary_c}
          style={styles.btn}
          title="Connexion"
          onPress={() => setRegisterPage(!registerPage)}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleWrapper: {
    fontSize: 40,
  },
  formWrapper: {},
  switchBtnWrapper: {
    padding: 15,
    fontSize: 25,
  },
  gameIcon: {
    width: 64,
  },
  title: {
    fontSize: 25,
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 25,
    margin: 15,
  },
  btn: {
    width: "60%",
    fontSize: 25,
    backgroundColor: primary_c,
    color: tertiary_c,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 15,
    textAlign: "center",
  },
  flashMessage: {
    backgroundColor: success_c,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 15,
  },
});
