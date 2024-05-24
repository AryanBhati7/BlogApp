import React from "react";
import { AvatarImage, Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import { useEffect, useState } from "react";

function Header({ loading }) {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "New Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-background dark:bg-dark-bg">
      <div className="ml-2">
        <nav className="flex md:hidden ">
          {authStatus && (
            <button onClick={() => setIsOpen(!isOpen)} className="ml-4">
              <AvatarImage
                src={userData.profileImg}
                className="w-12 h-12 object-cover rounded-full mt-2"
              />
            </button>
          )}
          {!authStatus && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 w-18 h-18 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className=" dark:text-gray-200 h-8 w-8 text-dark-bg block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          <div className="w-full z-10 flex justify-center items-center ">
            <Link>
              <Logo to="/" />
            </Link>
          </div>

          <div
            className={` mt-3 fixed transform top-0 left-0 w-80 bg-gray-200  dark:bg-gray-900 h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between px-4 mt-2 mx-2">
              <div className="flex justify-end">
                <button onClick={() => setIsOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-8 w-8 dark:text-gray-200 text-dark-bg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ThemeToggler />
            </div>
            <ul className="space-y-4 p-6">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsOpen(false);
                      }}
                      className="text-2xl hover:bg-gray-300 w-full text-left p-2 rounded-lg text-dark-bg dark:text-white duration-200 hover:text-primary"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full mb-4 py-2 flex justify-center gap-4 items-center text-xl text-center text-white bg-blue-500 rounded-full mt-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="p-0 h-6 w-6"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="white"
                        d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
                      ></path>
                    </svg>{" "}
                    New Post
                  </button>
                </li>
              )}
              {authStatus && !loading && userData && (
                <div className="flex items-center space-x-4 mt-6 w-full">
                  <Link
                    to={`/profile/${userData.username}`}
                    className="flex items-center space-x-4"
                  >
                    <AvatarImage
                      src={userData.profileImg}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div>
                      <p className="font-bold dark:text-white text-dark-bg">
                        {userData.name}
                      </p>
                      <p className="dark:text-gray-400 text-gray-900">
                        @{userData.username}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
              {authStatus && (
                <li>
                  <LogoutBtn
                    onClick={() => setIsOpen(false)}
                    className="dark:text-white font-mono inline-bock px-2 py-2 text-2xl text-darken duration-200 rounded-full"
                  />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <nav className="hidden md:flex pr-14 mt-4 mr-4">
        <div className="ml-36 mt-1">
          <Link to="/">
            <Logo textColor="primary" darkTextColor="white" />
          </Link>
        </div>
        <ul className="flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className=" dark:text-white font-mono inline-bock px-6 py-2 text-2xl text-darken duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn className="dark:text-white font-mono inline-bock px-6 py-2 text-2xl text-darken duration-200 hover:bg-blue-100 rounded-full" />
            </li>
          )}
          <li>
            <ThemeToggler />
          </li>
          {authStatus && !loading && userData && (
            <li>
              <Link to={`/profile/${userData.username}`}>
                <AvatarImage
                  src={userData.profileImg}
                  className="w-12 h-12 object-cover rounded-full mx-4"
                />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
