import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { icons as amosIcons, soulIcons } from "../../assets/amosIcons";

import Amos from "../entities/Amos";
import amosDataFr from "../entities/AmosDataFr.json";

import { deviceSize } from "../style/theme";

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
      <Text style={styles.speciesName}>
        {Amos.capitalize(amosDataFr.amos[amosData.species].species)}
      </Text>
      <Text style={styles.idAmodex}>{amosData.id}</Text>
    </View>
  );
};

export default AmodexSingle;

const styles = StyleSheet.create({
  amosBox: {
    position: "relative",
    width: deviceSize.width * 0.3,
    height: 70,
    marginTop: 10,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  speciesName: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 14,
    bottom: -16,
    zIndex: 20,
  },
  idAmodex: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 18,
    top: -5,
    right: 6,
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
