import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { menuIcons } from "../../assets/menuIcons";
import { colors } from "../style/theme";
const { primary_c, tertiary_c } = colors;

const HomeScreen = ({ navigation, route }) => {
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  console.log("HomeScreen currentUser -", currentUser);

  return (
    <View style={styles.container}>
      {/* Some header */}

      <View style={styles.navBtnsWrapper}>
        <View style={styles.navBtnWrapper}>
          <Image style={styles.btnIcon} source={menuIcons.amosTitle} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("CaptureScreen")}
          >
            <Text style={styles.btnTxt}>Capture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navBtnWrapper}>
          <Image style={styles.btnIcon} source={menuIcons.amosTitle} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("ArchamosScreen")}
          >
            <Text style={styles.btnTxt}>Mes Amos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navBtnWrapper}>
          <Image style={styles.btnIcon} source={menuIcons.amodex} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("AmodexScreen")}
          >
            <Text style={styles.btnTxt}>Amodex</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navBtnWrapper}>
          <Image style={styles.btnIcon} source={menuIcons.amosTitle} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("DashboardScreen")}
          >
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
    justifyContent: "center",
  },
  navBtnsWrapper: {
    flex: 1,
    width: "100%",
    marginTop: 15,
    alignItems: "center",
  },
  navBtnWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  btnIcon: {
    width: 90,
    height: 90,
  },
  btn: {
    backgroundColor: primary_c,
    color: "#fff",
    width: "65%",
    padding: 10,
    borderColor: tertiary_c,
    borderRadius: 10,
    borderWidth: 2,
  },
  btnTxt: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
});
