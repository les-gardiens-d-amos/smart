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

import { useSelector, useDispatch } from "react-redux";
import {
  serviceRenameAmos,
  serviceReleaseAmos,
} from "../services/archamosService";

import RenameModal from "../components/RenameModal";

const AmosSingle = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userSlice);
  const { amosSingle } = useSelector((state) => state.archamosSlice);

  const [modalRename, setModalRename] = useState(false);

  useEffect(() => {
    // Request to get information on this particular amos
    // Stats, how many fights, geoloc etc
    // Fow now the amos is from props from Archamos screen
  }, []);

  const closePage = () => {
    serviceSetAmosSingle(dispatch, amosList, amos.id);
  }

  const changeName = (newName) => {
    serviceRenameAmos(dispatch, currentUser, amosSingle.id, newName);
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
            serviceReleaseAmos(dispatch, currentUser, amosSingle.id);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalRename}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalRename(false)}
      >
        <RenameModal
          title={"Changer le nom"}
          cMin={3}
          cMax={10}
          placeholder={amosSingle.name}
          cbAction={changeName}
          cbClose={setModalRename}
        />
      </Modal>

      <TouchableOpacity onPress={closePage} style={styles.btnFight}>
        <MaterialCommunityIcons name="plus" color="white" size={26} />
        {/* <MaterialCommunityIcons name="minus" color="white" size={26} /> */}
      </TouchableOpacity>

      <View style={styles.photoWrapper}>
        <Image
          style={styles.photo}
          source={{
            uri: amosSingle.image_path,
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
        <Text style={styles.name}>{amosSingle.name}</Text>
      </View>

      <Text style={[styles.type, { backgroundColor: amosSingle.typeColor }]}>
        {amosSingle.amos_type}
      </Text>
      <View style={styles.speciesLvlWrapper}>
        <Text style={styles.level}>{amosSingle.species}</Text>
        <Text style={styles.level}>{" de niveau " + amosSingle.level}</Text>
      </View>

      <View style={styles.dateWrapper}>
        <Text style={styles.date}>
          {"Date de capture : " + amosSingle.capturedAt}
        </Text>
      </View>

      <Button
        buttonStyle={styles.releaseBtn}
        color={error_c}
        title="Relâcher l'Amos"
        onPress={release}
      />
    </View>
  );
};

export default AmosSingle;

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
