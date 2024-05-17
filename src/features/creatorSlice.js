import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

const initialState = {
  profileImg: "",
  name: "",
  accountId: "",
  bio: "",
  email: "",
  username: "",
};

const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setCreatorInfo: (state, action) => {
      state.profileImg = action.payload.profileImg;
      state.name = action.payload.name;
      state.name = action.payload.accountId;
      state.name = action.payload.bio;
      state.name = action.payload.email;
      state.name = action.payload.username;
    },
  },
});

export const { setCreatorInfo } = creatorSlice.actions;

export default creatorSlice.reducer;
