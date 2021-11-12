import { API, CLARIFAI, IMGUR } from "../apis/axios";
import { setWildAmos } from "../app/slices/captureSlice";
import Amos from "../entities/Amos";

export const serviceAnalyzeImage = async (dispatch, picture) => {
  try {
    let raw = JSON.stringify({
      inputs: [
        {
          data: {
            image: {
              base64: picture.data.base64,
              //url: TestUrls["cat"],
            },
          },
        },
      ],
    });
    const response = await CLARIFAI.post("", raw);
    if (response.status === 200) {
      const pictureData = response.data.outputs[0].data.concepts;
      const foundAmos = Amos.isRegistered(pictureData);
      if (foundAmos !== null) {
        // Calculations for the level of the wild amos
        dispatch(setWildAmos(foundAmos));
        return { found: true, amos: foundAmos };
      } else {
        console.log("Amos not recognized");
        return { found: false, mess: "Aucun Amos existant n'a été reconnu." };
      }
    }
  } catch (error) {
    return { error: true, mess: error };
  }
};

export const serviceSaveAmos = async (currentUser, capturedAmos, imgPath) => {
  try {
    const imgurData = {
      image: picture.base64,
      type: "base64",
    };
    const imgurRes = await IMGUR.post("", imgurData);
    if (imgurRes.data.success && imgurRes.data.status === 200) {
      let amos = JSON.stringify({
        user_id: currentUser.playerId,
        animal_id: capturedAmos.id,
        species: capturedAmos.species,
        amos_type: capturedAmos.type,
        name: capturedAmos.species,
        image_path: imgPath,
      });
      console.log("Captured Amos to save in db -", amos);
      const response = await API.post("amos", amos, {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      });
      if (response.status === 200) {
        saveLocation(response.data.id);
      }
    }
  } catch (error) {
    return { error: true, mess: error };
  }
};

const saveLocation = async (idAmos) => {
  let coordInfo = JSON.stringify({
    long: localisation.long,
    lat: localisation.lat,
    altitude: localisation.altitude,
    accuracy: localisation.accuracy,
    amos_id: idAmos,
  });

  API.post("catches", coordInfo, {
    headers: { Authorization: "Bearer " + currentUser.playerToken },
  })
    .then((response) => {
      setCaptureSuccess(true);
      // navigation.navigate("ArchamosScreen"); Not working
    })
    .catch((error) => console.log(error));
};
