import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";

import { colors, deviceSize } from "../style/theme";
const { primary_c, secondary_c, warning_c } = colors;

const ChangePassModal = ({
  title,
  cMax,
  cMin,
  placeholder,
  cbAction,
  cbClose,
}) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [notification, setNotification] = useState("");

  const displayNotification = (mess) => {
    setNotification(mess);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Input
        style={styles.input}
        placeholder={"Mot de passe"}
        onChangeText={setOldPass}
        value={oldPass}
        secureTextEntry={true}
      ></Input>
      <Input
        style={styles.input}
        placeholder={"Nouveau mot de passe"}
        onChangeText={setNewPass}
        value={newPass}
        secureTextEntry={true}
      ></Input>
      {notification !== "" && (
        <Text style={styles.notification}>{notification}</Text>
      )}
      <View style={styles.btnsWrapper}>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            if (cMax && (oldPass.length > cMax || newPass.length > cMax)) {
              displayNotification(
                `L'entrée est trop longue (pas plus de ${cMax} caractères)`
              );
            } else if (
              cMin &&
              (oldPass.length < cMin || newPass.length < cMin)
            ) {
              displayNotification(
                `L'entrée est trop courte (au moins ${cMin} caractères)`
              );
            } else {
              cbAction(oldPass);
              cbClose(false);
            }
          }}
        >
          <Text style={styles.btnsText}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            cbClose(false);
          }}
        >
          <Text style={styles.btnsText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassModal;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: primary_c,
    width: deviceSize.width * 0.8,
    height: deviceSize.height * 0.5,
    top: deviceSize.height * 0.1,
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    color: "#fff",
    width: "90%",
    padding: 15,
    backgroundColor: secondary_c,
  },
  btnsWrapper: {
    flex: 1,
    width: "90%",
    maxHeight: "30%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btns: {
    backgroundColor: secondary_c,
    width: "40%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  btnsText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  notification: {
    textAlign: "center",
    color: warning_c,
    zIndex: 10,
  },
});
