import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import { Modal } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { serviceSetUserAmos } from "../services/archamosService";

import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../style/theme";
const { primary_c, secondary_c, error_c, warning_c } = colors;
import Loader from "../components/CustomActivityLoader";

import ArchamosSingle from "../components/ArchamosSingle";
import AmosSingle from "../components/AmosSingle";
import ArchamosSearchBar from "../components/ArchamosSearchBar";
import ArchamosFilterMenu from "../components/ArchamosFilterMenu";

const ArchamosScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userSlice);
  const { amosList, amosSingle } = useSelector((state) => state.archamosSlice);

  const [modalFilter, setModalFilter] = useState(false);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState("Affichage des Amos...");

  useEffect(() => {
    setUserAmos();
  }, []);

  const setUserAmos = async () => {
    if (amosList.error === undefined) {
      await serviceSetUserAmos(dispatch, currentUser);
    }
    setLoading("");
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

      <TouchableOpacity onPress={setModalFilter} style={styles.btnFilters}>
        <Icon name="list" size={25} color="white" />
        <Text style={styles.btnFiltersTxt}>Filtres</Text>
      </TouchableOpacity>

      {filter !== "" && (
        <TouchableOpacity
          onPress={() => setFilter("")}
          style={styles.chipFilter}
        >
          <Text style={styles.chipFilterTxt}>{filter}</Text>
          <Icon name="times" size={20} color={warning_c} />
        </TouchableOpacity>
      )}

      <ScrollView style={styles.listWrapper}>
        {amosList.error === undefined && amosList.length > 0 ? (
          amosList.map((item) => {
            if (filter !== "") {
              if (item.amos_type.normalize() === filter.normalize()) {
                return <ArchamosSingle key={item.id} amos={item} />;
              }
            } else {
              return <ArchamosSingle key={item.id} amos={item} />;
            }
          })
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

      <Modal
        visible={modalFilter}
        animationType="slide"
        onRequestClose={() => setModalFilter(false)}
      >
        <ArchamosFilterMenu cbAction={setFilter} cbClose={setModalFilter} />
      </Modal>
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
  btnFilters: {
    backgroundColor: primary_c,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    margin: 6,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  btnFiltersTxt: {
    color: "white",
    marginLeft: 6,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  chipFilter: {
    backgroundColor: secondary_c,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 16,
    padding: 6,
    margin: 6,
  },
  chipFilterTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    marginRight: 6,
  },
});
