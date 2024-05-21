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

  const postsStatus = useSelector((state) => state.posts.status);
  const authorsStatus = useSelector((state) => state.users.status);

  const isLoading = postsStatus === "loading" || authorsStatus === "loading";

  if (authStatus === false) {
    return <Landingpage />;
  }
  return (
    <div className="maincontainer overflow-x-hidden flex flex-wrap px-5 lg:px-16 py-4 gap-6 w-screen dark:bg-dark-bg bg-background flex-col lg:flex-row md:flex-row">
      <div className="w-full lg:w-[58rem] flex flex-col justify-between lg:ml-12 ml-3">
        <h1 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-200 lg:ml-6 md:text-2xl">
          Posts
        </h1>
        <div className="px-4 -ml-6  lg:ml-2 lg:w-full flex flex-col gap-8">
          {isLoading ? (
            <PostCardLoading />
          ) : (
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:w-[28rem] w-full lg:-mx-8 mx-0 lg:block px-2">
        <div className="lg:px-8">
          <div className="w-full flex justify-between  ml-3 lg:ml-1">
            <h1 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-2xl">
              Authors
            </h1>
          </div>

          <div className="flex flex-col py-4 -ml-0 lg:w-full gap-8 lg:mx-auto bg-gray-100 dark:bg-[#262f40] border border-gray-400 rounded-lg shadow-md w-full">
            <ul className="lg:-mx-4 -ml-4 mx-0">
              {isLoading ? (
                <AuthorsLoading />
              ) : (
                authors.map((author) => (
                  <li key={author.accountId} className="flex items-center p-3">
                    <Author {...author} />
                  </li>
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
