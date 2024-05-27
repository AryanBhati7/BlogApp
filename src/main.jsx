import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Saves from "./pages/Saves.jsx";
import EditPost from "./pages/EditPost.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Post from "./pages/Post.jsx";
import AddPost from "./pages/AddPost.jsx";
import Login from "./pages/Login.jsx";
import { AuthLayout } from "./components/index.js";
import Error from "./pages/Error.jsx";
import Callback from "./pages/Callback.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/saves",
        element: (
          <AuthLayout authentication>
            {""}
            <Saves />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {""}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:postId",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:postId",
        element: (
          <AuthLayout authentication>
            <Post />,
          </AuthLayout>
        ),
      },
      {
        path: "/error",
        element: (
          <AuthLayout authentication={false}>
            <Error />
          </AuthLayout>
        ),
      },
      {
        path: "/callback",
        element: <Callback />,
      },
      {
        path: "/profile/:username",
        element: (
          <AuthLayout authentication>
            <Profile />,
          </AuthLayout>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout authentication>
            <EditProfile />,
          </AuthLayout>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
