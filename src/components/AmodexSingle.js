import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { icons as amosIcons, soulIcons } from "../../assets/amosIcons";

const AmodexSingle = ({ listCaptures, amosData }) => {
  return (
    <View style={styles.amosBox}>
      {listCaptures.includes(amosData.id) ? (
        <>
          <Image style={styles.typeIcon} source={soulIcons[amosData.type]} />
          <Image
            style={styles.speciesIcon}
            source={
              amosIcons[amosData.species] !== undefined
                ? amosIcons[amosData.species]
                : amosIcons.default
            }
          />
        </>
      ) : (
        <>
          <Image style={styles.typeIcon} source={soulIcons.default} />
        </>
      )}
      <Text style={styles.idAmodex}>{amosData.id}</Text>
    </View>
  );
};

export default AmodexSingle;

const styles = StyleSheet.create({
  amosBox: {
    position: "relative",
    width: 70,
    height: 70,
    padding: 2,
    margin: 2,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  idAmodex: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 18,
    bottom: -17,
    right: 2,
    zIndex: 20,
  },
  typeIcon: {
    position: "absolute",
    width: 110,
    height: 110,
  },
  speciesIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 2,
    zIndex: 10,
  },
});