import { API, CLARIFAI, IMGUR } from "../apis/axios";
import { setWildAmos, setCaptureResult } from "../app/slices/captureSlice";
import AmosData from "../app/data/AmosData.json";
import { Utils } from "../app/Utils";

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
      const foundAmos = Utils.isAmosRegistered(pictureData);
      if (foundAmos !== null) {
        // Calculations for the level of the wild amos
        dispatch(setWildAmos(foundAmos));
      } else {
        dispatch(setCaptureResult({}));
      }
    } else {
      dispatch(
        setCaptureResult({ failed: true, error: true, mess: error.toString() })
      );
      throw new Error("CLARIFAI error, response status: " + response.status);
    }
  } catch (error) {
    dispatch(
      setCaptureResult({ failed: true, error: true, mess: error.toString() })
    );
    saveFailedJob(
      "Clarifai",
      "Error during the process of analyzing the picture",
      error,
      "In block serviceAnalyzeImage"
    );
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
    const resImgur = await saveImage(capturedImage);
    const resApi = await saveAmos(
      dispatch,
      currentUser,
      resImgur.data.data.link,
      wildAmos
    );
    await saveLocation(resApi.data.id, currentUser.playerToken, localisation);
    dispatch(setCaptureResult(wildAmos));
  } catch (error) {
    console.log("serviceSaveAmos error:", error);
    saveFailedJob(
      "Save Amos",
      "Error during the saving process of an Amos",
      error,
      "In block serviceSaveAmos"
    );
    dispatch(
      setCaptureResult({ failed: true, error: true, mess: error.toString() })
    );
  }
};

const saveImage = async (capturedImage) => {
  try {
    const imgurData = JSON.stringify({
      image: capturedImage.data.base64,
      type: "base64",
    });
    const response = await IMGUR.post("", imgurData);
    if (response.status !== 200) {
      throw new Error("response status: " + response.status);
    }
    return response;
  } catch (error) {
    throw new Error("IMGUR " + error);
  }
};

const saveAmos = async (dispatch, currentUser, image, wildAmos) => {
  try {
    let amos = JSON.stringify({
      user_id: currentUser.playerId,
      animal_id: wildAmos.id,
      species: wildAmos.species,
      amos_type: wildAmos.type,
      name: Utils.capitalize(AmosData.amos[wildAmos.species].species),
      image_path: image,
    });
    const response = await API.post("amos", amos, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    });
    if (response.status === 201) {
      dispatch(setCaptureResult(wildAmos));
    } else {
      throw new Error("response status: " + response.status);
    }
    return response;
  } catch (error) {
    throw new Error("API Amos " + error);
  }
};

const saveLocation = async (idAmos, playerToken, localisation) => {
  try {
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
    if (response.status !== 201) {
      throw new Error("response status: ", response.status);
    }
  } catch (error) {
    throw new Error("API Amos location " + error);
  }
};

const saveFailedJob = async (name, description, error, stack_trace) => {
  let finalUrl =
    "name=" +
    name +
    "&description=" +
    description +
    "&error=" +
    error +
    "&stack_trace=" +
    stack_trace;
  const response = await API.post("failed_jobs?" + finalUrl);
  console.log("saveFailedJob response", response);
};
