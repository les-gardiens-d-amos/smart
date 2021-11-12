import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "capture",
  initialState: {
    wildAmos: null,
  },
  reducers: {
    setWildAmos: (state, action) => {
      return { ...state, wildAmos: action.payload };
    },
  },
});

export const { setWildAmos } = captureSlice.actions;
export default captureSlice.reducer;
