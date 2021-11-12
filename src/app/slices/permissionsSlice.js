import { createSlice } from "@reduxjs/toolkit";

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    camera: false,
    location: false,
  },
  reducers: {
    setCameraPermission: (state, action) => {
      return { ...state, camera: action.payload };
    },
    setLocationPermission: (state, action) => {
      return { ...state, location: action.payload };
    },
  },
});

export const { setCameraPermission, setLocationPermission } =
  permissionsSlice.actions;
export default permissionsSlice.reducer;
