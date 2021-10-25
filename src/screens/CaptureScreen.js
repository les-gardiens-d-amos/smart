import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";
import { Header } from 'react-native-elements';

import { primary_c } from "../style/theme";

import * as Location from 'expo-location';

const CaptureScreen = ({ navigation, route }) => {
  console.log("CaptureScreen load");

  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);

  const cam = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === "granted");
      manageLocationPermission();
    })();
  }, []);

  const manageLocationPermission = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status === "granted");
		if (status === "granted") {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    }
	}

  const takeShot = async () => {
    const option = { quality: 0.5, base64: true, skipProcessing: false };
    const picture = await cam.current.takePictureAsync(option);
    navigation.navigate("DisplayResultScreen", {
      picture,
      shotUrl: picture.uri,
      localisation: location
    });
  };

  if (cameraPermission === null) {
    return <View />;
  }

  if (cameraPermission === false) {
    return <Text>No access to camera !</Text>;
  }

  if (locationPermission === false) {
    return <Text>No access to location !</Text>
  }

  return (
    <View style={styles.container}>
      <Header
				backgroundColor={primary_c}
				placement="center"
				centerComponent={{ text: 'Capture', style: { color: '#fff', fontSize: 20 } }}
			/>
      <Camera ref={cam} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              takeShot();
            }}
          >
            <Text style={styles.text}> Capture </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    width: "50%",
    height: 40,
    padding: 12,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "grey",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
});

export default CaptureScreen;
