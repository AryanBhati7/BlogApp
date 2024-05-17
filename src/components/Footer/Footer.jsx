import React from "react";
import githubLogo from "../../assets/img/github.png";

function Footer() {
  return (
    <footer className="bg-background text-primary px-6 mt-8 fixed bottom-0 left-0 w-full">
      <div className="flex justify-center items-center space-x-4 flex-col gap-2">
        <p className="text-center text-sm">© BlogApp Made by Aryan Bhati</p>
        <a
          href="https://github.com/AryanBhati7/BlogApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex gap-3">
            <span className="text-sm">Repo Link : </span>
            <img src={githubLogo} alt="Github logo" className="h-6 w-6" />
          </div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
