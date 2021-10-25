import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";

import { colors } from "../style/theme";
const { primary, secondary, tertiary, error } = colors;

import dataAmosList from "../tempData/ArchamosData"; // To replace with supabase data
import Amos from "../entities/Amos";
import ArchamosSingle from "../components/ArchamosSingle";

const ArchamosScreen = () => {
	const [searchInput, setSearchInput] = useState("");
	const [amosList, setAmosList] = useState([]);

	useEffect(() => {
		// Populate list with the player's amos with request database
		// Uses temp data for now

		let newList = [];

		for (const amos of dataAmosList) {
			let amm = new Amos(
				amos.idAmos,
				amos.idOwner,
				amos.id,
				amos.species,
				amos.type,
				amos.name,
				amos.level,
				amos.date
			).serialize();

			console.log(amm);
			newList.push(amm);
		}

		setAmosList(newList);
	}, []);

	// <ActivityIndicator size="large" color={primary} />

	return (
		<View style={styles.container}>
			<SearchBar
				style={styles.searchBar}
				placeholder="Chercher des Amos..."
				onChangeText={() => {}}
				value={searchInput}
			/>

			<View>
				<FlatList
					style={styles.list}
					data={amosList}
					renderItem={(item) => <ArchamosSingle amos={item} />}
				/>
			</View>
		</View>
	);
};

export default ArchamosScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		// alignItems: "center",
		// justifyContent: "center",
	},
	searchBar: { marginTop: 15 },
	list: {
		flex: 1,
		width: "100%",
	},
});
