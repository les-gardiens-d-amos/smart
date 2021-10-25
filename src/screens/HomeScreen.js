import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@react-native-material/core";

import { colors } from "../style/theme";
const { primary, secondary, tertiary, error } = colors;

const HomeScreen = ({ navigation, route }) => {
	return (
		<View style={styles.container}>
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
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
