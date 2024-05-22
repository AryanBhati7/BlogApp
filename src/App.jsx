import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Footer, Header, LoadingSpinner } from "./components/index";
import { Outlet } from "react-router-dom";
import { fetchUsers } from "./features/usersSlice";

import { fetchMyPosts } from "./features/postSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
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
    <div className="w-full block h-screen overflow-x-hidden bg-background dark:bg-dark-bg ">
      <Header loading={loading} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="h-screen w-screen dark:bg-dark-bg bg-background">
      <LoadingSpinner />
    </div>
  );
}

export default App;
