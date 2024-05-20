import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";

// Async thunk for fetching all posts
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const response = await appwriteService.getAllPosts();
    return response.documents;
  }
);

// Async thunk for fetching public posts
export const fetchPublicPosts = createAsyncThunk(
  "posts/fetchPublicPosts",
  async () => {
    const response = await appwriteService.getPosts();
    return response.documents;
  }
);

const initialState = {
  allPosts: [],
  publicPosts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.allPosts = state.allPosts.concat(action.payload);
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPublicPosts.pending, (state) => {
        state.status = "loading";
        console.log("Loading ");
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Success ");
        // Add any fetched posts to the array
        state.publicPosts = state.publicPosts.concat(action.payload);
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.status = "failed";
        console.log("rejected ");
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
