import { createSlice } from "@reduxjs/toolkit";

const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    capturedImage: null,
    cameraLocation: null,
  },
  reducers: {
    setCapturedImage: (state, action) => {
      return {
        ...state,
        capturedImage: action.payload.image,
        cameraLocation: action.payload.cameraLocation,
      };
    },
  },
});

export const { setCapturedImage } = cameraSlice.actions;
export default cameraSlice.reducer;
