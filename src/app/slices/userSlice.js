import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// currentUser :
// {
// 	playerToken: Value,
// 	playerId: Value,
// 	playerName: Value,
// }

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    loginUser: (state, action) => {
      return { ...state, currentUser: action.payload };
    },
    registerUser: (state, action) => {
      return { ...state, currentUser: action.payload };
    },
    logoutUser: (state, action) => {
      return { ...state, currentUser: null };
    },
    changeName: (state, action) => {
      return {
        ...state,
        currentUser: { ...state.currentUser, playerName: action.payload },
      };
    },
    changeMail: (state, action) => {
      return {
        ...state,
        currentUser: { ...state.currentUser, playerMail: action.payload },
      };
    },
  },
});

export const { loginUser, registerUser, logoutUser, changeName, changeMail } =
  userSlice.actions;
export default userSlice.reducer;
