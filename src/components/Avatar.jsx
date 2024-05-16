import React from "react";

const Avatar = ({ children }) => {
  return <div className="avatar">{children}</div>;
};
const AvatarImage = ({ alt, src, className = "" }) => {
  return (
    <img
      className={`border border-black rounded-full object-cover w-24 h-24 ${className}`}
      alt={alt}
      src={src}
    />
  );
};

const AvatarFallback = ({ children }) => {
  return <div className="avatar-fallback">{children}</div>;
};

export { Avatar, AvatarImage, AvatarFallback };
