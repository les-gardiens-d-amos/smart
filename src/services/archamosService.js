import { API } from "../apis/axios";
import Amos from "../entities/Amos";
import {
  setAmosList,
  setAmosSingle,
  deleteAmos,
  setAmosNewName,
} from "../app/slices/archamosSlice";

export const serviceSetUserAmos = async (dispatch, currentUser) => {
  try {
    const response = await API.get(
      `amos/find/user/?user_id=${currentUser.playerId}`,
      {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      }
    );
    if (response.status === 200) {
      let newList = [];
      for (const amos of response.data) {
        let amm = new Amos(amos).serialize();
        newList.push(amm);
      }
      dispatch(setAmosList(newList));
    } else {
      throw new Error("API get amos list status -> " + response.status);
    }
  } catch (error) {
    dispatch(setAmosList([{ error: true, mess: error.toString() }]));
    console.log("serviceSetUserAmos error:", error.toString());
  }
};

export const serviceSetAmosSingle = (dispatch, amosList, id) => {
  const amos = amosList.find((item) => item.id === id);
  dispatch(setAmosSingle(amos));
};

export const serviceAddTeam = () => {
  // dispatch(addTeam(amos));
};

export const serviceRenameAmos = async (dispatch, currentUser, id, newName) => {
  try {
    let data = { name: newName };
    const response = await API.put(`amos/update/name?id=${id}`, data, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    });
    if (response.status == 200) {
      dispatch(setAmosNewName({ id: id, name: newName }));
    } else {
      throw new Error("API put rename amos status -> " + response.status);
    }
  } catch (error) {
    console.log("serviceRenameAmos error:", error.toString());
  }
};

export const serviceReleaseAmos = async (dispatch, currentUser, id) => {
  try {
    const response = await API.delete(`amos/${id}`, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    });
    if (response.status == 204) {
      dispatch(deleteAmos(id));
      dispatch(setAmosSingle(null));
    } else {
      throw new Error("API delete amos status -> " + response.status);
    }
  } catch (error) {
    dispatch(setAmosList([{ error: true, mess: error.toString() }]));
    console.log("serviceReleaseAmos error:", error.toString());
  }
};
