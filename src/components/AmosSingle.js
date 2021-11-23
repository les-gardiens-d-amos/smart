import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button as ButtonEle } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { colors, deviceSize } from "../style/theme";
const { primary_c, error_c } = colors;

import { useSelector, useDispatch } from "react-redux";
import { setAmosSingle } from "../app/slices/archamosSlice";
import {
  serviceRenameAmos,
  serviceReleaseAmos,
} from "../services/archamosService";

import RenameModal from "../components/RenameModal";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { icons as amosIcons } from "../../assets/amosIcons/index";

const geohash = require("ngeohash");

const AmosSingle = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userSlice);
  const { amosSingle } = useSelector((state) => state.archamosSlice);
  const latitude = geohash.decode(amosSingle.location).latitude;
  const longitude = geohash.decode(amosSingle.location).longitude;

  const [modalRename, setModalRename] = useState(false);

  useEffect(() => {
    // TODO Stats, how many fights, geoloc etc
  }, []);

  const closePage = () => {
    dispatch(setAmosSingle(null));
  };

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
    <ScrollView>
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

        <TouchableOpacity onPress={closePage} style={styles.btnReturn}>
          <Text style={styles.btnReturnTxt}>Retour</Text>
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

        <View style={styles.mapDescWrapper}>
          <Icon name="map-marker" size={25} color={primary_c} />
          <Text style={styles.mapDesc}>Lieu de capture :</Text>
        </View>

        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              title={amosSingle.name}
            >
              <Image style={styles.speciesIcon} source={amosIcons.default} />
            </Marker>
          </MapView>
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
    </ScrollView>
  );
};

export default AmosSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
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
    width: 300,
    height: 300,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
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
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  species: {},
  level: {},
  mapDescWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mapDesc: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 5,
  },
  mapWrapper: {
    width: "90%",
    height: 200,
    borderWidth: 2,
    borderColor: primary_c,
  },
  map: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  speciesIcon: {
    width: 50,
    height: 50,
    zIndex: 10,
  },
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
  btnReturn: {
    width: "50%",
    backgroundColor: primary_c,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  btnReturnTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
