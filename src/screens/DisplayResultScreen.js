import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Divider, Header } from "react-native-elements";

import axios from "axios";

import { CLARIFAI_API_KEY } from "@env";

import { colors } from "../style/theme";
const { primary, secondary, tertiary, error } = colors;

import Amos from "../entities/Amos";

import TestUrls from "../tempData/TestUrls";
import AmosData from "../tempData/AmosData";
import testUrls from "../tempData/TestUrls";

const DisplayResultScreen = ({ navigation, route }) => {
  console.log("DisplayResultScreen load");

  const { picture, shotUrl } = route.params;
  const { location, localisation } = route.params;

  const [capturing, setCapturing] = useState(true);
  const [conceptList, setConceptList] = useState(null);
  const [amosToCapture, setAmosToCapture] = useState(undefined);
  const [imgurPath, setImgurPath] = useState("");

  useEffect(() => {
    capture();
  }, []);

  const capture = async () => {
    const apiKey = `${CLARIFAI_API_KEY}`;

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

    saveAmosImage();
  };

  const saveAmosImage = () => {
    let FormData = require('form-data');
    let requestInfo = new FormData();
    // replace test url by image in base64
    requestInfo.append('image', testUrls["cat"]);
    // replace type of img by base64
    requestInfo.append('type', 'url');

    let config = {
      method: 'post',
      url: 'https://api.imgur.com/3/upload',
      headers: { 
        'Authorization': 'Bearer Client-ID b81cd4b478ce34377f2bc06d1a6ce66b225760a4'
      },
      data : requestInfo
    };

    axios(config).then(response => {
      if (response.data.success && response.data.status === 200) {
        // console.log("image path => ");
        // console.log(response.data.data.link);
        setImgurPath(response.data.data.link);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  const saveAmos = () => {
    let amos = JSON.stringify({
      // replace by user id in secure store
      "user_id": "ae500d19-b07e-4e6f-b1a2-ffabfa7a01d8",
      "animal_id": amosToCapture.id,
      "species": amosToCapture.species,
      "amos_type": amosToCapture.type,
      "name": amosToCapture.name,
      "image_path": imgurPath
    });

    let config = {
      method: 'post',
      url: 'http://localhost:3000/amos',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : amos
    };
    
    axios(config).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });    
  }

  const saveLocation = () => {
    // console.log(location);
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
