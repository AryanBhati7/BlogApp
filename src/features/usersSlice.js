import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/config";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};
// export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser",async()=>{
//   const user = await authService.getCurrentUser();
//   if(user){
//     const
//   }
// })

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const allUsers = await authService.getAllUsers();
  if (allUsers) {
    return allUsers;
  } else {
    throw new Error("Failed to fetch users");
  }
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser) => {
    return updatedUser;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
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
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user.accountId === action.payload.accountId
      );
      state.users[index] = action.payload;
    });
  },
});
export const { createUser } = usersSlice.actions;

export default usersSlice.reducer;
