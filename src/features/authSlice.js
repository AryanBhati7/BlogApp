import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async () => {
    const data = await authService.getCurrentUser();
    return data;
  }
);

export const loginAction = createAsyncThunk("auth/login", async (data) => {
  const session = await authService.login(data);
  return session;
});

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
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
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
      });
  },
});

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
