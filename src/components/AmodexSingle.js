import React from "react";
import { StyleSheet, Text, View, Tooltip, Image } from "react-native";
import { icons as amosIcons, soulIcons } from "../../assets/amosIcons";

const AmodexSingle = ({ listCaptures, amosData }) => {
  return (
    <View style={styles.amosBox}>
      <Text>{amosData.species}</Text>
      <Text>{listCaptures.includes(amosData.id) ? " O" : " X"}</Text>
      {/* {listCaptures.includes(amosData.id) ? (
        <Tooltip popover={<Text>{amosData.type}</Text>}>
          <Image style={styles.typeIcon} source={soulIcons[amosData.type]} />
          <Image
            style={styles.speciesIcon}
            source={amosIcons[amosData.species]}
          />
        </Tooltip>
      ) : (
        <Image style={styles.typeIcon} source={soulIcons.default} />
      )} */}
    </View>
  );
};

export default AmodexSingle;

const styles = StyleSheet.create({
  amosBox: {
    width: 70,
    height: 70,
    margin: 2,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  typeIcon: {
    width: 70,
    height: 70,
  },
  speciesIcon: {
    width: 60,
    height: 60,
    zIndex: 10,
  },
});
