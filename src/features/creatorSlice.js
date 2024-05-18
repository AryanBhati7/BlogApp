import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

const initialState = {
  creatorInfo: null,
};

const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setCreatorInfo: (state, action) => {
      state.creatorInfo = action.payload.creatorInfo;
    },
  },
});

export const { setCreatorInfo } = creatorSlice.actions;

export default creatorSlice.reducer;
