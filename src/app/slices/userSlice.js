import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userReducer",
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
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
