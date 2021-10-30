import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
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
      <Button
        title="Valider"
        onPress={() => {
          // For if not empty, check if not too small
          if (inputValue.length > 2) {
            callbackChangeName(inputValue);
            callbackCloseModal(false);
          } else {
            setWarningMess("Le nom est trop court, au moins 3 caractères");
          }
        }}
      />
      <Button
        title="Annuler"
        onPress={() => {
          callbackCloseModal(false);
        }}
      />
    </View>
  );
};

export default RenameModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary_c,
    width: "80%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    padding: 15,
  },
  input: {
    width: "90%",
    height: 40,
    padding: 15,
    backgroundColor: secondary_c,
    borderWidth: 2,
  },
  buttonsWrapper: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  warningMess: {
    color: warning_c,
  },
});
