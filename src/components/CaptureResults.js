import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setCapturedImage } from "../app/slices/cameraSlice";
import { setWildAmos, setCaptureResult } from "../app/slices/captureSlice";

import Amos from "../entities/Amos";
import AmosDataFr from "../entities/AmosDataFr.json";

import { colors } from "../style/theme";
const { primary_c } = colors;

const CaptureResultScreen = ({ cbLoading }) => {
  const dispatch = useDispatch();
  const { captureResult } = useSelector((state) => state.captureSlice);
  const { capturedImage } = useSelector((state) => state.cameraSlice);

  // useEffect(() => {}, []);

  const validate = () => {
    dispatch(
      setCapturedImage({
        image: null,
        cameraLocation: null,
      })
    );
    dispatch(setWildAmos(null));
    dispatch(setCaptureResult(null));
  };

  const battleWon = async () => {
    // Battle won, save the amos
    // cbLoading("Capture de l'Amos...");
    // const amosSaving = await serviceSaveAmos(
    //   dispatch,
    //   capturedImage,
    //   currentUser,
    //   wildAmos
    // );
    // if (amosSaving.error !== undefined) {
    //   cbLoading("");
    // }
  };

  const Buttons = () => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: capturedImage.path,
          }}
        />
        <TouchableOpacity onPress={validate} style={styles.btn}>
          <Text style={styles.btnText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (captureResult.failed) {
    return (
      <View style={styles.container}>
        <Text>L'Amos s'est enfui !</Text>
        <Buttons />
      </View>
    );
  }

  if (captureResult.id !== undefined) {
    return (
      <View style={styles.container}>
        <View style={styles.successInfo}>
          <Text style={styles.successInfoTxt}>
            {"Bravo, vous avez capturé un Amos de l'espèce " +
              Amos.capitalize(AmosDataFr.amos[captureResult.species].species) +
              " ! il se trouve maintenant dans votre liste d'Amos"}
          </Text>
          <Text style={styles.successInfoTxt}>
            {"Numéro d'Archamos: " + captureResult.id}
          </Text>
        </View>
        <Buttons />
        {/* TODO possibility to rename amos */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.successInfoTxt}>
        Aucun Amos enregistré n'a été reconnu.
      </Text>
      <Buttons />
    </View>
  );
};

export default CaptureResultScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
  successInfo: {
    margin: 10,
  },
  successInfoTxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  btn: {
    backgroundColor: primary_c,
    width: "60%",
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
