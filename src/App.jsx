import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";
import { fetchUsers } from "./features/usersSlice";
import { fetchPublicPosts } from "./features/postSlice";
import { fetchAllPosts } from "./features/postSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          dispatch(fetchUsers());
          dispatch(fetchPublicPosts());
          dispatch(fetchAllPosts());
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error getting current user:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="w-full block h-screen bg-background dark:bg-dark-bg ">
      <Header loading={loading} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
