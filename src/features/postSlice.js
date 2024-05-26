import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService, { postService } from "../appwrite/config";

// Async thunk for fetching all posts
export const fetchMyPosts = createAsyncThunk("fetchMyPosts", async (userId) => {
  const response = await appwriteService.getPostsByUser(userId);
  return response.documents;
});

export const fetchPublicPosts = createAsyncThunk(
  "fetchPublicPosts",
  async () => {
    const response = await appwriteService.getPosts();
    console.log(response);
    return response.documents;
  }
);

export const createPostAction = createAsyncThunk("createPost", async (post) => {
  try {
    const response = await postService.createPost(post);
    return response;
  } catch (error) {
    console.log("Post Slice : CreatePost : Error : ", error);
  }
});

export const editPost = createAsyncThunk(
  "editPost",
  async ({ postId, post }) => {
    try {
      console.log(post, postId, "editPOst SLice");
      const response = await postService.updatePost(postId, post);
      return response;
    } catch (error) {
      console.log("Post Slice : Edit Post : Error : ", error);
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "deletePost",
  async (postId) => {
    try {
      const response = await postService.deletePost(postId);
      return response;
    } catch (error) {
      console.log("Post Slice : DeletePost : Error : ", error);
    }
  }
);

const initialState = {
  myPosts: [],
  publicPosts: [],
  status: "idle",
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // createPost: (state, action) => {
    //   const newPost = action.payload;
    //   state.allPosts.push(newPost);
    //   state.myPosts.push(newPost);
    //   if (newPost.status === "Public") {
    //     state.publicPosts.push(newPost);
    //   }
    // },
    // deletePost: (state, action) => {
    //   const postId = action.payload;
    //   state.allPosts = state.allPosts.filter((post) => post.$id !== postId);
    //   state.myPosts = state.myPosts.filter((post) => post.$id !== postId);
    //   state.publicPosts = state.publicPosts.filter(
    //     (post) => post.$id !== postId
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      //Create post cases
      .addCase(createPostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts.push(action.payload);
        if (action.payload.status === "Public") {
          state.publicPosts.push(action.payload);
        }
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Edit post cases
      .addCase(editPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.myPosts.findIndex(
          (post) => post.$id === updatedPost.$id
        );
        state.myPosts[index] = updatedPost;
        if (updatedPost.status === "Public") {
          const publicIndex = state.publicPosts.findIndex(
            (post) => post.$id === updatedPost.$id
          );
          state.publicPosts[publicIndex] = updatedPost;
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //delete post cases
      .addCase(deletePostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePostAction.fulfilled, (state, action) => {
        state.loading = false;
        const postId = action.payload;
        state.myPosts = state.myPosts.filter((post) => post.$id !== postId);
        state.publicPosts = state.publicPosts.filter(
          (post) => post.$id !== postId
        );
      })
      .addCase(deletePostAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //fetch My Posts Cases
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //fetch Public Posts Cases
      .addCase(fetchPublicPosts.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.publicPosts = action.payload;
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
