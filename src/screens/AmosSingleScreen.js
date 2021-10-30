import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import * as SecureStore from "expo-secure-store";

import { colors } from "../style/theme";
const { primary_c } = colors;

import { API } from "../store/axios";

import RenameModal from "../components/RenameModal";

import Amos from "../entities/Amos";
import archamosData from "../tempData/ArchamosData";

const AmosSingleScreen = ({ route }) => {
  const { amosData } = route.params;

  const [amos, setAmos] = useState(amosData);
  const [amosName, setAmosName] = useState(amosData.name);
  const [renameVisible, setRenameVisible] = useState(false);

  useEffect(() => {
    // Request to get information on this particular amos
    // Stats, how many fights, geoloc etc
    // Fow now the amos is from props from Archamos screen
  }, []);

  const changeName = async (inputValue) => {
    const userToken = await SecureStore.getItemAsync("jwt");
    let data = { name: inputValue };
    API.put(`amos/update/name?id=${amos.id}`, data, {
      headers: { Authorization: "Bearer " + userToken },
    })
      .then((response) => {
        setAmosName(inputValue);
      }) // Refreseh the page single with the new name
      .catch((error) => console.log("changeName put error", error));
  };

  const release = () => {
    // Delete the Amos, modal to confirm
  };

  return (
    <View style={styles.container}>
      {amos && (
        <>
          <Modal
            visible={renameVisible}
            onRequestClose={() => setRenameVisible(false)}
          >
            <RenameModal
              name={amosName}
              callbackChangeName={changeName}
              callbackCloseModal={setRenameVisible}
            />
          </Modal>
          <View style={styles.nameWrapper}>
            <Button
              onPress={() => setRenameVisible(true)}
              type="outline"
              icon={<Icon name="edit" size={25} color={primary_c} />}
              buttonStyle={{ border: "none" }}
            />
            <Text style={styles.name}>{amosName}</Text>
          </View>

          <Text style={styles.type}>{amos.amos_type}</Text>
          <View style={styles.speciesLvlWrapper}>
            <Text style={styles.level}>{amos.species}</Text>
            <Text style={styles.level}>{" de niveau " + amos.level}</Text>
          </View>

          <View style={styles.dateWrapper}>
            <Text style={styles.date}>
              {"Date de capture : " + amos.capturedAt}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default AmosSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  btnChangeName: {},
  nameWrapper: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  type: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    padding: 30,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 20,
  },
  speciesLvlWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  species: {},
  level: {},
  dateWrapper: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
