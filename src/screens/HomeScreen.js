import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@react-native-material/core";

const HomeScreen = ({ navigation, route }) => {
	return (
		<View style={styles.container}>
			<Button
				onPress={() => navigation.navigate("CaptureScreen")}
				title="Capture page"
				color="#841584"
				accessibilityLabel="Capture page"
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
