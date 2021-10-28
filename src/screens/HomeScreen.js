import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@react-native-material/core";
import { Header } from "react-native-elements";

import { colors } from "../style/theme";
const { primary_c } = colors;

const HomeScreen = ({ navigation, route }) => {
  // SecureStore.getItemAsync("jwt").then(response => console.log(response));

  return (
    <View style={styles.container}>
      <View style={styles.buttonsWrapper}>
        <Button
          style={styles.buttons}
          onPress={() => navigation.navigate("CaptureScreen")}
          title="Capture page"
          color={primary_c}
          accessibilityLabel="Capture"
        />
        <Button
          style={styles.buttons}
          onPress={() => navigation.navigate("ArchamosScreen")}
          title="Archamos"
          color={primary_c}
          accessibilityLabel="Archamos"
        />
        <Button
          style={styles.buttons}
          onPress={() => navigation.navigate("DashboardScreen")}
          title="Tableau de bord"
          color={primary_c}
          accessibilityLabel="Dashboard"
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  buttonsWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  buttons: {
    width: "50%",
    marginTop: 20,
  },
});
