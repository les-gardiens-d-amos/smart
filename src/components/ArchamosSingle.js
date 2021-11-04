import React from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../style/theme";
const { primary_c, secondary_c, quaternary_c } = colors;
import { Tooltip } from "react-native-elements";

const ArchamosSingle = ({ amos, goToSinglePage }) => {

  const handleAddRemove = () => {
    // using amosData.idAmos and isTeammate useState variable
    // Add into current team (of 3)
    // If the current team is already full,
    // opens a modal box to choose the amos to replace
    // Remove if added
  };

  // const [isTeammate, setIsTeammate] = useState(amos.isTeammate);

  return (
    <View style={styles.container}>
      <View style={styles.amosContainer}>
        <View style={styles.photoWrapper}>
          <Image
            style={styles.photo}
            source={{
              uri: amos.image_path,
            }}
          />
        </View>

        <Text style={styles.name}>{amos.name}</Text>

        <Text style={styles.species}>{amos.species}</Text>

        <Text style={styles.level}>Niveau: {amos.level}</Text>

        <View
          style={[styles.iconWrapper, { backgroundColor: amos.typeColor }]}
        >
          <Tooltip popover={<Text>{amos.amos_type}</Text>}>
            <Image style={styles.typeIcon} source={amos.icon} />
          </Tooltip>
        </View>

        <Pressable
          style={styles.BtnaddRemove}
          onPress={() => handleAddRemove()}
        >
          <MaterialCommunityIcons name="plus" color="white" size={26} />
          {/* <MaterialCommunityIcons name="minus" color="white" size={26} /> */}
        </Pressable>

        <Pressable
          style={styles.btnDetails}
          onPress={() => goToSinglePage(amos)}
        >
          <Text>Détails</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ArchamosSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  amosContainer: {
    flex: 1,
    minHeight: 150,
    backgroundColor: quaternary_c,
    width: "90%",
    marginTop: 30,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 20,
  },
  photoWrapper: {
    position: "absolute",
    left: -15,
    top: -15,
    borderWidth: 2,
    borderRadius: 10,
    width: 110,
    height: 110,
  },
  photo: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  name: {
    position: "absolute",
    left: 105,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  species: {
    position: "absolute",
    top: 55,
    left: 105,
  },
  level: {
    position: "absolute",
    top: 75,
    left: 105,
  },
  typeIcon: {
    width: 50,
    height: 50,
  },
  iconWrapper: {
    borderWidth: 2,
    borderRadius: 10,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  BtnaddRemove: {
    backgroundColor: primary_c,
    width: 50,
    height: 50,
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDetailsWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnDetails: {
    backgroundColor: secondary_c,
    width: 100,
    height: 30,
    position: "absolute",
    bottom: 10,
    left: 10,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
