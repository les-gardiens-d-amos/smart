import { registerUser, loginUser, logoutUser } from "../app/slices/userSlice";
import { API } from "../apis/axios";
import * as SecureStore from "expo-secure-store";

export const serviceLoginUser = async (dispatch, userInput) => {
  try {
    const response = await API.post("login", userInput);
    if (response.status === 200) {
      const resData = response.data;
      console.log("Login -", resData);

      await SecureStore.setItemAsync("jwt", resData.token);
      await SecureStore.setItemAsync("user_id", resData.user_info.id);

      const currentUserdata = {
        // Build an object to use as the state redux currentUser everywhere in the app
        playerToken: resData.token,
        playerId: resData.user_info.id,
        playerName: resData.user_info.name,
        // playerGender: resData.user_info.gender,
      };

      dispatch(loginUser(currentUserdata));
    } else {
      throw new Error("Login error -", response.status);
    }
  } catch (error) {
    console.log("serviceLoginUser error -", error);
    return {error: true, message: error};
  }
};

export const serviceRegisterUser = async (dispatch, userInput) => {
  try {
    const response = await API.post(
      "users?controller=users&action=create",
      userInput
    );
    if (response.status === 200) {
      const resData = response.data;
      await SecureStore.setItemAsync("jwt", resData.token);
      await SecureStore.setItemAsync("user_id", resData.user_info.id);
      dispatch(registerUser());
    } else {
      throw new Error("Register error -", response.status);
    }
  } catch (error) {
    console.log("serviceRegisterUser error -", error);
    return {error: true, message: error};
    // Returns error to display on the form ?
  }
};

export const getCurrentUser = async (dispatch) => {
  try {
    const jwt = await SecureStore.getItemAsync("jwt");
    if (jwt !== null) {
      const response = await API.get("users/find/current_users", {
        headers: { Authorization: "Bearer " + jwt },
      });
      if (response.status === 200) {
        const resData = response.data;
        const currentUserdata = {
          // Build an object to use as the state redux currentUser everywhere in the app
          playerToken: jwt,
          playerId: resData.user_info.id,
          playerName: resData.user_info.name,
          // playerGender: resData.user_info.gender,
        };
        dispatch(loginUser(currentUserdata));
      } else {
        throw new Error("Get current user error -", response.status);
      }
    }
  } catch (error) {
    console.log("getCurrentUser error -", error);
    return true;
  }
};

export const serviceLogout = async (dispatch) => {
  await SecureStore.deleteItemAsync("jwt");
  await SecureStore.deleteItemAsync("user_id");
  dispatch(logoutUser());
};
