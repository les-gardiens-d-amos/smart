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
import ChangePassModal from "../components/ChangePassModal";

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

  const [notification, setNotification] = useState("");

  const changeName = (userInput) => {
    serviceChangeName(dispatch, currentUser, userInput);
  };
  const changeMail = (userInput) => {
    serviceChangeMail(dispatch, currentUser, userInput);
  };
  const changePassword = async (oldPass, newPass) => {
    const changedPassword = await serviceChangePassword(
      currentUser,
      oldPass,
      newPass
    );
    if (changedPassword.error !== undefined) {
      setNotification(
        "Une erreur s'est produite, vérifiez que les informations entrées soient bien correctes"
      );
    }
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
        <ChangePassModal
          title={"Changer le mot de passe"}
          cMin={3}
          placeholder={""}
          cbAction={changePassword}
          cbClose={setModalPassword}
        />
      </Modal>
      <View style={styles.infosWrapper}>
        {notification !== "" && (
          <Text style={styles.notification}>{notification}</Text>
        )}
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
        {/* <View style={styles.nameWrapper}>
          <ButtonIcon
            type="clear"
            onPress={() => setModalPassword(true)}
            icon={<Icon name="lock" size={25} color={primary_c} />}
            buttonStyle={styles.renameBtn}
          />
          <Text style={styles.nameTxt}>Mot de passe</Text>
        </View> */}
      </View>

      {/* <ButtonIcon
        type="clear"
        onPress={() => navigation.navigate("ChartScreen")}
        icon={<Icon name="pie-chart" size={30} color={"maroon"} />}
        buttonStyle={styles.chartBtn}
      /> */}

      <View style={styles.btnsWrapper}>
        {/* <Image style={styles.btnIcon} source={menuIcons.options} /> */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => serviceLogout(dispatch)}
        >
          <View style={styles.btnsTxtWrapper}>
            <Icon name="sign-out" size={35} color="white" />
            <Text style={styles.btnsTxt}>Se déconnecter</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => closeAccount(dispatch)}
        >
          <View style={styles.btnsTxtWrapper}>
            <Icon name="ban" size={35} color="white" />
            <Text style={styles.btnsTxt}>Supprimer le compte</Text>
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
    // position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notification: {
    color: "#fff",
    backgroundColor: error_c,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
  },
  infosWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  renameBtn: {
    marginRight: 5,
  },
  btnsWrapper: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    width: "100%",
    backgroundColor: primary_c,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  btnsTxt: {
    color: "#fff",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  btnsTxtWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  deleteBtn: {
    width: "100%",
    backgroundColor: error_c,
    margin: 5,
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
