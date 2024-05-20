import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ className = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <button
      className={`inline-bock px-4 py-2 duration-200 rounded-full ${className} flex justify-center items-center gap-2`}
      onClick={logoutHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 dark:text-white text-darken"
        viewBox="0 0 14 14"
      >
        <path
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.5 10.5v2a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v2M6.5 7h7m-2-2l2 2l-2 2"
        ></path>
      </svg>
      Logout
    </button>
  );
}

export default LogoutBtn;
