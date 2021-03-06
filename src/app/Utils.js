import AmosDataBase from "../app/data/AmosDataBase.json";

const capitalize = (str) => {
  let capi = str.charAt(0).toUpperCase();
  return capi + str.slice(1);
};

// Function to analyze data coming from Clarifai, Check if one of the concept name correspond to a registered Amos in the app
const isAmosRegistered = (pictureData) => {
  for (const concept of pictureData) {
    if (concept.value > 0.9) {
      console.log("concept.name > 0.9 -", concept.name);
      if (AmosDataBase.amos.hasOwnProperty(concept.name)) {
        return AmosDataBase.amos[concept.name];
      }
    }
  }
  return null;
};

export const Utils = { capitalize, isAmosRegistered };
