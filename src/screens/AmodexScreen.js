import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import amosIcons from "../../assets/amosIcons";

import { colors } from "../style/theme";
const { primary_c } = colors;

const AmodexScreen = () => {
  const [listCaptures, setListCaptures] = useState([1, 2, 5, 12, 15]);
  // request

  return <View style={styles.container}></View>;
};

export default AmodexScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
