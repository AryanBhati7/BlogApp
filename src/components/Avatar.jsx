import React from "react";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

const Avatar = ({ children, className = "" }) => {
  return (
    <div className="flex flex-row justify-between items-center">{children}</div>
  );
};

const AvatarImage = ({ className = "", w = "4", h = "4" }) => {
  const creatorInfo = useSelector((state) => state.creator);

  return (
    <div
      className={`block rounded-full ${className}`}
      style={{
        backgroundImage: `url(${
          creatorInfo
            ? authService.getProfilePreview(creatorInfo.profileImg)
            : ""
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      alt={creatorInfo ? creatorInfo.name : "UserName"}
    />
  );
};

const AvatarName = ({ className = "" }) => {
  const creatorInfo = useSelector((state) => state.creator);
  return (
    <span className={`ml-2 text-lg ${className}`}>
      {" "}
      {creatorInfo ? creatorInfo.name : "UserName"}
    </span>
  );
};

export { Avatar, AvatarImage, AvatarName };
