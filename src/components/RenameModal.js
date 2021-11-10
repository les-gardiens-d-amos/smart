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
      <View style={styles.buttonsWrapper}>
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
    </View>
  );
};

export default RenameModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary_c,
    width: 300,
    height: 300,
    top: 50,
    borderRadius: 20,
    padding: 25,
    alignSelf: "center",
    justifyContent: "space-around",
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
  input: {
    width: "90%",
    padding: 15,
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
    borderWidth: 1,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  warningMess: {
    textAlign: "center",
    margin: 5,
    color: warning_c,
  },
});
