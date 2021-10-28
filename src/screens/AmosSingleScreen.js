import React from "react";
import { Text, View } from "react-native";

const AmosSingleScreen = ({ route }) => {
  const { amos } = route.params;

  return (
    <View>
      <Text>{amos.name}</Text>
      <Button style={styles.BtnaddRemove} title="Change name"></Button>
    </View>
  );
};

export default AmosSingleScreen;
