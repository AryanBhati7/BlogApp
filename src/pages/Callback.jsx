import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

function Callback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    authService.getGoogleAccountInfo().then((data) => {
      if (data) {
        console.log(data);
        dispatch(authLogin(data));
        navigate("/");
      } else {
        console.log("Error");
      }
    });
  }, []);

  return <div>Loading...</div>;
}

export default Callback;
