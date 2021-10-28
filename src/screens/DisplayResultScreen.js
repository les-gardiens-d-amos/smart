import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from 'react-redux';

import { Divider, Header } from "react-native-elements";

import { CLARIFAI_API_KEY } from "@env";

import { colors } from "../style/theme";
const { primary, secondary, tertiary, error } = colors;

import Amos from "../entities/Amos";

import TestUrls from "../tempData/TestUrls";
import AmosData from "../tempData/AmosData";

const DisplayResultScreen = ({ navigation }) => {
  console.log("DisplayResultScreen load");
  const cameraState = useSelector(state => state.camera);
  const picture = cameraState.capturedImage.data;
  const shortUrl = cameraState.capturedImage.path;

  const [capturing, setCapturing] = useState(true);
  const [conceptList, setConceptList] = useState(null);
  const [amosToCapture, setAmosToCapture] = useState(undefined);

  // const { location, localisation } = route.params;
  // console.log(localisation);

  useEffect(() => {
    capture();
  }, []);

  const capture = async () => {
    const apiKey = `${CLARIFAI_API_KEY}`;
    console.log(apiKey)
    let raw = JSON.stringify({
      inputs: [
        {
          data: {
            image: {
              base64: picture.base64
              // url: TestUrls["cat"],
            },
          },
        },
      ],
    });

    let requestOptions = {
      method: "POST",
      headers: { Authorization: apiKey, "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(' console.log(result)', result)
        const pictureData = JSON.parse(result).outputs[0].data.concepts;

        setConceptList(pictureData);
        checkForExistingAmos(pictureData);
        setCapturing(false);
      })
      .catch((error) => {
        console.log("error", error);
        setCapturing(false);
      });
  };

  const keep = () => {
    console.log("Chosen to keep the captured AMOS", amosToCapture);
    // Place the Amos in the Amos pull of the player
    // geolocalisation stats to register
    // handling image and upload
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
            navigation.navigate("CameraScreen");
          }}
        >
          <Text style={styles.text}> Retourner </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Header
        backgroundColor={primary}
        placement="center"
        centerComponent={{
          text: "Capture",
          style: { color: "#fff", fontSize: 20 },
        }}
      /> */}
      <Image
        style={styles.image}
        source={{
          uri: shortUrl,
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
