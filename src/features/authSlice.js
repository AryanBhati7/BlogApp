import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";
import { userService } from "../appwrite/config";

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async () => {
    const data = await authService.getCurrentUser();
    return data;
  }
);

export const loginAction = createAsyncThunk("auth/login", async (data) => {
  try {
    const session = await authService.login(data);
    return session;
  } catch (error) {
    throw error;
  }
});
export const getGoogleAccInfo = createAsyncThunk(
  "auth/getGoogleAccInfo",
  async () => {
    const data = await authService.getGoogleAccountInfo();
    return data;
  }
);
export const savePost = createAsyncThunk(
  "savePost",
  async ({ userId, savedArray }) => {
    const response = await userService.savePost(userId, savedArray);
    return response;
  }
);

const initialState = {
  status: false,
  userData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload.userData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;
      })
      //login action Cases
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;
      })
      .addCase(getGoogleAccInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGoogleAccInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(getGoogleAccInfo.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;
      })
      //save post cases
      .addCase(savePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(savePost.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
