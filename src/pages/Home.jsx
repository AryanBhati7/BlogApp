import React, { useState, useEffect } from "react";
import { fetchPublicPosts } from "../features/postSlice";
import { fetchUsers } from "../features/usersSlice";
import {
  Container,
  PostCard,
  Landingpage,
  Author,
  AuthorsLoading,
  PostCardLoading,
} from "../components/index";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.publicPosts);
  const authStatus = useSelector((state) => state.auth.status);
  const authors = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.userData);
  console.log(currentUser);
  const postsStatus = useSelector((state) => state.posts.loading);
  const currentUserStatus = useSelector((state) => state.auth.loading);
  const authorsStatus = useSelector((state) => state.users.loading);
  const isLoading = postsStatus || authorsStatus || currentUserStatus;
  useEffect(() => {
    if (authors.length === 0) dispatch(fetchUsers());
  }, [dispatch]);

  if (authStatus === false) {
    return <Landingpage />;
  }

  return (
    <div className="maincontainer overflow-x-hidden flex  px-5 lg:px-16 py-4 gap-6 w-screen dark:bg-dark-bg bg-background flex-col lg:flex-row md:flex-col sm:flex-col">
      <div className="w-full lg:w-[58rem] flex flex-col lg:ml-12 ml-3">
        <h1 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-200 lg:ml-6 md:text-2xl">
          Posts
        </h1>
        <div className="px-4 -ml-6  lg:ml-2 lg:w-full flex flex-col gap-8">
          {isLoading ? (
            <PostCardLoading />
          ) : (
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:w-[28rem] w-full lg:-mx-8 mx-0 lg:block px-2">
        <div className="lg:px-8">
          <div className="w-full flex  ml-3 lg:ml-1">
            <h1 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-2xl">
              Authors
            </h1>
          </div>

          <div className="flex flex-col py-4  lg:w-full gap-8 lg:mx-auto bg-gray-100 dark:bg-[#262f40] border border-gray-400 rounded-lg shadow-md md:w-full">
            <ul className="lg:-mx-4 -ml-4 mx-0">
              {isLoading ? (
                <AuthorsLoading />
              ) : (
                authors.map((author) => (
                  <li key={author.accountId} className="flex items-center p-2">
                    <Author
                      authorusername={author.username}
                      numberOfPosts={author.posts.length}
                      profileImg={author.profileImg}
                    />
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
