import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Header } from "react-native-elements";

import { colors, StatusBarHeight } from "../style/theme";
const { primary_c } = colors;

import dataAmosList from "../tempData/ArchamosData"; // To replace with supabase data
import Amos from "../entities/Amos";
import ArchamosSingle from "../components/ArchamosSingle";

const ArchamosScreen = ({ navigation, route }) => {
  const [searchInput, setSearchInput] = useState("");
  const [amosList, setAmosList] = useState([]);

  useEffect(() => {
    // Populate list with the player's amos with request database
    // Uses temp data for now

    let newList = [];

    for (const amos of dataAmosList) {
      let amm = new Amos(
        amos.idAmos,
        amos.idOwner,
        amos.id,
        amos.image_path,
        amos.species,
        amos.type,
        amos.name,
        amos.level,
        amos.date
      ).serialize();
      newList.push(amm);
    }

    setAmosList(newList);
  }, []);

  // <ActivityIndicator size="large" color={primary} />

  const goToSinglePage = (amosData) => {
    navigation.navigate("AmosSingleScreen", { amosData });
  };

  return (
    <View style={styles.container}>

      <SearchBar
        lightTheme={true}
        style={styles.searchBar}
        placeholder="Chercher des Amos..."
        onChangeText={() => {}}
        value={searchInput}
      />

      <ScrollView style={styles.listWrapper}>
        <FlatList
          style={styles.list}
          keyExtractor={(item, index) => item + index.toString()}
          data={amosList}
          renderItem={(item) => (
            <ArchamosSingle amos={item} goToSinglePage={goToSinglePage} />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ArchamosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBarHeight + 30,
    width: "100%",
    height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  searchBar: {},
  listWrapper: {
    marginBottom: 15,
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
