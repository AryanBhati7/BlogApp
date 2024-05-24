import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

function Callback({ provider }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (provider === "google") {
      authService.getGoogleAccountInfo().then((userData) => {
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        } else {
          console.log("Error");
        }
      });
    } else if (provider === "facebook") {
      authService.getFacebookAccountInfo().then((data) => {
        if (data) {
          console.log(data);
          dispatch(authLogin(data));
          navigate("/");
        } else {
          console.log("Error");
        }
      });
    }
  }, [provider, dispatch, navigate]);

  return <div>Loading...</div>;
}

export default Callback;
