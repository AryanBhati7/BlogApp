import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/config";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const allUsers = await authService.getAllUsers();
  if (allUsers) {
    const authorsData = allUsers.map(async (user) => {
      const data = await appwriteService.getPostsByUser(user.accountId);
      return {
        userId: user.accountId,
        username: user.name,
        profileImg: user.profileImg,
        coverphoto: user.coverphoto,
        numberOfPosts: data.total,
        location: user.location,
        name: user.name,
        dob: user.dob,
        bio: user.bio,
        email: user.email,
        gender: user.gender,
        socials: user.socials,
      };
    });
    return Promise.all(authorsData);
  } else {
    throw new Error("Failed to fetch users");
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default usersSlice.reducer;
