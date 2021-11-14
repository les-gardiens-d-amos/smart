import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";

import { menuIcons } from "../../assets/menuIcons";
import { colors } from "../style/theme";
const { primary_c } = colors;

const HomeScreen = ({ navigation, route }) => {
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  console.log("HomeScreen currentUser -", currentUser);

  return (
    <View style={styles.container}>
      <View style={styles.menuBtnRow}>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("CaptureScreen")}
          >
            <Image style={styles.btnIcon} source={menuIcons.capture} />
            <Text style={styles.btnTxt}>Capture</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuBtnRow}>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("ArchamosScreen")}
          >
            <Image style={styles.btnIcon} source={menuIcons.soulStack} />
            <Text style={styles.btnTxt}>Mes Amos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("AmodexScreen")}
          >
            <Image style={styles.btnIcon} source={menuIcons.amodex} />
            <Text style={styles.btnTxt}>Amodex</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuBtnRow}>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("DashboardScreen")}
          >
            <Image style={styles.btnIcon} source={menuIcons.options} />
            <Text style={styles.btnTxt}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuBtnRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnIcon: {
    width: 90,
    height: 90,
  },
  btn: {
    width: 150,
    height: 150,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: primary_c,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
