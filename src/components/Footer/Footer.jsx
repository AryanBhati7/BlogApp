import React from "react";
import githubLogo from "../../assets/img/github.png";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-background dark:bg-dark-bg text-primary dark:text-dark-primary px-6 py-4  bottom-0 left-0 w-full">
      <div className="flex justify-center items-center space-x-4 flex-col gap-2">
        <p className="text-center text-sm">© BlogApp Made by Aryan Bhati</p>
        <a
          href="https://github.com/AryanBhati7/BlogApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex gap-3">
            <span className="text-sm">Repo Link : </span>
            <FaGithub className="h-5 w-5" />
          </div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
