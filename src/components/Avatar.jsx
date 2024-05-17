import React from "react";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

const Avatar = ({ children, className = "" }) => {
  return <div className={`avatar ${className}`}>{children}</div>;
};

const AvatarImage = ({ className = "", w = "4", h = "4" }) => {
  const creatorInfo = useSelector((state) => state.creator);

  return (
    <img
      className={`border border-black rounded-full object-cover w-8 h-8 ${className}`}
      alt={creatorInfo ? creatorInfo.name : "UserName"}
      src={
        creatorInfo ? authService.getProfilePreview(creatorInfo.profileImg) : ""
      }
    />
  );
};

const AvatarName = ({ className = "" }) => {
  const creatorInfo = useSelector((state) => state.creator);
  return (
    <div
      className={`avatar-name text-lg font-semibold text-blue-500 ${className}`}
    >
      {creatorInfo ? creatorInfo.name : "UserName"}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarName };
