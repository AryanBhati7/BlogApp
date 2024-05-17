import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import postSlice from "../features/postSlice";
import creatorSlice from "../features/creatorSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice,
    creator: creatorSlice,
  },
});
export default store;
