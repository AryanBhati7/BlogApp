import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
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
    // {
    //   name: "Signup",
    //   slug: "/signup",
    //   active: !authStatus,
    // },
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
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-background dark:bg-dark-bg">
      <Container>
        <nav className="flex">
          <div className="mr-4">
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
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
