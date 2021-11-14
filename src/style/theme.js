import Constants from "expo-constants";
import { Dimensions } from "react-native";

export const colors = {
  primary_c: "#495E78",
  secondary_c: "#67697C",
  tertiary_c: "#969696",
  quaternary_c: "#B79D94",
  warning_c: "#DDB771",
  error_c: "#A30B37",
  success_c: "#5cd65c",
  // quinary: "#B79D94",
  // senary: "#B79D94",

  mammal_c: "#F887B0",
  bird_c: "#7EDCE6",
  fish_c: "#3289F6",
  amphibian_c: "#63BC55",
  reptile_c: "#2D8159",
  invertebrate_c: "#783BB6",
};

export const deviceSize = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  StatusBarHeight: Constants.statusBarHeight,
  platform: Constants.platform,
};
