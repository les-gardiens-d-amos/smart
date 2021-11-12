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

const RenameModal = ({ title, cMax, cMin, placeholder, cbAction, cbClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [notification, setNotification] = useState("");

  const displayNotification = (mess) => {
    setNotification(mess);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Input
        style={styles.input}
        placeholder={placeholder}
        onChangeText={setInputValue}
        value={inputValue}
      ></Input>
      {notification !== "" && (
        <Text style={styles.notification}>{notification}</Text>
      )}
      <View style={styles.btnsWrapper}>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            if (cMax && inputValue.length > cMax) {
              displayNotification(
                `L'entrée est trop longue (pas plus de ${cMax} caractères)`
              );
            } else if (cMin && inputValue.length < cMin) {
              displayNotification(
                `L'entrée est trop courte (au moins ${cMin} caractères)`
              );
            } else {
              cbAction(inputValue);
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

export default RenameModal;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: primary_c,
    width: deviceSize.width * 0.8,
    height: deviceSize.height * 0.4,
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
