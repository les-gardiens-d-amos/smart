import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import cameraSlice from "./slices/cameraSlice";
import archamosSlice from "./slices/archamosSlice";
import permissionsSlice from "./slices/permissionsSlice";
import captureSlice from "./slices/captureSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    cameraSlice: cameraSlice,
    archamosSlice: archamosSlice,
    permissionsSlice: permissionsSlice,
    captureSlice: captureSlice,
  },
});
