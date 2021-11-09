import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { menuIcons } from "../../assets/menuIcons";

import { colors } from "../style/theme";
const { primary_c, tertiary_c, error_c } = colors;

import { useDispatch } from "react-redux";
import { serviceLoginUser, serviceRegisterUser } from "../services/user";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [statusMess, setStatusMess] = useState("Chargement...");
  const [errorMess, setErrorMess] = useState(null);
  const [registerPage, setRegisterPage] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const loginUser = async () => {
    setLoading(true);
    let userInfo = JSON.stringify({
      email: email,
      password: password,
    });
    const loginError = await serviceLoginUser(dispatch, userInfo);
    if (loginError) {
      setErrorMess("Une erreur s'est produite lors de l'authentification");
      setLoading(false);
    }
  };

  const registerUser = async () => {
    setLoading(true);
    let userInfo = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });
    const registerError = await serviceRegisterUser(dispatch, userInfo);
    if (registerError) {
      setErrorMess("Une erreur s'est produite lors de l'inscription");
      setLoading(false);
    }
  };

  const Header = () => (
    <>
      {errorMess !== null && <Text style={styles.errorMess}>{errorMess}</Text>}
      <View style={styles.titleWrapper}>
        <Image style={styles.gameIcon} source={menuIcons.amosTitle} />
        <Text style={styles.titleText}>Les Gardiens d'Amos</Text>
      </View>
    </>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={primary_c} />
        <Text style={{ textAlign: "center" }}>{statusMess}</Text>
      </View>
    );
  }

  if (!registerPage) {
    // Displays login page
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.formWrapper}>
          <TextInput
            style={styles.formInput}
            placeholder="E-mail"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Mot de passe"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.formBtn} onPress={loginUser}>
            <Text style={styles.btnsInsideTxt}>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switchBtnWrapper}>
          <Text style={styles.switchBtnTopTxt}>
            Vous n'êtes pas encore Gardien d'Amos ?
          </Text>
          <TouchableOpacity
            style={styles.switchBtn}
            onPress={() => setRegisterPage(!registerPage)}
          >
            <Text style={styles.btnsInsideTxt}>S'incrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    // Displays register page
    <View style={styles.container}>
      <Header />
      <View style={styles.formWrapper}>
        <TextInput
          style={styles.formInput}
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
          secureTextEntry={false}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Nom ou pseudo"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.formBtn} onPress={registerUser}>
          <Text style={styles.btnsInsideTxt}>S'incrire</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchBtnWrapper}>
        <Text style={styles.switchBtnTopTxt}>Déjà Gardien d'Amos ?</Text>
        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => setRegisterPage(!registerPage)}
        >
          <Text style={styles.btnsInsideTxt}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleWrapper: {
    flex: 1,
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    flex: 1,
    width: "100%",
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  switchBtnWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    fontSize: 25,
  },
  titleText: {
    width: "100%",
    fontSize: 32,
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  gameIcon: {
    width: 100,
    height: 100,
    padding: 5,
  },
  title: {
    fontSize: 25,
  },
  formInput: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 25,
    padding: 5,
    margin: 5,
  },
  formBtn: {
    width: "50%",
    padding: 12,
    margin: 10,
    borderRadius: 8,
    backgroundColor: primary_c,
  },
  switchBtnTopTxt: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchBtn: {
    width: "70%",
    padding: 12,
    margin: 10,
    borderRadius: 8,
    backgroundColor: primary_c,
  },
  btnsInsideTxt: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMess: {
    width: "100%",
    backgroundColor: error_c,
    fontSize: 25,
    fontWeight: "bold",
  },
});
