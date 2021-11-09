import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { API, CLARIFAI, IMGUR } from "../apis/axios";
import { useSelector } from "react-redux";

import { colors } from "../style/theme";
const { primary_c, warning_c } = colors;

import Amos from "../entities/Amos";
import AmosDataFr from "../entities/AmosDataFr.json";
import { useNavigation } from "@react-navigation/native";

const DisplayResultScreen = () => {
  const cameraState = useSelector((state) => state.cameraSlice);
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const picture = cameraState.capturedImage.data;
  const shortUrl = cameraState.capturedImage.path;
  const localisation = cameraState.cameraLocation;

  const [statusMess, setStatusMess] = useState("Analyse de la capture...");

  const [capturing, setCapturing] = useState(true);
  const [savingAmos, setSavingAmos] = useState(false);
  const [captureSuccess, setCaptureSuccess] = useState(false);

  const [amosToCapture, setAmosToCapture] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    capture();
  }, []);

  const capture = async () => {
    let raw = JSON.stringify({
      inputs: [
        {
          data: {
            image: {
              base64: picture.base64,
              //url: TestUrls["cat"],
            },
          },
        },
      ],
    });

    CLARIFAI.post("", raw)
      .then((response) => {
        const pictureData = response.data.outputs[0].data.concepts;
        checkForExistingAmos(pictureData);
      })
      .catch((error) => {
        console.log("CLARIFAI.post error", error);
        setErrorMessage();
      })
      .finally(() => {
        setStatusMess("Aucun Amos existant n'a été reconnu.");
        setCapturing(false);
      });
  };

  const keep = () => {
    saveAmosImage();
  };

  const saveAmosImage = () => {
    let FormData = require("form-data");
    let requestInfo = new FormData();

    requestInfo.append("image", picture.base64);
    requestInfo.append("type", "base64");

    IMGUR.post("", requestInfo)
      .then((response) => {
        if (response.data.success && response.data.status === 200) {
          saveAmos(response.data.data.link);
        }
      })
      .catch((error) => {
        console.log("IMGUR.post", error);
        goBackOnError();
      });
  };

  const setErrorMessage = () => {
    setStatusMess("Désolé, une erreur est survenue.");
  };

  // temp somlution in case of an error
  const goBackOnError = () => {
    setAmosToCapture(true);
    setErrorMessage();
    setTimeout(() => {
      setCaptureSuccess(false);
      setSavingAmos(false);
    }, 1000);
  };

  const saveAmos = (imgPath) => {
    let amos = JSON.stringify({
      user_id: currentUser.id,
      animal_id: amosToCapture.id,
      species: amosToCapture.species,
      amos_type: amosToCapture.type,
      name: amosToCapture.species,
      image_path: imgPath,
    });

    console.log("amos to save in db -", amos);

    API.post("amos", amos, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    })
      .then((response) => {
        saveLocation(response.data.id);
      })
      .catch((error) => console.log("API.post amos", error));
  };

  const saveLocation = (idAmos) => {
    let coordInfo = JSON.stringify({
      long: localisation.long,
      lat: localisation.lat,
      altitude: localisation.altitude,
      accuracy: localisation.accuracy,
      amos_id: idAmos,
    });

    API.post("catches", coordInfo, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    })
      .then((response) => {
        setCaptureSuccess(true);
        // navigation.navigate("ArchamosScreen"); Not working
      })
      .catch((error) => console.log(error));
  };

  const release = () => {
    console.log("Chosen to realease the AMOS");
    // Ignore the Amos and the shot then redirect to the capture camera
  };

  const checkForExistingAmos = (pictureData) => {
    const foundAmos = Amos.isRegistered(pictureData);
    if (foundAmos !== null) {
      setAmosToCapture(foundAmos);
      // Move to another screen to fight the AMOS and try to capture it ?
    }
  };

  if (captureSuccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.successInfo}>
          Bravo, vous avez capturé un Amos de l'espèce{" "}
          {Amos.capitalize(AmosDataFr.amos[amosToCapture.species].species)}!
          Numéro d'Archamos: {amosToCapture.id}{" "}
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: shortUrl,
          }}
        />
        {/* Button return to main screen */}
      </View>
    );
  }

  if (savingAmos || capturing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={primary_c} />
        <Text>{statusMess}</Text>
      </View>
    );
  }

  if (!amosToCapture) {
    return (
      <View style={styles.container}>
        <Text>{statusMess}</Text>
        <TouchableOpacity
          style={(styles.buttons, styles.buttonRelease)}
          onPress={() => navigation.goBack(null)}
        >
          <Text style={styles.text}> Retourner </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: shortUrl,
        }}
      />

      <View style={styles.description}>
        <Text style={styles.descText}> Numéro: {amosToCapture.id} </Text>
        <Text style={styles.descText}>
          {" "}
          Type: {Amos.capitalize(
            AmosDataFr.amos[amosToCapture.species].type
          )}{" "}
        </Text>
        <Text style={styles.descText}>
          {" "}
          Espèce:{" "}
          {Amos.capitalize(AmosDataFr.amos[amosToCapture.species].species)}{" "}
        </Text>
        <Text style={styles.descText}>
          {" "}
          Niveau: {amosToCapture.level > 1 ? amosToCapture.level : 1}{" "}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttons, styles.buttonKeep]}
          onPress={() => {
            setStatusMess("Capture de l'Amos...");
            setSavingAmos(true);
            keep();
          }}
        >
          <Text style={styles.text}> Garder </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, styles.buttonRelease]}
          onPress={() => {
            release();
          }}
        >
          <Text style={styles.text}> Relâcher </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DisplayResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  item: { textAlign: "center" },
  image: { flex: 1, width: "100%" },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  buttons: {
    width: "50%",
    padding: 12,
    margin: 5,
    borderRadius: 8,
  },
  buttonKeep: {
    backgroundColor: primary_c,
  },
  buttonRelease: {
    backgroundColor: warning_c,
  },
  text: { fontSize: 20, color: "white", textAlign: "center" },
  successInfo: { fontSize: 30 },
  description: {
    flex: 1,
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
  },
  descText: {
    fontSize: 20,
  },
});
