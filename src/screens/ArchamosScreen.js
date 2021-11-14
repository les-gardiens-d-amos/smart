import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SearchBar } from "react-native-elements";

import { API } from "../apis/axios";
import { useSelector, useDispatch } from "react-redux";
import { setAmosList } from "../app/slices/archamosSlice";
import { serviceSetUserAmos } from "../services/archamosService";

import { colors } from "../style/theme";
const { primary_c } = colors;
import Loader from "../components/CustomActivityLoader";

import ArchamosSingle from "../components/ArchamosSingle";
import AmosSingle from "../components/AmosSingle";

const ArchamosScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userSlice);
  const { amosList, amosSingle } = useSelector((state) => state.archamosSlice);

  const [searchInput, _setSearchInput] = useState("");

  const [loading, setLoading] = useState("Affichage des Amos...");

  useEffect(() => {
    setUserAmos();
  }, []);

  const setUserAmos = async () => {
    await serviceSetUserAmos(dispatch, currentUser);
    setLoading("");
  };

  const setSinglePage = (id) => {
    serviceSetAmosSingle(dispatch, amosList, id);
  };

  if (amosSingle !== null) return <AmosSingle amosSingle={amosSingle} />; // Display single page of the chosen Amos

  if (loading !== "") return <Loader message={loading} />;

  return (
    <View style={styles.container}>
      {/* <SearchBar
        lightTheme={true}
        style={styles.searchBar}
        placeholder="Chercher des Amos..."
        onChangeText={() => {}}
        value={searchInput}
      /> */}

      <ScrollView style={styles.listWrapper}>
        {amosList.length > 0 ? (
          amosList.map((item) => (
            <ArchamosSingle
              key={item.id}
              amos={item}
              goToSinglePage={() => setSinglePage(item.id)}
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
