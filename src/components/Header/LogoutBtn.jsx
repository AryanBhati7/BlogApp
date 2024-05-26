import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";

function LogoutBtn({ className = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await authService.logOut();
    dispatch(logout());
    navigate("/");
  };
  return (
    <button
      className={`inline-bock px-4 py-2 duration-200 rounded-full ${className} flex justify-center items-center gap-2`}
      onClick={logoutHandler}
    >
      <MdOutlineLogout className="dark:text-white text-gray-900" />
      Logout
    </button>
  );
}

export default LogoutBtn;
