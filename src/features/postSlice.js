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
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const response = await appwriteService.getPosts([]);
    return response.documents;
  }
);

export const fetchPublicPosts = createAsyncThunk(
  "posts/fetchPublicPosts",
  async () => {
    const response = await appwriteService.getPosts();
    return response.documents;
  }
);
const initialState = {
  myPosts: [],
  publicPosts: [],
  allPosts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      const newPost = action.payload;
      state.allPosts.push(newPost);
      state.myPosts.push(newPost);

      if (newPost.status === "Public") {
        state.publicPosts.push(newPost);
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.allPosts = state.allPosts.filter((post) => post.$id !== postId);
      state.myPosts = state.myPosts.filter((post) => post.$id !== postId);
      state.publicPosts = state.publicPosts.filter(
        (post) => post.$id !== postId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPublicPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.publicPosts = action.payload;
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
