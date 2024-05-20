import React, { useState, useEffect } from "react";
import {
  Container,
  PostCard,
  Landingpage,
  Author,
  AuthorsLoading,
  PostCardLoading,
} from "../components/index";
import { useSelector } from "react-redux";

function Home() {
  const posts = useSelector((state) => state.posts.publicPosts);
  const authStatus = useSelector((state) => state.auth.status);
  const authors = useSelector((state) => state.users.users);
  console.log(authors);
  console.log(posts);
  const isLoading = posts.length === 0 || authors.length === 0;
  if (authStatus === false) {
    return <Landingpage />;
  }
  return (
    <div className="flex flex-wrap px-16 py-4 gap-6 w-full dark:bg-dark-bg bg-background">
      <div className="w-full flex justify-between ml-12 ">
        <div className="flex items-center w-8/12">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 md:text-2xl">
            Posts
          </h1>
        </div>
        <div className="flex w-4/12 justify-start pl-6">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 md:text-2xl">
            Authors
          </h1>
        </div>
      </div>
      <div className="w-8/12 flex flex-col gap-8">
        {isLoading ? (
          <PostCardLoading />
        ) : (
          posts.map((post) => (
            <div key={post.$id} className="">
              <PostCard {...post} />
            </div>
          ))
        )}
      </div>
      <div className="w-4/12 -mx-8 lg:block ">
        <div className="px-8">
          <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-gray-100 dark:bg-[#262f40] border border-gray-400 rounded-lg shadow-md">
            <ul className="-mx-4">
              {isLoading ? (
                <AuthorsLoading />
              ) : (
                authors.map((author) => (
                  <Author {...author} key={author.userId} />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
