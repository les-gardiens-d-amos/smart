import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  serviceAnalyzeImage,
  serviceSaveAmos,
} from "../services/captureService";

import Loader from "../components/CustomActivityLoader";

import Amos from "../entities/Amos";
import AmosDataFr from "../entities/AmosDataFr.json";

import { colors } from "../style/theme";
const { primary_c, secondary_c } = colors;

const CaptureDisplay = () => {
  const dispatch = useDispatch();

  const { capturedImage } = useSelector((state) => state.cameraSlice);
  const wildAmos = useSelector((state) => state.captureSlice.wildAmos);

  useEffect(() => {
    searchValidAmos();
  }, []);

  const searchValidAmos = async () => {
    const result = await serviceAnalyzeImage(dispatch, capturedImage);
    console.log("searchValidAmos result -", result);
    if (result.found === true) {
      console.log("Amos found -", result.amos);
    }
  };

  const fight = () => {
    console.log("Battle wildAmos", wildAmos);
    // serviceSaveAmos(dispatch, wildAmos);
  };

  const release = () => {
    console.log("Release");
    console.log("Battle wildAmos", wildAmos);
    // Ignore the Amos and the shot then redirect to the capture camera
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: capturedImage.path }}></Image>
      {wildAmos !== null ? (
        <>
          <View style={styles.description}>
            <Text style={styles.descText}> {("Numéro:", wildAmos.id)} </Text>
            <Text style={styles.descText}>
              {
                ("Type:",
                Amos.capitalize(AmosDataFr.amos[wildAmos.species].type))
              }
            </Text>
            <Text style={styles.descText}>
              {
                ("Espèce:",
                Amos.capitalize(AmosDataFr.amos[wildAmos.species].species))
              }
            </Text>
            <Text style={styles.descText}>
              {("Niveau:", wildAmos.level > 1 ? wildAmos.level : 1)}
            </Text>
          </View>
          <TouchableOpacity onPress={fight} style={styles.btnFight}>
            <Text style={styles.btnFightText}>Combattre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={release} style={styles.btnRelease}>
            <Text style={styles.btnReleaseText}>Relâcher</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Loader message={"Analyse de la capture..."} />
      )}
    </View>
  );
};

export default CaptureDisplay;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
    margin: 15,
    borderWidth: 2,
    borderRadius: 12,
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
  },
  descText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnFight: {
    backgroundColor: primary_c,
    width: "60%",
    margin: 6,
    padding: 6,
    borderWidth: 1,
    borderRadius: 10,
  },
  btnFightText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  btnRelease: {
    backgroundColor: secondary_c,
    width: "60%",
    margin: 6,
    padding: 6,
    borderWidth: 1,
    borderRadius: 10,
  },
  btnReleaseText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
