import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import PreviewScreen from './PreviewScreen';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { useDispatch, useSelector } from 'react-redux';
// import { setCapturedImageAction } from '../store/actions/CameraActions';
import { setCapturedImageAction } from '../app/slices/cameraSlice';

import { colors } from "../style/theme";
const { primary_c } = colors;

const CameraScreen = () => {

  const dispatch = useDispatch();
  const cameraState = useSelector(state => state.cameraSlice);

  const options = {
    base64: true,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 0.5,
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        galleryPermission();
        cameraPermission();
        locationPermission();
      }
    })();
  }, []);


  const galleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need gallery permissions to make this work!');
    }
  }

  const cameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  }

  const locationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need location permissions to make this work!');
    }
  }

  const getLocation = async () => await Location.getCurrentPositionAsync({})
  const dispatchData = async (image) => {
    const location = await getLocation()
    dispatch(setCapturedImageAction({ image: { data: image, path: image.uri }, cameraLocation: { lat: location.coords.latitude, long: location.coords.longitude, altitude: location.coords.altitude, accuracy: location.coords.accuracy } }));
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, options
    });

    if (!result.cancelled) {
      await dispatchData(result)
    }
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync(options)
    await dispatchData(result)
  }

  return (
    <View style={styles.container}>
      {cameraState.capturedImage ? (
        <PreviewScreen image={cameraState.capturedImage} />
      ) : (
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={styles.buttons} onPress={pickImage}><Text style={styles.text}>Galerie</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={takePicture}><Text style={styles.text}>Prendre une photo</Text></TouchableOpacity>
        </View>
      )}

    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
	buttonsWrapper: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'space-around', 
		flexDirection: 'row',
	},
	buttons: {
    backgroundColor: primary_c,
		width: "40%",
		padding: 10,
  },
	text: {
		color: 'white',
		fontSize: 15,
		textAlign: 'center',
    fontWeight: "bold",
	}
})
