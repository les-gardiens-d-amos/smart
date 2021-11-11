import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Modal,
  Alert,
} from "react-native";
import { Button as ButtonEle } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { colors } from "../style/theme";
const { primary_c, error_c } = colors;

import { API } from "../apis/axios";
import { useSelector, useDispatch } from "react-redux";
import { setAmosNewName } from "../app/slices/archamosSlice";

import RenameModal from "../components/RenameModal";

import Amos from "../entities/Amos";

const AmosSingleScreen = ({ route }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const { amosData } = route.params;

  const [amos, setAmos] = useState(amosData);
  const [amosName, setAmosName] = useState(amosData.name);
  const [modalRename, setModalRename] = useState(false);

  useEffect(() => {
    // Request to get information on this particular amos
    // Stats, how many fights, geoloc etc
    // Fow now the amos is from props from Archamos screen
  }, []);

  const changeName = async (inputValue) => {
    let data = { name: inputValue };
    const response = await API.put(`amos/update/name?id=${amos.id}`, data, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    });

    if (response.status == 200) {
      setAmosName(inputValue);
      // TODO To fix "TypeError: undefined is not an object (evaluating 'item.id')"
      // dispatch(setAmosNewName({ id: amos.id, name: inputValue }));
    } else {
      console.log("changeName put error response -", response);
    }
  };

  const release = () => {
    Alert.alert(
      "Relâcher l'Amos",
      "Etes-vous sûr de vouloir relâcher cet Amos ? Il sera supprimé de façon permanente.",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel release"),
          style: "cancel",
        },
        {
          text: "Relâcher",
          onPress: async () => {
            API.delete(`amos/${amos.id}`, {
              headers: { Authorization: "Bearer " + currentUser.playerToken },
            })
              .then((response) => {
                setAmos(null);
              })
              .catch((error) => console.log("Amos delete error", error));
          },
        },
      ]
    );
  };

  if (amos === null) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Impossible d'afficher cet Amos
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalRename}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalRename(false)}
      >
        <RenameModal
          placeholder={amosName}
          cbAction={changeName}
          cbClose={setModalRename}
        />
      </Modal>

      <View style={styles.photoWrapper}>
        <Image
          style={styles.photo}
          source={{
            uri: amos.image_path,
          }}
        />
      </View>

      <View style={styles.nameWrapper}>
        <ButtonEle
          type="clear"
          onPress={() => setModalRename(true)}
          icon={<Icon name="edit" size={25} color={primary_c} />}
          buttonStyle={styles.renameBtn}
        />
        <Text style={styles.name}>{amosName}</Text>
      </View>

      <Text style={[styles.type, { backgroundColor: amos.typeColor }]}>
        {amos.amos_type}
      </Text>
      <View style={styles.speciesLvlWrapper}>
        <Text style={styles.level}>{amos.species}</Text>
        <Text style={styles.level}>{" de niveau " + amos.level}</Text>
      </View>

      <View style={styles.dateWrapper}>
        <Text style={styles.date}>
          {"Date de capture : " + amos.capturedAt}
        </Text>
      </View>

      <Button
        buttonStyle={styles.releaseBtn}
        color={error_c}
        title="Relâcher l'Amos"
        onPress={() => release()}
      />
    </View>
  );
};

export default AmosSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
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
  renameBtn: {
    marginRight: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoWrapper: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: 200,
    height: 200,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  type: {
    textAlign: "center",
    alignSelf: "center",
    padding: 15,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 20,
  },
  speciesLvlWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  species: {},
  level: {},
  dateWrapper: {
    padding: 10,
  },
  date: {
    textAlign: "center",
    fontWeight: "bold",
  },
  releaseBtn: {
    padding: 10,
  },
});
