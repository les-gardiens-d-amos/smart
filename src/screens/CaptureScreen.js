import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { setCapturedImageAction } from "../app/slices/cameraSlice";
import { serviceAnalyzeImage } from "../services/captureService";

import Permissions from "../components/Permissions";
import CaptureDisplay from "../components/CaptureDisplay";
import Loader from "../components/CustomActivityLoader";

import Amos from "../entities/Amos";

import { colors } from "../style/theme";
const { primary_c } = colors;

const CaptureScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cameraState = useSelector((state) => state.cameraSlice);

  const cameraPermission = useSelector(
    (state) => state.permissionsSlice.camera
  );
  const locationPermission = useSelector(
    (state) => state.permissionsSlice.location
  );
  const wildAmos = useSelector((state) => state.captureSlice.wildAmos);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // navigation.addListener("beforeRemove", (e) => {
    //   console.log("back pressed");
    //   if (cameraState.capturedImage !== null) {
    //     e.preventDefault();
    //     Alert.alert("Annuler la capture ?", [
    //       { text: "Rester sur la page", style: "cancel", onPress: () => {} },
    //       {
    //         text: "Quitter la capture",
    //         style: "destructive",
    //         onPress: () => {
    //           cancelPicture();
    //           navigation.dispatch(e.data.action);
    //         },
    //       },
    //     ]);
    //   }
    // });
  }, []);

  if (loading) return <Loader message={"Chargement..."} />;

  if (!cameraPermission || !locationPermission) return <Permissions />;

  if (wildAmos !== null) {
    console.log("WildAmos set -", wildAmos);
    // Move to another screen to fight the AMOS and try to capture it ?
  }

  if (cameraState.capturedImage !== null) {
    return <CaptureDisplay />;
  }

  const takePicture = async () => {
    setLoading(true);
    const options = {
      base64: true,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    };
    const image = await ImagePicker.launchCameraAsync(options);
    if (!image.cancelled) {
      const location = await Location.getCurrentPositionAsync({});
      dispatch(
        setCapturedImageAction({
          image: { data: image, path: image.uri },
          cameraLocation: {
            lat: location.coords.latitude,
            long: location.coords.longitude,
            altitude: location.coords.altitude,
            accuracy: location.coords.accuracy,
          },
        })
      );
    }
    setLoading(false);
  };

  const analyzeImage = () => {
    serviceAnalyzeImage();
    // Move to another screen to fight the AMOS and try to capture it ?
    // CLARIFAI
  };

  const cancelPicture = () => {
    dispatch(
      setCapturedImageAction({
        image: null,
        cameraLocation: null,
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={takePicture} style={styles.btn}>
        <Text style={styles.btnText}>Capturer</Text>
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
