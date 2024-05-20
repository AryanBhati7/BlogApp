import React from "react";
import { Link } from "react-router-dom";

function Author({ username, profileImg, numberOfPosts }) {
  return (
    <li className="flex items-center p-3">
      <img
        src={profileImg}
        alt="avatar"
        className="object-cover w-10 h-10 ml-6 mr-1 rounded-full "
      />
      <p>
        <Link
          to={`/profile/${username}`}
          className="mx-1 font-bold text-gray-700 hover:underline dark:text-neutral-100"
        >
          {username}
        </Link>
        <span className="text-sm font-light text-gray-600 dark:text-neutral-300">
          Created {numberOfPosts} Posts
        </span>
      </p>
    </li>
  );
}

export default Author;
