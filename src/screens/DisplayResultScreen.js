import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { API, CLARIFAI, IMGUR } from "../store/axios";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";

import { colors } from "../style/theme";
const { primary_c, warning_c } = colors;

import { content } from "../../locales/fr"
import TestUrls from "../tempData/TestUrls";
import AmosData from "../tempData/AmosData";

const DisplayResultScreen = ({ navigation }) => {
  const cameraState = useSelector((state) => state.camera);

  const picture = cameraState.capturedImage.data;
  const shortUrl = cameraState.capturedImage.path;
  const localisation = cameraState.cameraLocation;

  const [statusMess, setStatusMess] = useState("Analyse de la capture...");

  const [capturing, setCapturing] = useState(true);
  const [savingAmos, setSavingAmos] = useState(false);
  const [captureSuccess, setCaptureSuccess] = useState(false);

  const [amosToCapture, setAmosToCapture] = useState(undefined);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    getUserId();
    getUserToken();
  }, []);

  const getUserId = () => {
    SecureStore.getItemAsync("user_id").then((response) => {
      setUserId(response);
    });
  };

  const getUserToken = () => {
    SecureStore.getItemAsync("jwt").then((response) => {
      setUserToken(response);
      capture();
    });
  };

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
        setCapturing(false);
      })
      .catch((error) => {
        console.log("CLARIFAI.post error", error);
      })
      .finally(() => {
        setCapturing(false);
      });
  };

  const keep = () => {
    // console.log("Chosen to keep the captured AMOS", amosToCapture);
    saveAmosImage();
  };

  const saveAmosImage = () => {
    let FormData = require("form-data");
    let requestInfo = new FormData();
    // replace test url by image in base64
    // requestInfo.append('image', testUrls["cat"]);
    // // replace type of img by base64
    // requestInfo.append('type', 'url');
    requestInfo.append("image", picture.base64);
    // replace type of img by base64
    requestInfo.append("type", "base64");

    IMGUR.post("", requestInfo)
      .then((response) => {
        if (response.data.success && response.data.status === 200) {
          saveAmos(response.data.data.link);
        }
      })
      .catch((error) => console.log("IMGUR.post", error));
  };

  const saveAmos = (imgPath) => {
    let amos = JSON.stringify({
      user_id: userId,
      animal_id: amosToCapture.id,
      species: amosToCapture.species,
      amos_type: amosToCapture.type,
      name: amosToCapture.name,
      image_path: imgPath,
    });

    API.post("amos", amos, {
      headers: { Authorization: "Bearer " + userToken },
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
      headers: { Authorization: "Bearer " + userToken },
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
    let foundAmos = undefined;
    // Search for an existing Amos in the list of registered Amos, for now it's just a dictionary
    for (const item of pictureData) {
      if (item.value > 0.9) {
        foundAmos = AmosData[item.name]; // Check if the Amos exists and return the data if so
        if (foundAmos) break; // Yes, ugly, but temporary
      }
    }

    if (foundAmos) {
      setAmosToCapture(foundAmos);
      // Move to another screen to fight the AMOS and try to capture it ?
    }
  };

  if (captureSuccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.successInfo}>Bravo, vous avez capturé un Amos de l'espèce {content.species[amosToCapture.species]}! Numéro d'Archamos: {amosToCapture.id}  </Text>
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
        <Text>{statusMess} </Text>
      </View>
    );
  }

  if (!amosToCapture) {
    return (
      <View style={styles.container}>
        <Text>Aucun Amos existant n'a été reconnu.</Text>
        <TouchableOpacity
          style={(styles.buttons, styles.buttonRelease)}
          onPress={() => {
            // navigation.navigate("CaptureScreen"); Not working
          }}
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
        <Text style={styles.descText}> Type: {content.types[amosToCapture.type]} </Text>
        <Text style={styles.descText}> Espèce: {content.species[amosToCapture.species]} </Text>
        <Text style={styles.descText}> Niveau: {amosToCapture.level} </Text>
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
  successInfo: { fontSize: 30, },
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
