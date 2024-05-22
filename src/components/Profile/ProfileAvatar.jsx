import React from "react";
import { Link } from "react-router-dom";
function ProfileAvatar({ userInfo, isUser }) {
  return (
    <div className="bg-background  dark:bg-dark-bg text-black dark:text-white shadow-xl ">
      <div
        className="w-full h-[250px] rounded-sm bg-cover bg-center bg-no-repeat items-center"
        style={{ backgroundImage: `url(${userInfo.coverphoto})` }}
      ></div>
      <div className="flex flex-col items-center -mt-24">
        <div
          className={`mx-auto flex justify-center w-44 h-44 bg-dark-bg rounded-full bg-cover bg-center bg-no-repeat border-4 border-dark-bg `}
          style={{ backgroundImage: `url(${userInfo.profileImg})` }}
        ></div>

        <div className="flex items-center space-x-2">
          <p className="text-2xl">
            {userInfo.username ? userInfo.username : "@username"}
          </p>
        </div>
        <p className="text-gray-700 dark:text-gray-100">
          {userInfo.bio ? userInfo.bio : "---"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-200">
          {userInfo.location ? userInfo.location : "Location"}
        </p>
      </div>

      <div className="flex justify-center pt-2 space-x-4 align-center">
        {/* {Instagram} */}
        <Link
          to={userInfo.socials[0] ? userInfo.socials[0] : "#"} // Instagram
          className="p-2 rounded-md text-gray-800 dark:text-gray-200 hover:dark:text-[#d62976]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-current w-7 h-7"
          >
            <path d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a78.831 78.831 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.883 4.883 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465a72.11 72.11 0 0 1-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78.43 78.43 0 0 1-2.189-.023l-.194-.006a63.036 63.036 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.889 4.889 0 0 1-1.771-1.153a4.904 4.904 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428a74.1 74.1 0 0 1-.03-.712l-.005-.194A79.047 79.047 0 0 1 2 13.028v-2.056a78.82 78.82 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.88 4.88 0 0 1 3.68 3.678a4.897 4.897 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5"></path>
          </svg>
        </Link>
        {/* {Twitter} */}
        <Link
          to={userInfo.socials[1] ? userInfo.socials[2] : "#"} // Twitter
          className="p-2 rounded-md text-gray-800 dark:text-gray-200 hover:dark:text-blue-400"
        >
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 fill-current"
          >
            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
          </svg>
        </Link>
        {/* {Facebook} */}
        <Link
          to={userInfo.socials[2] ? userInfo.socials[2] : "#"} // Facebook
          className="p-2 rounded-md text-gray-800 dark:text-gray-200 hover:dark:text-[#001ba0]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 fill-current"
            viewBox="0 0 16 16"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131c.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"></path>
          </svg>
        </Link>
      </div>
      {isUser && (
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 lg:relative lg:top-[-55px]">
            <Link to={"/edit-profile"}>
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1m-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71m10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z"
                  ></path>
                </svg>
                <span className="text-md">Edit Profile</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileAvatar;
