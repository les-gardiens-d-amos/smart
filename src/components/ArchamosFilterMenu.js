import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Utils } from "../app/Utils";
import AmosData from "../app/data/AmosData.json";
import AmosIconColors from "../app/data/AmosIconColors.json";

import Icon from "react-native-vector-icons/FontAwesome";

import { colors, deviceSize } from "../style/theme";
const { primary_c, secondary_c, warning_c } = colors;

const ArchamosFilterMenu = ({ cbAction, cbClose }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnClose}
        onPress={() => {
          cbClose(false);
        }}
      >
        <Icon name="times" size={20} color={warning_c} />
        <Text style={styles.btnCloseTxt}>Fermer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btns, { backgroundColor: AmosIconColors.mammal }]}
        onPress={() => {
          cbAction(Utils.capitalize(AmosData.types.mammal));
          cbClose(false);
        }}
      >
        <Text style={styles.btnsText}>Mammifères</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btns, { backgroundColor: AmosIconColors.bird }]}
        onPress={() => {
          cbAction(Utils.capitalize(AmosData.types.bird));
          cbClose(false);
        }}
      >
        <Text style={styles.btnsText}>Oiseaux</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btns, { backgroundColor: AmosIconColors.fish }]}
        onPress={() => {
          cbAction(Utils.capitalize(AmosData.types.fish));
          cbClose(false);
        }}
      >
        <Text style={styles.btnsText}>Poissons</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btns, { backgroundColor: AmosIconColors.amphibian }]}
        onPress={() => {
          cbAction(Utils.capitalize(AmosData.types.amphibian));
          cbClose(false);
        }}
      >
        <Text style={styles.btnsText}>Amphibiens</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btns, { backgroundColor: AmosIconColors.reptile }]}
        onPress={() => {
          cbAction(Utils.capitalize(AmosData.types.reptile));
          cbClose(false);
        }}
      >
        <Text style={styles.btnsText}>Reptiles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btns, { backgroundColor: AmosIconColors.invertebrate }]}
        onPress={() => {
          cbAction(Utils.capitalize(AmosData.types.invertebrate));
          cbClose(false);
        }}
      >
        <Text style={styles.btnsText}>Invertebrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ArchamosFilterMenu;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: primary_c,
    width: deviceSize.width * 0.8,
    // height: deviceSize.height,
    // top: deviceSize.height * 0.1,
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnsWrapper: {
    flex: 1,
    width: "90%",
    maxHeight: "30%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btns: {
    width: "90%",
    margin: 6,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  btnsText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  btnClose: {
    backgroundColor: secondary_c,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    margin: 6,
  },
  btnCloseTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    marginLeft: 6,
  },
});
