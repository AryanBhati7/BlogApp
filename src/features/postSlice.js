import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService, { postService, userService } from "../appwrite/config";
import { comment } from "postcss";

export const fetchPost = createAsyncThunk("fetchPost", async (postId) => {
  const response = await appwriteService.getPost(postId);
  return response;
});

// Async thunk for fetching all posts
export const fetchMyPosts = createAsyncThunk("fetchMyPosts", async (userId) => {
  const response = await appwriteService.getPostsByUser(userId);
  return response.documents;
});

export const fetchPublicPosts = createAsyncThunk(
  "fetchPublicPosts",
  async () => {
    const response = await appwriteService.getPosts();
    return response.documents;
  }
);

export const createPostAction = createAsyncThunk("createPost", async (post) => {
  try {
    const response = await postService.createPost(post);
    return response;
  } catch (error) {
    throw error;
  }
});

export const editPost = createAsyncThunk(
  "editPost",
  async ({ postId, post }) => {
    try {
      const response = await postService.updatePost(postId, post);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "deletePost",
  async (postId) => {
    try {
      const response = await postService.deletePost(postId);
      if (response) return postId;
    } catch (error) {
      console.log("Post Slice : DeletePost : Error : ", error);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, likesArray }) => {
    const post = await userService.likePost(postId, likesArray);
    return post;
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ userId, postId, comment }) => {
    const newComment = await userService.addComment(userId, postId, comment);
    console.log(newComment);
    return newComment;
  }
);

export const editComment = createAsyncThunk(
  "posts/editComment",
  async ({ commentId, comment }) => {
    const updatedComment = await userService.updateComment(commentId, comment);
    return updatedComment;
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentId) => {
    console.log(commentId, "CommnetID delete");
    const DeleteComment = await userService.deleteComment(commentId);
    console.log(DeleteComment);
    if (DeleteComment) return commentId;
  }
);

const initialState = {
  myPosts: [],
  publicPosts: [],
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
        state.myPosts = [action.payload, ...state.myPosts];
        if (action.payload.status === "Public") {
          state.publicPosts = [action.payload, ...state.publicPosts];
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
        state.myPosts = action.payload.sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //fetch Public Posts Cases
      .addCase(fetchPublicPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.publicPosts = action.payload.sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Fetch Post Cases
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        const post = action.payload;

        // Find the post in publicPosts and replace it
        const publicPostIndex = state.publicPosts.findIndex(
          (p) => p.$id === post.$id
        );
        if (publicPostIndex !== -1) {
          state.publicPosts[publicPostIndex] = post;
        } else if (post.status === "Public") {
          // If the post is not found and it's a public post, add it to the start of the array
          state.publicPosts = [post, ...state.publicPosts];
        }

        // Find the post in myPosts and replace it
        const myPostIndex = state.myPosts.findIndex((p) => p.$id === post.$id);
        if (myPostIndex !== -1) {
          state.myPosts[myPostIndex] = post;
        } else {
          // If the post is not found, add it to the start of the array
          state.myPosts = [post, ...state.myPosts];
        }
      })
      //Like Post Cases
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;

        if (updatedPost.status === "Public") {
          const publicIndex = state.publicPosts.findIndex(
            (post) => post.$id === updatedPost.$id
          );

          if (publicIndex === -1) return;

          state.publicPosts[publicIndex] = updatedPost;
        }
        const index = state.myPosts.findIndex(
          (post) => post.$id === updatedPost.$id
        );

        if (index === -1) return;
        state.myPosts[index] = updatedPost;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Comment Cases
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const newComment = action.payload;
        const postIndex = state.publicPosts.findIndex(
          (post) => post.$id === newComment.post.$id
        );
        if (postIndex === -1) return;
        state.publicPosts[postIndex].comments.push(newComment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Edit comment cases
      .addCase(editComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload;
        const postIndex = state.publicPosts.findIndex(
          (post) => post.$id === updatedComment.post.$id
        );
        if (postIndex === -1) return;
        const commentIndex = state.publicPosts[postIndex].comments.findIndex(
          (comment) => comment.$id === updatedComment.$id
        );
        if (commentIndex === -1) return;
        state.publicPosts[postIndex].comments[commentIndex] = updatedComment;
      })
      .addCase(editComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Delete Comment Cases
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const commentId = action.payload;
        state.publicPosts.forEach((post) => {
          post.comments = post.comments.filter(
            (comment) => comment.$id !== commentId
          );
        });
      })
      // .addCase(deletePostAction.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const postId = action.payload;
      //   state.myPosts = state.myPosts.filter((post) => post.$id !== postId);
      //   state.publicPosts = state.publicPosts.filter(
      //     (post) => post.$id !== postId
      //   );
      // })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
