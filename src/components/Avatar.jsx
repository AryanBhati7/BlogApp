import React from "react";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

const Avatar = ({ children, className = "" }) => {
  return (
    <div className="flex flex-row justify-between items-center">{children}</div>
  );
};

const AvatarImage = ({ className = "", w = "4", h = "4", src }) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      alt={"Avatar"}
    />
  );
};

const AvatarName = ({ className = "", name = "Username" }) => {
  const creatorInfo = useSelector((state) => state.creator.creatorInfo);
  return <span className={`ml-2 text-lg ${className}`}>{name}</span>;
};

export { Avatar, AvatarImage, AvatarName };
