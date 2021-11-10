import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";

import { API } from "../apis/axios";
import { useSelector } from "react-redux";

import AmosData from "../entities/AmosData.json";

import { colors } from "../style/theme";
const { primary_c, secondary_c } = colors;
import Loader from "../components/CustomActivityLoader";

import AmodexSingle from "../components/AmodexSingle";

const AmodexScreen = () => {
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const registeredAmos = Object.keys(AmosData.amos);
  const [listCaptures, setListCaptures] = useState([]);
  const [statusMess, setStatusMess] = useState("Affichage de l'Amodex...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserCaptures();
  }, []);

  const getUserCaptures = async () => {
    API.get(`amos/find/animal_id/?user_id=${currentUser.playerId}`, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    })
      .then((response) => setListCaptures(response.data.animal_id))
      .catch((error) => console.log("ListCaptures ERROR", error))
      .finally(() => setLoading(false));
  };

  if (loading) return (<Loader message={statusMess} />);

  return (
    <View style={styles.container}>
      <Text style={styles.completion}>
        {listCaptures.length} / {registeredAmos.length}
      </Text>
      <FlatList
        contentContainerStyle={styles.listWrapper}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={registeredAmos}
        keyExtractor={(item) => AmosData.amos[item].id}
        renderItem={({ item }) => {
          return (
            <AmodexSingle
              listCaptures={listCaptures}
              amosData={AmosData.amos[item]}
            />
          );
        }}
      />
    </View>
  );
};

export default AmodexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  completion: {
    width: "30%",
    alignSelf: "center",
    backgroundColor: secondary_c,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    padding: 15,
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  listWrapper: {
    width: "100%",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginBottom: 10,
  },
});
