import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import postSlice from "../features/postSlice";
import creatorSlice from "../features/creatorSlice";
import usersSlice from "../features/usersSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice,
    creator: creatorSlice,
    users: usersSlice,
  },
});
export default store;
