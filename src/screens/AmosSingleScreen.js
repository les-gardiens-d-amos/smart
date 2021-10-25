import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AmosSingleScreen = ({ navigation, route }) => {
	const { amos } = route.params;

	return (
		<View>
			<Text>{amos.name}</Text>
			<Button style={styles.BtnaddRemove} title="Change name"></Button>
		</View>
	);
};

export default AmosSingleScreen;

const styles = StyleSheet.create({});
