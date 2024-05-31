import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoogleAccInfo, login } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner } from "../components";
import { unwrapResult } from "@reduxjs/toolkit";

function Callback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const loginStatus = useSelector((state) => state.auth.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(getGoogleAccInfo());
        const userData = unwrapResult(actionResult);
        if (userData) {
          navigate("/");
        }
      } catch (error) {
        setError("Google Login Failed Please try again");
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  if (loginStatus) return <LoadingSpinner />;
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="mx-auto w-full max-w-lg dark:bg-dark-bg bg-background rounded-xl p-10 border border-black/10">
        {error && <p className="text-red-500 text-2xl">{error}</p>}
      </div>
    </div>
  );
}

export default Callback;
