import React from "react";

function Author({ username, profileImg, numberOfPosts }) {
  return (
    <li class="flex items-center p-2">
      <img
        src={profileImg}
        alt="avatar"
        class="object-cover w-10 h-10 mx-4 rounded-full"
      />
      <p>
        <a href="#" class="mx-1 font-bold text-gray-700 hover:underline">
          {username}
        </a>
        <span class="text-sm font-light text-gray-700 dark:text-neutral-300">
          Created {numberOfPosts} Posts
        </span>
      </p>
    </li>
  );
}

export default Author;
