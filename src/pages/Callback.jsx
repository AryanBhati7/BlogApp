import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoogleAccInfo } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner } from "../components";

function Callback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const loginStatus = useSelector((state) => state.auth.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getGoogleAccInfo());
        navigate("/");
      } catch (error) {
        setError("Google Login Failed Please try again");
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="mx-auto w-full max-w-lg bg-dark-bg dark:bg-background rounded-xl p-10 border border-black/10">
        {error && <p className="text-red-500">{error}</p>}
        {loginStatus && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Callback;
