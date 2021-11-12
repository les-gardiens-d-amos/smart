import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Button as ButtonIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { useSelector, useDispatch } from "react-redux";
import {
  serviceChangeName,
  serviceChangeMail,
  serviceChangePassword,
  serviceLogout,
  serviceDelete,
} from "../services/user";

import RenameModal from "../components/RenameModal";

import { colors, deviceSize } from "../style/theme";
const { primary_c, tertiary_c, error_c } = colors;

// Update infos api
// let data = {
//   "name":"toto-man",
//   "email":"toto-man@gmail.com",
//   "password":"totototo"
// };

// let config = {
//   method: 'put',
//   url: 'https://happy-amos.herokuapp.com/',
//   headers: {
//     'Authorization': 'Bearer <JWT_TOKEN>',
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.currentUser);

  const [modalRename, setModalRename] = useState(false);
  const [modalMail, setModalMail] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  const changeName = (userInput) => {
    serviceChangeName(dispatch, currentUser, userInput);
  };
  const changeMail = (userInput) => {
    serviceChangeMail(dispatch, currentUser, userInput);
  };
  const changePassword = (lastPassword, userInput) => {
    serviceChangePassword(currentUser, lastPassword, userInput);
  };

  const closeAccount = () => {
    Alert.alert(
      "Fermer le compte",
      "Etes-vous sûr de vouloir fermer ce compte ? Il sera supprimé de façon permanente.",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel account suppression"),
          style: "cancel",
        },
        {
          text: "SUPPRIMER",
          onPress: () => serviceDelete(dispatch, currentUser),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalRename}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalRename(false)}
      >
        <RenameModal
          title={"Changer le nom"}
          cMin={3}
          cMax={10}
          placeholder={currentUser.playerName}
          cbAction={changeName}
          cbClose={setModalRename}
        />
      </Modal>
      <Modal
        visible={modalMail}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalMail(false)}
      >
        <RenameModal
          title={"Changer l'Email"}
          cMin={3}
          cMax={255}
          placeholder={currentUser.playerMail}
          cbAction={changeMail}
          cbClose={setModalMail}
        />
      </Modal>
      <Modal
        visible={modalPassword}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalPassword(false)}
      >
        <RenameModal
          title={"Changer le mot de passe"}
          cMin={3}
          placeholder={""}
          cbAction={changePassword}
          cbClose={setModalPassword}
        />
      </Modal>

      <View style={styles.nameWrapper}>
        <ButtonIcon
          type="clear"
          onPress={() => setModalRename(true)}
          icon={<Icon name="edit" size={25} color={primary_c} />}
          buttonStyle={styles.renameBtn}
        />
        <Text style={styles.nameTxt}>{currentUser.playerName}</Text>
      </View>
      <View style={styles.nameWrapper}>
        <ButtonIcon
          type="clear"
          onPress={() => setModalMail(true)}
          icon={<Icon name="edit" size={25} color={primary_c} />}
          buttonStyle={styles.renameBtn}
        />
        <Text style={styles.nameTxt}>{currentUser.playerMail}</Text>
      </View>
      <View style={styles.nameWrapper}>
        <ButtonIcon
          type="clear"
          onPress={() => setModalPassword(true)}
          icon={<Icon name="lock" size={25} color={primary_c} />}
          buttonStyle={styles.renameBtn}
        />
        <Text style={styles.nameTxt}>Mot de passe</Text>
      </View>

      <ButtonIcon
        type="clear"
        onPress={() => navigation.navigate("ChartScreen")}
        icon={<Icon name="pie-chart" size={30} color={"maroon"} />}
        buttonStyle={styles.chartBtn}
      />

      <View style={styles.logoutBtnWrapper}>
        {/* <Image style={styles.btnIcon} source={menuIcons.options} /> */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => serviceLogout(dispatch)}
        >
          <View style={styles.btnsTxtWrapper}>
            <Icon name="sign-out" size={60} color="white" />
            <Text style={styles.logoutBtnTxt}>Se déconnecter</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => closeAccount(dispatch)}
        >
          <View style={styles.btnsTxtWrapper}>
            <Icon name="ban" size={50} color="white" />
            <Text style={styles.logoutBtnTxt}>Supprimer le compte</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameTxt: {
    width: "50%",
    fontSize: 20,
    fontWeight: "bold",
  },
  renameBtn: {
    margin: 5,
  },
  logoutBtnWrapper: {},
  logoutBtn: {
		width: "95%",
    backgroundColor: primary_c,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  logoutBtnTxt: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  btnsTxtWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  deleteBtn: {
		width: "95%",
    backgroundColor: error_c,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  deleteBtntxt: {},
  chartBtn: {
    // position: "absolute",
    // top: deviceSize.height * 0.2,
  },
});
