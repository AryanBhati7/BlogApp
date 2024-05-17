import React from "react";

function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button className={`px-4 py-2 rounded-lg  ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
