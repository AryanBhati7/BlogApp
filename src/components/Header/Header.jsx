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
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-background dark:bg-dark-bg">
      <nav className="flex">
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
                  className=" dark:text-white font-mono inline-bock px-6 py-2 text-2.5xl text-darken duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn className="dark:text-white font-mono inline-bock px-6 py-2 text-2.5xl text-darken duration-200 hover:bg-blue-100 rounded-full" />
            </li>
          )}
          <li>
            <ThemeToggler />
          </li>
          {authStatus && !loading && userData && (
            <li>
              <Link to="/profile">
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
