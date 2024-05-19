import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AllPost from "./pages/AllPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Post from "./pages/Post.jsx";
import AddPost from "./pages/AddPost.jsx";
import Login from "./pages/Login.jsx";
import { AuthLayout } from "./components/index.js";
import Error from "./pages/Error.jsx";
import Onboarding from "./pages/Onboarding.jsx";
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
        path: "/onboarding",
        element: <Onboarding />,
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
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {""}
            <AllPost />
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
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
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
        path: "/callback/google",
        element: <Callback provider="google" />,
      },
      {
        path: "/callback/facebook",
        element: <Callback provider="facebook" />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
