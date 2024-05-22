import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";

// Async thunk for fetching all posts
export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMyPosts",
  async (userId) => {
    const response = await appwriteService.getPostsByUser(userId);
    return response.documents;
  }
);

// Async thunk for fetching public posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await appwriteService.getPosts();
  return response.documents;
});

const initialState = {
  myPosts: [],
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.myPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
