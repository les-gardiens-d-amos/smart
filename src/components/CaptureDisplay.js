import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  serviceAnalyzeImage,
  serviceSaveAmos,
} from "../services/captureService";

import { setCapturedImage } from "../app/slices/cameraSlice";
import { setWildAmos, setCaptureResult } from "../app/slices/captureSlice";

import Loader from "../components/CustomActivityLoader";

import Amos from "../entities/Amos";
import AmosDataFr from "../entities/AmosDataFr.json";
import AmosIconColors from "../entities/AmosIconColors.json";

import { icons as amosIcons, soulIcons } from "../../assets/amosIcons";

import { colors } from "../style/theme";
const { primary_c, secondary_c } = colors;

const CaptureDisplay = ({ cbLoading }) => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.userSlice);
  const { capturedImage, cameraLocation } = useSelector(
    (state) => state.cameraSlice
  );
  const { wildAmos, captureResult } = useSelector(
    (state) => state.captureSlice
  );

  useEffect(() => {
    if (wildAmos === null && captureResult === null) {
      // Check if the amos has been recognized by Clarifai or not yet
      // to avoid Clarifai request each time the component is loaded
      serviceAnalyzeImage(dispatch, capturedImage);
    }
  }, []);

  const fight = async () => {
    console.log("Fight function");
    // TODO TEMPORARY, GO TO BATTLE SCREEN

    cbLoading("Capture de l'Amos...");
    const amosSaving = await serviceSaveAmos(
      dispatch,
      capturedImage,
      currentUser,
      wildAmos,
      cameraLocation
    );
    if (amosSaving.error !== undefined) {
      cbLoading("");
    }
  };

  const release = () => {
    dispatch(setCaptureResult(null));
    dispatch(setWildAmos(null));
    dispatch(
      setCapturedImage({
        image: null,
        cameraLocation: null,
      })
    );
  };

  if (wildAmos === null) return <Loader message={"Analyse de la capture..."} />;

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: capturedImage.path }}></Image>
      <View style={styles.description}>
        <View style={styles.descSpeciesWrapper}>
          <Text style={[styles.descTxt, styles.descTxtId]}>{wildAmos.id}</Text>
          <Image
            style={styles.descTypeImg}
            source={amosIcons[wildAmos.species]}
          />
          <Text style={styles.descTxt}>
            {Amos.capitalize(AmosDataFr.amos[wildAmos.species].species)}
          </Text>
        </View>
        <Text
          style={[
            styles.descTxt,
            {
              backgroundColor: AmosIconColors[wildAmos.type],
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
            },
          ]}
        >
          {Amos.capitalize(AmosDataFr.amos[wildAmos.species].type)}
        </Text>
        <Text style={[styles.descTxt, styles.descTxtLevel]}>
          Niveau: {" " + wildAmos.level > 1 ? wildAmos.level : 1}
        </Text>
      </View>
      <View style={styles.btnsWrapper}>
        <TouchableOpacity onPress={fight} style={styles.btnFight}>
          <Text style={styles.btnsTxt}>Capturer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={release} style={styles.btnRelease}>
          <Text style={styles.btnsTxt}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CaptureDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    margin: 15,
    borderWidth: 2,
    borderRadius: 12,
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
  },
  descTxt: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
  },
  descSpeciesWrapper: {
    margin: 6,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descTxtId: {
    position: "absolute",
    top: 0,
    left: -20,
  },
  descTypeImg: {
    width: 60,
    height: 60,
  },
  descTxtLevel: {
    margin: 6,
  },
  btnsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnFight: {
    backgroundColor: primary_c,
    width: "40%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  btnRelease: {
    backgroundColor: secondary_c,
    width: "40%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  btnsTxt: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
