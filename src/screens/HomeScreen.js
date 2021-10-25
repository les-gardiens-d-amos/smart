import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@react-native-material/core";
import { Header } from 'react-native-elements';

import { primary_c } from "../style/theme";

const HomeScreen = ({ navigation, route }) => {
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
				color="#841584"
				accessibilityLabel="Capture page"
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
