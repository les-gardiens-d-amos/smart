import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

import { colors } from "../style/theme";
const { primary, secondary, tertiary, error } = colors;

const ArchamosScreen = () => {
  
	const [searchInput, setSearchInput] = useState("");

	return (
		<View style={styles.container}>
			<SearchBar
				placeholder="Chercher des Amos..."
				onChangeText={}
				value={searchInput}
			/>


		</View>
	);
};

export default ArchamosScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});
