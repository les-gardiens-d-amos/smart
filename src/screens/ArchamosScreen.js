import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList, Text } from "react-native";
import { SearchBar } from "react-native-elements";

import { API } from "../store/axios";

import dataAmosList from "../tempData/ArchamosData"; // To replace with supabase data
import Amos from "../entities/Amos";
import ArchamosSingle from "../components/ArchamosSingle";
import * as SecureStore from "expo-secure-store";

const ArchamosScreen = ({ navigation }) => {
  console.log("ArchamosScreen load");

  const [searchInput, _setSearchInput] = useState("");
  const [amosList, setAmosList] = useState([]);

  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    setUserInfos();
  }, []);

  const setUserInfos = async () => {
    console.log("setUserInfos");
    const uid = await SecureStore.getItemAsync("user_id");
    setUserId(uid);
    const jwt = await SecureStore.getItemAsync("jwt");
    setUserToken(jwt);
    API.get(`amos/find/user/?user_id=${uid}`, {
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((response) => {
        console.log("RESPONSE DATA", response.data);
        setUserAmos(response.data);
      })
      .catch((error) => {
        console.log("amos/find/user/?user_id= ERROR", error);
      });
  };

  useEffect(() => {
    // Populate list with the player's amos with request database
    // Uses temp data for now
    // let newList = [];
    // for (const amos of dataAmosList) {
    //   let amm = new Amos(amos).serialize();
    //   newList.push(amm);
    // }
  }, []);

  const setUserAmos = (data) => {
    let newList = [];

    for (const amos of data) {
      let amm = new Amos(amos).serialize();
      newList.push(amm);
    }

    console.log("Set up newList", newList);
    setAmosList(newList);
  };

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
        {amosList.length > 0 ? (
          <FlatList
            style={styles.list}
            keyExtractor={(item, index) => item + index.toString()}
            data={amosList}
            renderItem={(item) => (
              <ArchamosSingle amos={item} goToSinglePage={goToSinglePage} />
            )}
          />
        ) : (
          <Text>Vous n'avez pas encore d'amos</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ArchamosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
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
