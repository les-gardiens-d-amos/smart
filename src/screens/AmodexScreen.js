import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { API } from "../store/axios";
import * as SecureStore from "expo-secure-store";

import AmosData from "../entities/AmosData.json";
import amosIcons from "../../assets/amosIcons";

import { colors } from "../style/theme";
const { primary_c } = colors;

const AmodexScreen = () => {
  const [listCaptures, setListCaptures] = useState([1, 2, 5, 12, 15]);
  const [statusMess, setStatusMess] = useState("Affichage de l'Amodex...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserCaptures();
  }, []);

  const getUserCaptures = async () => {
    const uid = await SecureStore.getItemAsync("user_id");
    const jwt = await SecureStore.getItemAsync("jwt");
    API.get(`amos/find/animal_id/?user_id=${uid}`, {
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((response) => {
        setListCaptures(response.data.animal_id);
      })
      .catch((error) => {
        console.log("Get user captures ERROR", error);
      })
      .finally(() => setLoading(false));
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
      <Text>Lenght listCaptures - {listCaptures.length}</Text>
      <Text>
        Lenght Object.keys(AmosData.amos) - {Object.keys(AmosData.amos).length}
      </Text>
      <ScrollView style={styles.listWrapper}>
        {Object.keys(AmosData.amos).map((lKey) => {
          return (
            <View key={AmosData.amos[lKey].id}>
              <Text>{AmosData.amos[lKey].species} {listCaptures.includes(AmosData.amos[lKey].id) ? " O" : " X"}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AmodexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
		textAlign: "center"
	},
});
