import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { setCapturedImage } from "../app/slices/cameraSlice";
import Utils from "../app/Utils";
import * as ImageManipulator from "expo-image-manipulator";

import Permissions from "../components/Permissions";
import CaptureDisplay from "../components/CaptureDisplay";
import CaptureResults from "../components/CaptureResults";
import Loader from "../components/CustomActivityLoader";

import { colors } from "../style/theme";
const { primary_c } = colors;

const CaptureScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const cameraPermission = useSelector(
    (state) => state.permissionsSlice.camera
  );
  const locationPermission = useSelector(
    (state) => state.permissionsSlice.location
  );
  const { capturedImage } = useSelector((state) => state.cameraSlice);
  const { captureResult } = useSelector((state) => state.captureSlice);

  const [loading, setLoading] = useState("");

  // useEffect(() => {}, []);

  const takePicture = async () => {
    setLoading("Chargement...");
    const options = {
      allowsEditing: true,
      aspect: [4, 4],
    };
    let image = await ImagePicker.launchCameraAsync(options);
    if (!image.cancelled) {
      const location = await Location.getCurrentPositionAsync({});

      const imgProcessed = await ImageManipulator.manipulateAsync(
        image.localUri || image.uri,
        [{ resize: { width: 1024, height: 1024 } }],
        { base64: true, compress: 0.5, format: "jpeg" }
      );

      dispatch(
        setCapturedImage({
          image: { data: imgProcessed, path: imgProcessed.uri },
          cameraLocation: {
            lat: location.coords.latitude,
            long: location.coords.longitude,
            altitude: location.coords.altitude,
            accuracy: location.coords.accuracy,
          },
        })
      );
    }
    setLoading("");
  };

  if (loading !== "") return <Loader message={loading} />;

  if (!cameraPermission || !locationPermission) return <Permissions />;

  if (captureResult !== null) {
    return <CaptureResults cbLoading={setLoading} />;
  }

  if (capturedImage !== null) {
    return <CaptureDisplay cbLoading={setLoading} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={takePicture} style={styles.btn}>
        <Text style={styles.btnText}>Tentative</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
        <Text style={styles.btnText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btn: {
    backgroundColor: primary_c,
    width: "40%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
