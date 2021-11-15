import { createSlice } from "@reduxjs/toolkit";

const archamosSlice = createSlice({
  name: "archamos",
  initialState: {
    amosList: [],
    amosSingle: null,
    filteredList: null,
  },
  reducers: {
    setAmosList: (state, action) => {
      return { ...state, amosList: [...action.payload] };
    },
    setFilteredList: (state, action) => {
      return { ...state, filteredList: [...action.payload] };
    },
    addAmos: (state, action) => {
      return { ...state, amosList: [...state.amoslist, action.payload] };
    },
    deleteAmos: (state, action) => {
      return {
        ...state,
        amosList: state.amosList.filter((amos) => amos.id !== action.payload),
      };
    },
    setAmosSingle: (state, action) => {
      return { ...state, amosSingle: action.payload };
    },
    setAmosNewName: (state, action) => {
      console.log("action.payload", action.payload);
      return {
        ...state,
        amosSingle: { ...state.amosSingle, name: action.payload.name },
        amosList: state.amosList.map((amos) =>
          amos.id === action.payload.id
            ? { ...amos, name: action.payload.name }
            : amos
        ),
      };
    },
  },
});

export const {
  setAmosList,
  setFilteredList,
  addAmos,
  setAmosSingle,
  setAmosNewName,
  deleteAmos,
} = archamosSlice.actions;
export default archamosSlice.reducer;
