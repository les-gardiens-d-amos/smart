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

import { API } from "../apis/axios";
import { useSelector, useDispatch } from "react-redux";
import { serviceLogout } from "../services/user";
import { changeName } from "../app/slices/userSlice";
import { logoutUser } from "../app/slices/userSlice";

import RenameModal from "../components/RenameModal";

import { colors } from "../style/theme";
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

  const changeName = async (inputValue) => {
    try {
      const data = { name: inputValue };

      const response = await API.put(`users/${currentUser.playerId}`, data, {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      });

      if (response.status === 200) {
        dispatch(changeName(inputValue)); // Refreshes this component with the new name
      }
    } catch (error) {
      console.error("User changeName error -", error);
    }
  };

  const changeMail = async (inputValue) => {
    try {
      // Check if mail form
      const data = { email: inputValue };

      const response = await API.put(`users/${currentUser.playerId}`, data, {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      });

      if (response.status === 200) {
        dispatch(changeMail(inputValue)); // Refreshes this component with the new name
      }
    } catch (error) {
      console.error("User changeName error -", error);
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
          onPress: async () => {
            API.delete(`users/${currentUser.playerId}`, {
              headers: { Authorization: "Bearer " + currentUser.playerToken },
            })
              .then((response) => {
                dispatch(logoutUser());
              })
              .catch((error) => console.log("User delete error", error));
          },
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
          placeholder={currentUser.playerMail}
          cbAction={changeMail}
          cbClose={setModalMail}
        />
      </Modal>

      <ButtonIcon
        type="clear"
        onPress={() => navigation.navigate("ChartScreen")}
        icon={<Icon name="pie-chart" size={30} color={"maroon"} />}
        buttonStyle={styles.chartBtn}
      />

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
      <View style={styles.logoutBtnWrapper}>
        {/* <Image style={styles.btnIcon} source={menuIcons.options} /> */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => serviceLogout(dispatch)}
        >
          <Text style={styles.logoutBtnTxt}>Se déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => closeAccount(dispatch)}
        >
          <Text style={styles.logoutBtnTxt}>Supprimer le compte</Text>
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
    justifyContent: "space-around",
  },
  nameWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameTxt: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  renameBtn: {
    margin: 5,
  },
  logoutBtnWrapper: {},
  logoutBtn: {
    backgroundColor: primary_c,
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
  deleteBtn: {
    backgroundColor: error_c,
    margin: 10,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
  },
  deleteBtntxt: {},
  chartBtn: {},
});
