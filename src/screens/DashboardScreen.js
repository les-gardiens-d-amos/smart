import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { serviceLogout } from "../services/user";

import { Button as ButtonEle } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { colors } from "../style/theme";
const { primary_c, tertiary_c } = colors;

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const changeName = async (inputValue) => {
    // let data = { name: inputValue };
    // API.put(`amos/update/name?id=${amos.id}`, data, {
    //   headers: { Authorization: "Bearer " + userToken },
    // })
    //   .then((response) => {
    //     setAmosName(inputValue);
    //   }) // Refreseh the page single with the new name
    //   .catch((error) => console.log("changeName put error", error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.infosWrapper}>
        <ButtonEle
          type="clear"
          onPress={() => {}}
          icon={<Icon name="edit" size={25} color={primary_c} />}
          buttonStyle={styles.renameBtn}
        />
        <Text style={styles.infosTxt}>{currentUser.playerName}</Text>
      </View>
      <View style={styles.btnWrapper}>
        {/* <Image style={styles.btnIcon} source={menuIcons.options} /> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => serviceLogout(dispatch)}
        >
          <Text style={styles.btnTxt}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  infosWrapper: {
    width: "80%",
  },
  infosTxt: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnWrapper: {},
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
