import React from "react";

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
  return <span className={`text-lg italic ${className}`}>{name}</span>;
};

export { Avatar, AvatarImage, AvatarName };
