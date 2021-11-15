import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

const ArchamosSearchBar = () => {
  const [searchInput, _setSearchInput] = useState("");

  return (
    <View>
      <SearchBar
        lightTheme={true}
        style={styles.searchBar}
        placeholder="Chercher des Amos..."
        onChangeText={() => {}}
        value={searchInput}
      />
    </View>
  );
};

export default ArchamosSearchBar;

const styles = StyleSheet.create({});
