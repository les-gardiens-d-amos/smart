import {
  registerUser,
  loginUser,
  logoutUser,
  changeName,
  changeMail,
} from "../app/slices/userSlice";
import { API } from "../apis/axios";
import * as SecureStore from "expo-secure-store";

const setUpCurrentUser = (token, resData) => {
  // Build an object to use as the state redux currentUser everywhere in the app
  return {
    playerToken: token,
    playerId: resData.user_info.id,
    playerMail: resData.user_info.email,
    playerName: resData.user_info.name,
    // playerGender: resData.user_info.gender,
  };
};

export const serviceLoginUser = async (dispatch, userInput) => {
  try {
    const response = await API.post("login", userInput);
    if (response.status === 200) {
      const resData = response.data;

      await SecureStore.setItemAsync("jwt", resData.token);
      await SecureStore.setItemAsync("user_id", resData.user_info.id);

      const currentUserdata = setUpCurrentUser(resData.token, resData);

      dispatch(loginUser(currentUserdata));
    } else {
      throw new Error("Login error -", response.status);
    }
  } catch (error) {
    console.log("serviceLoginUser error -", error);
    return { error: true, message: error };
  }
};

export const serviceRegisterUser = async (dispatch, userInput) => {
  try {
    const response = await API.post(
      "users?controller=users&action=create",
      userInput
    );
    console.log("serviceRegisterUser response", response);
    if (response.status === 200) {
      const resData = response.data;
      await SecureStore.setItemAsync("jwt", resData.token);
      await SecureStore.setItemAsync("user_id", resData.user_info.id);

      const currentUserdata = setUpCurrentUser(resData.token, resData);

      dispatch(registerUser(currentUserdata));
    } else {
      throw new Error("Register error -", response.status);
    }
  } catch (error) {
    console.log("serviceRegisterUser error -", error);
    return { error: true, message: error };
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

        const currentUserdata = setUpCurrentUser(jwt, resData);

        dispatch(loginUser(currentUserdata));
      } else {
        throw new Error("Get current user error -", response.status);
      }
    }
  } catch (error) {
    console.log("getCurrentUser error -", error);
    return { error: true, mess: error };
  }
};

export const serviceLogout = async (dispatch) => {
  await SecureStore.deleteItemAsync("jwt");
  await SecureStore.deleteItemAsync("user_id");
  dispatch(logoutUser());
};

export const serviceDelete = async (dispatch, currentUser) => {
  try {
    const response = await API.delete(`users/${currentUser.playerId}`, {
      headers: { Authorization: "Bearer " + currentUser.playerToken },
    });
    if (response.status === 200) {
      dispatch(logoutUser());
    } else {
      throw new Error("serviceDelete error -", response.status);
    }
  } catch (error) {
    console.error("serviceDelete error", error);
    return { error: true, mess: error };
  }
};

export const serviceChangeName = async (dispatch, currentUser, userInput) => {
  try {
    const data = { name: userInput };
    const response = await API.put(
      `users/update/name?id=${currentUser.playerId}`,
      data,
      {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      }
    );
    if (response.status === 200) {
      dispatch(changeName(userInput));
    } else {
      throw new Error("serviceChangeName error -", response.status);
    }
  } catch (error) {
    console.error("serviceChangeName error", error);
    return { error: true, mess: error };
  }
};

export const serviceChangeMail = async (dispatch, currentUser, userInput) => {
  try {
    // Check if mail form
    const data = { email: userInput };
    const response = await API.put(
      `users/update/email?id=${currentUser.playerId}`,
      data,
      {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      }
    );
    if (response.status === 200) {
      dispatch(changeMail(userInput));
    } else {
      throw new Error("serviceChangeMail error -", response.status);
    }
  } catch (error) {
    console.error("serviceChangeMail error", error);
    return { error: true, mess: error };
  }
};

export const serviceChangePassword = async (currentUser, oldPass, newPass) => {
  try {
    const data = {
      last_password: oldPass,
      password: newPass,
    };
    const response = await API.put(
      `users/update/password?id=${currentUser.playerId}`,
      data,
      {
        headers: { Authorization: "Bearer " + currentUser.playerToken },
      }
    );
    if (response.status !== 200) {
      throw new Error("serviceChangePassword error -", response.status);
    }
  } catch (error) {
    console.error("User changeName error", error);
    return { error: true, mess: error };
  }
};
