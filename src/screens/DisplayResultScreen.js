import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { API, CLARIFAI, IMGUR } from "../../locales/axios";
import * as SecureStore from "expo-secure-store";

import { CLARIFAI_API_KEY, IMGUR_KEY } from "@env";

import { colors } from "../style/theme";
const { primary, error } = colors;

import TestUrls from "../tempData/TestUrls";
import AmosData from "../tempData/AmosData";
import testUrls from "../tempData/TestUrls";

const DisplayResultScreen = ({ navigation, route }) => {
  console.log("DisplayResultScreen load");

  const { shotUrl } = route.params;
  const { localisation } = route.params;

  const [capturing, setCapturing] = useState(true);
  const [_conceptList, setConceptList] = useState(null);
  const [amosToCapture, setAmosToCapture] = useState(undefined);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    getUserId();
    getUserToken();
  }, []);

  const getUserId = () => {
    SecureStore.getItemAsync("user_id").then(response => {
      setUserId(response);
    });
  }

  const getUserToken = () => {
    SecureStore.getItemAsync("jwt").then(response => {
      setUserToken(response)
      capture();
    });
  }

  const capture = async () => {

    let raw = JSON.stringify({
      inputs: [
        {
          data: {
            image: {
              // base64: picture.base64,
              url: TestUrls["cat"],
            },
          },
        },
      ],
    });

    CLARIFAI.post('', raw)
    .then(response => {
      const pictureData = response.data.outputs[0].data.concepts;
      setConceptList(pictureData);
      checkForExistingAmos(pictureData);
      setCapturing(false);
     })
    .catch(error => {
      console.log("CLARIFAI.post error", error);
      setCapturing(false);
    })
  };

  const keep = () => {
    console.log("Chosen to keep the captured AMOS", amosToCapture);
    saveAmosImage();
  };

  const saveAmosImage = () => {
    let FormData = require('form-data');
    let requestInfo = new FormData();
    // replace test url by image in base64
    requestInfo.append('image', testUrls["cat"]);
    // replace type of img by base64
    requestInfo.append('type', 'url');

    IMGUR.post('', requestInfo)
    .then(response => {
      if (response.data.success && response.data.status === 200) {
        saveAmos(response.data.data.link);
      }
    })
    .catch(error => console.log("IMGUR.post", error))
  }

  const saveAmos = (imgPath) => {
    let amos = JSON.stringify({
      "user_id": userId,
      "animal_id": amosToCapture.id,
      "species": amosToCapture.species,
      "amos_type": amosToCapture.type,
      "name": amosToCapture.name,
      "image_path": imgPath
    });

    API.post('amos', amos, {
      headers: { 'Authorization': 'Bearer ' + userToken, }
    })
    .then(response => { saveLocation(response.data.id); })
    .catch(error => console.log("API.post amos", error))
  }

  const saveLocation = (idAmos) => {
    let coords = localisation.coords;
    let coordInfo = JSON.stringify({
      "long": coords.longitude,
      "lat": coords.latitude,
      "altitude": coords.altitude,
      "accuracy": coords.accuracy,
      "amos_id": idAmos
    });

    API.post('catches', coordInfo, {
      headers: { 'Authorization': 'Bearer ' + userToken, }
    })
    .then(response => { console.log(response.data); })
    .catch(error => console.log(error))
  }

  const release = () => {
    console.log("Chosen to realease the AMOS");
    // Ignore the Amos and the shot then redirect to the capture camera
  };

  const checkForExistingAmos = (pictureData) => {
    let foundAmos = undefined;
    // Search for an existing Amos in the list of registered Amos, for now it's just a dictionary
    for (const item of pictureData) {
      if (item.value > 0.9) {
        console.log("item.name with ratio > 0.9", item.name);
        foundAmos = AmosData[item.name]; // Check if the Amos exists and return the data if so
        if (foundAmos) break; // Yes, ugly, but temporary
      }
    }

    if (foundAmos) {
      console.log("AMOS found!", foundAmos);
      setAmosToCapture(foundAmos);
      // Move to another screen to fight the AMOS and try to capture it ?
    } else {
      console.log("No valid Amos was found...");
    }
  };

  if (capturing) {
    // Loading icon to add
    return (
      <View style={styles.container}>
        <Text>Capturing amos...</Text>
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
            navigation.navigate("CaptureScreen");
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
          uri: shotUrl,
        }}
      />

      <View style={styles.description}>
        <Text style={styles.descText}> Numéro: {amosToCapture.id} </Text>
        <Text style={styles.descText}> Type: {amosToCapture.type} </Text>
        <Text style={styles.descText}> Espèce: {amosToCapture.species} </Text>
        <Text style={styles.descText}> Level: {amosToCapture.level} </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttons, styles.buttonKeep]}
          onPress={() => {
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
    height: 40,
    padding: 12,
    margin: 5,
    borderRadius: 8,
  },
  buttonKeep: {
    backgroundColor: primary,
  },
  buttonRelease: {
    backgroundColor: error,
  },
  text: { fontSize: 20, color: "white", textAlign: "center" },
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
