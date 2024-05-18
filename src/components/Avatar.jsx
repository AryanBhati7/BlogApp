import React from "react";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

const Avatar = ({ children, className = "" }) => {
  return (
    <div class="flex flex-row justify-between items-center">{children}</div>
  );
};

const AvatarImage = ({ className = "", w = "4", h = "4" }) => {
  const creatorInfo = useSelector((state) => state.creator);

  return (
    <img
      className={`block rounded-full${className}`}
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
    <span class="ml-2 text-sm">
      {" "}
      {creatorInfo ? creatorInfo.name : "UserName"}
    </span>
  );
};

export { Avatar, AvatarImage, AvatarName };
