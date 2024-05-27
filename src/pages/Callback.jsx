import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as authLogin, getGoogleAccInfo } from "../features/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

function Callback({ provider }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const actionResult = await dispatch(getGoogleAccInfo());
      const userData = unwrapResult(actionResult);
      if (userData) {
        dispatch(authLogin({ userData }));
        navigate("/");
      } else {
        console.log("Error - Google Login");
      }
    };

    fetchData();
  }, [provider, dispatch, navigate]);

  return <div>Loading...</div>;
}

export default Callback;
