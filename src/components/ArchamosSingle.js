import React, { useState } from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";

import amosIcons from "../../assets/amosIcons";

import { colors } from "../style/theme";
const {
	primary,
	secondary,
	tertiary,
	error,
	mammal_c,
	bird_c,
	fish_c,
	amphibian_c,
	reptile_c,
	invertebrate_c,
} = colors;

const ArchamosSingle = ({ amos }) => {
	const amosData = amos.item;

	const handleAddRemove = () => {
		console.log("ArchamosSingle handleAddRemove function");
		// using amosData.idAmos
		// Add into current team (of 3)
		// If the current team is already full,
		// opens a modal box to choose the amos to replace
		// Remove if added
	};

	// const [isTeammate, setIsTeammate] = useState(amos.isTeammate);

	return (
		<View style={styles.container}>
			<View style={styles.amosContainer}>
				<View style={styles.photoWrapper}>
					<Image style={styles.photo} source={amosIcons.cat} />

					{/* <Image> */}
					{/* {amosData.url} */}
				</View>

				<Text style={styles.name}>{amosData.name}</Text>

				<Text style={styles.species}>{amosData.species}</Text>

				<Text style={styles.level}>Niveau: {amosData.level}</Text>

				<View style={styles.iconWrapper}>
					<Image style={styles.typeIcon} source={amosIcons.cat} />
				</View>

				<Pressable
					style={styles.BtnaddRemove}
					color={primary}
					onPress={() => handleAddRemove()}
				>
					<Text>+</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default ArchamosSingle;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		// justifyContent: "center",
	},
	amosContainer: {
		flex: 1,
		minHeight: 150,
		backgroundColor: secondary,
		padding: 20,
		alignItems: "center",
		width: "90%",
		marginTop: 30,
		paddingVertical: 8,
		borderWidth: 2,
		borderColor: "#20232a",
		borderRadius: 20,
		backgroundColor: secondary,
		color: "#20232a",
	},
	photoWrapper: {
		position: "absolute",
		left: 10,
		top: -20,
		borderWidth: 2,
		borderRadius: 10,
		width: 110,
		height: 110,
	},
	photo: { width: 110, height: 110 },
	name: {
		position: "absolute",
		left: 125,
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
	},
	species: { position: "absolute", top: 45, left: 125 },
	level: {
		position: "absolute",
		top: 65,
		left: 125,
	},
	typeIcon: {
		width: 50,
		height: 50,
	},
	iconWrapper: {
		borderWidth: 2,
		borderRadius: 10,
		position: "absolute",
		right: 10,
		bottom: 10,
	},
	BtnaddRemove: {
		width: 50,
		height: 50,
		position: "absolute",
		top: 10,
		right: 10,
		borderRadius: 10,
		elevation: 3,
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
	},
});
