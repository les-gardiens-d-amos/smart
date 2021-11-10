import { createSlice } from "@reduxjs/toolkit";

const archamosSlice = createSlice({
  name: "archamos",
  initialState: {
    amosList: [],
  },
  reducers: {
    setAmosList: (state, action) => {
      return { ...state, amosList: [...action.payload] };
    },
    addAmos: (state, action) => {
      return { ...state, amosList: [...state.amoslist, action.payload] };
    },
    setAmosNewName: (state, action) => {
      console.log("action.payload", action.payload);
      return {
        ...state,
        amosList: state.amosList.map((amos) => {
          amos.id == action.payload.id
            ? { ...amos, name: action.payload.name }
            : amos;
        }),
      };
    },
  },
});

export const { setAmosList, addAmos, setAmosNewName } = archamosSlice.actions;
export default archamosSlice.reducer;
