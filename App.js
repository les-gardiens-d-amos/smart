import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import RootStack from "./src/navigators/RootStack";

const App = () => {
  return <RootStack />;
}

const styles = StyleSheet.create({});

export default App;
