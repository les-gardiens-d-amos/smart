import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";

import { API } from "../store/axios";

import { colors } from "../style/theme";
const { primary_c } = colors;

import Amos from "../entities/Amos";
import ArchamosSingle from "../components/ArchamosSingle";
import * as SecureStore from "expo-secure-store";

const ArchamosScreen = ({ navigation }) => {
  const [searchInput, _setSearchInput] = useState("");
  const [amosList, setAmosList] = useState([]);

  const [statusMess, setStatusMess] = useState("Affichage des Amos...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserInfos();
  }, []);

  const setUserInfos = async () => {
    const uid = await SecureStore.getItemAsync("user_id");
    const jwt = await SecureStore.getItemAsync("jwt");
    API.get(`amos/find/user/?user_id=${uid}`, {
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((response) => {
        setUserAmos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Get user Amos ERROR", error);
      });
  };

  const setUserAmos = (data) => {
    let newList = [];

    for (const amos of data) {
      let amm = new Amos(amos).serialize();
      newList.push(amm);
    }

    setAmosList(newList);
  };

  const goToSinglePage = (amosData) => {
    navigation.navigate("AmosSingleScreen", { amosData });
  };

  if (loading) {
    return (
      <View style={[styles.container, { marginTop: 20 }]}>
        <ActivityIndicator size="large" color={primary_c} />
        <Text style={{ textAlign: "center" }}>{statusMess}</Text>
      </View>
    );
  }

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
					amosList.map(item => ( <ArchamosSingle key={item.id} amos={item} goToSinglePage={goToSinglePage} />))
        ) : (
          <Text style={{ textAlign: "center" }}>
            Vous n'avez pas encore d'amos
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ArchamosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {},
  listWrapper: {
    marginBottom: 15,
  },
  list: {
    flex: 1,
  },
});
