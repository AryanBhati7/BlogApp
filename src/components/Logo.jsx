import React from "react";

function Logo({ textColor = "primary", darkTextColor = "white" }) {
  return (
    <div className="relative flex items-center ">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3rem"
          height="3rem"
          viewBox="0 0 20 20"
          className="block"
        >
          <g fill="red" fillRule="evenodd" clipRule="evenodd">
            <path
              d="M5.557 12.763a.5.5 0 0 1 .141-.277l9.394-9.394a.5.5 0 0 1 .707 0l3.625 3.625a.5.5 0 0 1 0 .707l-9.394 9.394a.5.5 0 0 1-.277.14l-4.283.658a.5.5 0 0 1-.57-.57z"
              opacity={0.2}
            ></path>
            <path d="M3.944 11.79a.5.5 0 0 1 .141-.277L14.163 1.435a.5.5 0 0 1 .707 0l3.89 3.89a.5.5 0 0 1 0 .706L8.68 16.11a.5.5 0 0 1-.277.14l-4.595.706a.5.5 0 0 1-.57-.57zm.964.314l-.577 3.76l3.759-.578l9.609-9.608l-3.183-3.182z"></path>
            <path d="m15.472 8.173l-3.537-3.53l.707-.708l3.536 3.53z"></path>
          </g>
        </svg>
      </div>
      <div
        className={`text-2.5xl font-bold tracking-widest text-theme-color
rounded-lg focus:outline-none focus:shadow-outline`}
      >
        Blog
        <span className={`text-${textColor} dark:text-${darkTextColor}`}>
          App
        </span>
      </div>
    </div>
  );
}

export default Logo;
