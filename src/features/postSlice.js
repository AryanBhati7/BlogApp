import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  publicPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPosts: (state, action) => {
      return {
        ...state,
        allPosts: action.payload.posts,
      };
    },
    getPublicPosts: (state, action) => {
      return {
        ...state,
        publicPosts: action.payload.posts,
      };
    },
  },
});

export const { getAllPosts, getPublicPosts } = postSlice.actions;
export default postSlice.reducer;
