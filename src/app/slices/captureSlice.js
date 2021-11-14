import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "capture",
  initialState: {
    wildAmos: null,
    captureResult: null,
  },
  reducers: {
    setWildAmos: (state, action) => {
      return { ...state, wildAmos: action.payload };
    },
    setCaptureResult: (state, action) => {
      return { ...state, captureResult: action.payload };
    },
  },
});

export const { setWildAmos, setCaptureResult } = captureSlice.actions;
export default captureSlice.reducer;
