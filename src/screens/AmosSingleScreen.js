import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header } from "react-native-elements";

import { colors, StatusBarHeight } from "../style/theme";
const { primary_c, secondary_c } = colors;

import Amos from "../entities/Amos";
import archamosData from "../tempData/ArchamosData";

const AmosSingleScreen = ({ navigation, route }) => {
  const { amosData } = route.params;

  const [amos, setAmos] = useState();

  useEffect(() => {
    // Request to get information on this particular amos
    // Stats, how many fights, geoloc etc
    // For now get the amos from the tempData
    const foundAmos = archamosData.find((x) => x.idAmos === amosData.idAmos);

    const cleanAmos = new Amos(
      foundAmos.idAmos,
      foundAmos.idOwner,
      foundAmos.id,
      foundAmos.image_path,
      foundAmos.species,
      foundAmos.type,
      foundAmos.name,
      foundAmos.level,
      foundAmos.date
    ).serialize();

    setAmos(cleanAmos);
  }, []);

  const changeName = () => {
    // Opens up modal with form to modify the name ?
  };

  return (
    <View style={styles.container}>
      {amos && (
        <>
          {/* <Header
            backgroundColor={primary_c}
            placement="center"
            centerComponent={{
              text: `${amos.name}`,
              style: { color: "#fff", fontSize: 20 },
            }}
          /> */}
          <View style={styles.nameWrapper}>
            <Button
              onPress={() => changeName()}
              type="outline"
              icon={<Icon name="edit" size={25} color={primary_c} />}
              buttonStyle={{ border: "none" }}
            />
            <Text style={styles.name}>{amos.name}</Text>
          </View>

          {/* <Pressable style={styles.btnChangeName} onPress={() => changeName()}>
            <Text style={styles.name}>{amos.name}</Text>
          </Pressable> */}

          <Text style={styles.type}>{amos.type}</Text>
          <View style={styles.speciesLvlWrapper}>
            <Text style={styles.level}>{amos.species + " "}</Text>
            de niveau
            <Text style={styles.level}>{" " + amos.level}</Text>
          </View>
          <Text style={styles.date}>{amos.date}</Text>
        </>
      )}
    </View>
  );
};

export default AmosSingleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  btnChangeName: {},
  nameWrapper: {
    paddin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  type: {
    textAlign: "center",
    alignSelf: "center",
    marginTop: 20,
    padding: 30,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 20,
  },
  speciesLvlWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  species: {},
  level: {},
  date: {},
});
