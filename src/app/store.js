import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import cameraSlice from "./slices/cameraSlice";
import archamosSlice from "./slices/archamosSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    cameraSlice: cameraSlice,
    archamosSlice: archamosSlice,
  },
});
