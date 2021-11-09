import { registerUser, loginUser, logoutUser } from "../app/slices/userSlice";
import { API } from "../apis/axios";
import * as SecureStore from "expo-secure-store";

export const serviceLoginUser = async (dispatch, userInput) => {
  try {
    const response = await API.post("login", userInput);
    console.log("serviceLoginUser -", response);

    if (response.status === 200) {
      const resData = response.data;
      console.log("Login -", resData);

      // Object {
      //   "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTA4ODgwMzctNzZkNS00MzI5LWFlYzktOWQxZGNjYzZkZDJiIn0.F6qU7JVP0dXDHflHLKJxK971rR8Zx4wfts8NOCf0kio",
      //   "user_info": Object {
      //     "email": "clamp@gmail.com",
      //     "id": "10888037-76d5-4329-aec9-9d1dccc6dd2b",
      //     "name": "Gg",
      //     "password": "$2a$12$FYhnHQVO1XbxbZqHwU2sqO6sj0YrKYYtO/w00gq3/64nqLPfS0lqa",
      //     "updated_at": "2021-10-29T15:52:00.195Z",
      //   },
      // }

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
      throw new Error("Login error -", response.status, "/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const serviceRegisterUser = async (dispatch, userInput) => {
  try {
    const response = await API.post(
      "users?controller=users&action=create",
      userInput
    );
    if (response.status === 200) {
      dispatch(registerUser());
    } else {
      throw new Error("Register error -", response.status, "/");
    }
  } catch (error) {
    console.log(error);
    // Returns error to display on the form ?
  }
};

export const serviceLogout = () => {
  dispatch(logoutUser());
};
