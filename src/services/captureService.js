import { API, CLARIFAI, IMGUR } from "../apis/axios";
import { setWildAmos, setCaptureResult } from "../app/slices/captureSlice";
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
        const errorMess = "serviceSaveAmos Amos not registered";
        dispatch(setCaptureResult({ failed: true, mess: errorMess }));
        throw new Error(errorMess);
      }
    }
  } catch (error) {
    console.log("serviceAnalyzeImage error -", error);
    return { error: true, mess: error };
  }
};

export const serviceSaveAmos = async (
  dispatch,
  capturedImage,
  currentUser,
  wildAmos,
  localisation
) => {
  try {
    const imgurData = JSON.stringify({
      image: capturedImage.data.base64,
      type: "base64",
    });
    const imgurRes = await IMGUR.post("", imgurData);
    if (imgurRes.status === 200) {
      let amos = JSON.stringify({
        user_id: currentUser.playerId,
        animal_id: wildAmos.id,
        species: wildAmos.species,
        amos_type: wildAmos.type,
        name: wildAmos.species,
        image_path: imgurRes.data.data.link,
      });
      const response = await API.post("amos", amos, {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      });
      if (response.status === 201) {
        await saveLocation(
          response.data.id,
          currentUser.playerToken,
          localisation
        );
        dispatch(setCaptureResult(wildAmos));
      } else {
        // Delete imgur image ?
        const errorMess = "serviceSaveAmos post amos error " + response.status;
        dispatch(setCaptureResult({ failed: true, mess: errorMess }));
        throw new Error("serviceSaveAmos post amos error", errorMess);
      }
    } else {
      const errorMess =
        "serviceSaveAmos post amos imgurRes error " + response.status;
      dispatch(setCaptureResult({ failed: true, mess: errorMess }));
      throw new Error(errorMess);
    }
  } catch (error) {
    console.log("serviceSaveAmos error", error);
    return { error: true, mess: error };
  }
};

const saveLocation = async (idAmos, playerToken, localisation) => {
  console.log(
    "idAmos",
    idAmos,
    "saveLocation playerToken",
    playerToken,
    "localisation",
    localisation
  );
  let coordInfo = JSON.stringify({
    long: localisation.long,
    lat: localisation.lat,
    altitude: localisation.altitude,
    accuracy: localisation.accuracy,
    amos_id: idAmos,
  });
  const response = await API.post("catches", coordInfo, {
    headers: { Authorization: "Bearer " + playerToken },
  });
  if (response.status !== 200) {
    throw new Error(
      "Capture service saveLocation error, status",
      response.status
    );
  }
};
