import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { Header } from 'react-native-elements';

import { primary_c } from "../style/theme";

import * as SecureStore from 'expo-secure-store';

import { colors } from "../style/theme";
const { primary, secondary, tertiary, error } = colors;

const HomeScreen = ({ navigation, route }) => {
	// console.log("store : ");
	// SecureStore.getItemAsync("jwt").then(response => console.log(response));

	return (
		<View style={styles.container}>
			<Header
				backgroundColor={primary_c}
				placement="center"
				centerComponent={{ text: 'Home', style: { color: '#fff', fontSize: 20 } }}
			/>
			<Button
				onPress={() => navigation.navigate("CaptureScreen")}
				title="Capture page"
				color={primary}
				accessibilityLabel="Capture page"
			/>
			<Button
				onPress={() => navigation.navigate("ArchamosScreen")}
				title="Archamos"
				color={primary}
				accessibilityLabel="Archamos"
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	}
});
