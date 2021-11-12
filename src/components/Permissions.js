import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import {
  setCameraPermission,
  setLocationPermission,
} from "../app/slices/permissionsSlice";

import { colors } from "../style/theme";
const { primary_c } = colors;

const Permissions = () => {
  const dispatch = useDispatch();

  // (Platform.OS !== "web")

  const cameraPermission = useSelector(
    (state) => state.permissionsSlice.camera
  );
  const locationPermission = useSelector(
    (state) => state.permissionsSlice.location
  );

  const askGrantCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      dispatch(setCameraPermission(true));
    }
  };

  const askGrantLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      dispatch(setLocationPermission(true));
    }
  };

  askGrantCamera();
  askGrantLocation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Pour capturer un Amos, l'application à besoin d'utiliser la camera du
        téléphone ainsi que la géolocalisation.
      </Text>
      <View style={styles.buttonsWrapper}>
        {!cameraPermission && (
          <TouchableOpacity style={styles.btn} onPress={askGrantCamera}>
            <Text style={styles.btnText}>Autoriser la camera</Text>
          </TouchableOpacity>
        )}
        {!locationPermission && (
          <TouchableOpacity style={styles.btn} onPress={askGrantLocation}>
            <Text style={styles.btnText}>Autoriser la géolocalisation</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Permissions;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsWrapper: {},
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  btn: {
    width: "80%",
    backgroundColor: primary_c,
    padding: 15,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
