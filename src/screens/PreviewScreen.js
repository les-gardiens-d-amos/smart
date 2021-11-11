import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setCapturedImageAction } from "../app/slices/cameraSlice";
import { colors } from "../style/theme";
import DisplayResultScreen from "./DisplayResultScreen";

const PreviewScreen = ({ image }) => {
  const dispatch = useDispatch();
  const [getInfo, setGetInfo] = useState(false);

  const cancelPicture = () => {
    dispatch(setCapturedImageAction({}));
  };

  if (getInfo) return <DisplayResultScreen />;

  return (
    <View style={styles.container}>
      <View style={styles.screenView}>
        <Image style={styles.img} source={{ uri: image.path }}></Image>
        <View style={styles.imageBackgroundView}>
          <View style={styles.buttonsContainerView}>
            <TouchableOpacity onPress={cancelPicture} style={styles.buttons}>
              <Text style={styles.buttonsText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGetInfo(true)}
              style={styles.buttons}
            >
              <Text style={styles.buttonsText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>      
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenView: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  img: {
    width: "100%",
  },
  imageBackgroundView: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-end",
  },
  buttonsContainerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    width: 130,
    padding: 15,
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.primary_c,
  },
  buttonsText: {
    color: "#fff",
    fontSize: 20,
  },
});
