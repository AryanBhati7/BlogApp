import React from "react";

function Button({
  children,
  type = "button",
  bgColor,
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg  ${className} ${bgColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
