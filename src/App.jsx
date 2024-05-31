import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, fetchUserInfo } from "./features/authSlice";
import { Footer, Header, LoadingSpinner } from "./components/index";
import { Outlet } from "react-router-dom";
import { fetchPublicPosts } from "./features/postSlice";
import { fetchUsers } from "./features/usersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(fetchUserInfo());
        const userData = unwrapResult(actionResult);
        if (userData) {
          setLoading(false);
          dispatch(fetchPublicPosts());
          dispatch(fetchUsers());
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Failed to fetch user info: ", error);
        dispatch(logout());
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  return !loading ? (
    <div className="w-full h-screen block overflow-x-hidden bg-background dark:bg-dark-bg  ">
      <Header loading={loading} />
      <main className="">
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
