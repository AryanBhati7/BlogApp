import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

const initialState = {
  users: [],
  status: "idle",
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const allUsers = await authService.getAllUsers();
  if (allUsers) {
    return allUsers;
  } else {
    throw new Error("Failed to fetch users");
  }
});

export const createUser = createAsyncThunk("createUser", async (newUser) => {
  const user = await authService.createAccount(newUser);
  return user;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ userId, updatedUser }) => {
    const user = await authService.updateProfile(userId, updatedUser);
    return user;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // update the 'users' field
        state.status = "succeeded"; // update the status
      })
      //create user cases
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //update user cases
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.accountId === action.payload.accountId
        );
        state.users[index] = action.payload;
      });
  },
});

export default usersSlice.reducer;
