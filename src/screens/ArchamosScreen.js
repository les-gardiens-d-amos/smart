import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SearchBar } from "react-native-elements";

import { API } from "../apis/axios";
import { useSelector, useDispatch } from "react-redux";
import { setAmosList } from "../app/slices/archamosSlice";

import { colors } from "../style/theme";
const { primary_c } = colors;
import Loader from "../components/CustomActivityLoader";

import Amos from "../entities/Amos";
import ArchamosSingle from "../components/ArchamosSingle";

const ArchamosScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const amosList = useSelector((state) => state.archamosSlice.amosList);

  const [searchInput, _setSearchInput] = useState("");

  const [statusMess, setStatusMess] = useState("Affichage des Amos...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserInfos();
  }, []);

  const setUserInfos = async () => {
    API.get(`amos/find/user/?user_id=${currentUser.playerId}`, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    })
      .then((response) => {
        setUserAmos(response.data);
      })
      .catch((error) => {
        console.log("Get user Amos ERROR", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setUserAmos = (data) => {
    let newList = [];

    for (const amos of data) {
      let amm = new Amos(amos).serialize();
      newList.push(amm);
    }

    dispatch(setAmosList(newList));
  };

  const goToSinglePage = (amosData) => {
    navigation.navigate("AmosSingleScreen", { amosData });
  };

  if (loading) return <Loader message={statusMess} />;

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
          amosList.map((item) => (
            <ArchamosSingle
              key={item.id}
              amos={item}
              goToSinglePage={goToSinglePage}
            />
          ))
        ) : (
          <Text
            style={{
              marginTop: 25,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
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
