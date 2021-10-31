import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";

import { colors } from "../style/theme";
const { primary_c, secondary_c, warning_c } = colors;

const RenameModal = ({ amosName, callbackChangeName, callbackCloseModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [warningMess, setWarningMess] = useState("");

  return (
    <View style={styles.container}>
      {warningMess !== "" && (
        <Text style={styles.warningMess}>{warningMess}</Text>
      )}
      <Input
        style={styles.input}
        placeholder={amosName}
        onChangeText={setInputValue}
        value={inputValue}
      ></Input>
      <View style={styles.buttonsWrapper}></View>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          // For if not empty, check if not too small
          if (inputValue.length > 2) {
            callbackChangeName(inputValue);
            callbackCloseModal(false);
          } else {
            setWarningMess(
              "Le nom est trop court, au moins 3 caractères sont requis"
            );
          }
        }}
      >
        <Text style={styles.text}>Valider</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          callbackCloseModal(false);
        }}
      >
        <Text style={styles.text}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenameModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    height: 300,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: secondary_c,
    borderWidth: 2,
  },
  buttonsWrapper: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttons: {
    backgroundColor: secondary_c,
    width: "40%",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  warningMess: {
    color: warning_c,
  },
});
