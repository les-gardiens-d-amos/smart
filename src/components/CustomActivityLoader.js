import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { colors } from "../style/theme";

const CustomActivityLoader = ({ message }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary_c} />
      <Text style={styles.mess}>{message}</Text>
    </View>
  );
};

export default CustomActivityLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mess: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
