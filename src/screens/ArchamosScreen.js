import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Drawer from "react-native-drawer";

import { useSelector, useDispatch } from "react-redux";
import { serviceSetUserAmos } from "../services/archamosService";

import { colors } from "../style/theme";
const { primary_c, error_c } = colors;
import Loader from "../components/CustomActivityLoader";

import ArchamosSingle from "../components/ArchamosSingle";
import AmosSingle from "../components/AmosSingle";
import ArchamosSearchBar from "../components/ArchamosSearchBar";
import ArchamosFilters from "../components/AmosSingle";

const ArchamosScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userSlice);
  const { amosList, amosSingle, filteredList } = useSelector(
    (state) => state.archamosSlice
  );

  const filtersMenu = useRef();
  const [toggleFiltersMenu, setToggleFiltersMenu] = useState(false);
  const [loading, setLoading] = useState("Affichage des Amos...");

  useEffect(() => {
    setUserAmos();
  }, []);

  const setUserAmos = async () => {
    if (amosList.error === undefined && amosList.length === 0) {
      await serviceSetUserAmos(dispatch, currentUser);
    }
    setLoading("");
  };

  const toogleFilters = () => {
    filtersMenu.close();
  };

  if (amosSingle !== null) return <AmosSingle amosSingle={amosSingle} />; // Display single page of the chosen Amos

  if (loading !== "") return <Loader message={loading} />;

  if (amosList.error !== undefined)
    return (
      <View style={styles.container}>
        <Text style={styles.notification}>Une erreur s'est produite</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* <SearchBar
        lightTheme={true}
        style={styles.searchBar}
        placeholder="Chercher des Amos..."
        onChangeText={() => {}}
        value={searchInput}
      /> */}

      {/* <Drawer
        open={toggleFiltersMenu}
        ref={filtersMenu}
        content={<ControlPanel />}
        styles={drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <ArchamosFilters />
      </Drawer> */}

      <ScrollView style={styles.listWrapper}>
        {amosList.error === undefined && amosList.length > 0 ? (
          amosList.map((item) => <ArchamosSingle key={item.id} amos={item} />)
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
  notification: {
    backgroundColor: error_c,
    marginTop: 25,
    padding: 15,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
