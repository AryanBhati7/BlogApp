import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
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
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="w-full block h-screen bg-background dark:bg-dark-bg ">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
