import Constants from "expo-constants";

export const StatusBarHeight = Constants.statusBarHeight;

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

export const colorForType = {
  mammal: colors.mammal_c,
  bird: colors.bird_c,
  fish: colors.fish_c,
  amphibian: colors.amphibian_c,
  reptile: colors.reptile_c,
  invertebrate: colors.invertebrate_c,
};

export const colorForTypeFR = {
  Mammifère: colors.mammal_c,
  Oiseau: colors.bird_c,
  Poisson: colors.fish_c,
  Amphibien: colors.amphibian_c,
  Reptile: colors.reptile_c,
  Invertébré: colors.invertebrate_c,
};
