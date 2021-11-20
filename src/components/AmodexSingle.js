import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { icons as amosIcons, soulIcons } from "../../assets/amosIcons";

import { Utils } from "../app/Utils";
import AmosData from "../app/data/AmosData.json";

import { deviceSize } from "../style/theme";

const AmodexSingle = ({ listCaptures, amosBase }) => {
  return (
    <View style={styles.amosBox}>
      {listCaptures.includes(amosBase.id) ? (
        <>
          <Image style={styles.typeIcon} source={soulIcons[amosBase.type]} />
          <Image
            style={styles.speciesIcon}
            source={
              amosIcons[amosBase.species] !== undefined
                ? amosIcons[amosBase.species]
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
        {Utils.capitalize(AmosData.amos[amosBase.species].species)}
      </Text>
      <Text style={styles.idAmodex}>{amosBase.id}</Text>
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
