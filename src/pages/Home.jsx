import React, { useEffect } from "react";
import {
  PostCard,
  Landingpage,
  AuthorsBox,
  AuthorsLoading,
  PostCardLoading,
} from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { fetchPublicPosts } from "../features/postSlice";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.publicPosts);
  console.log(posts);
  const postsStatus = useSelector((state) => state.posts.loading);
  const authStatus = useSelector((state) => state.auth.status);
  const isLoading = postsStatus;

  if (authStatus === false) {
    return <Landingpage />;
  }

  useEffect(() => {
    if (posts.length === 0) dispatch(fetchPublicPosts());
  }, [dispatch]);

  return (
    <div className="maincontainer overflow-x-hidden flex  px-5 lg:px-20 py-4  w-screen dark:bg-dark-bg bg-background flex-col lg:flex-row md:flex-col sm:flex-col">
      <div className="w-full lg:w-[58rem] flex flex-col">
        <h1 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-200  md:text-2xl">
          Posts
        </h1>
        <div className="lg:w-full flex flex-col gap-8">
          {isLoading ? (
            <PostCardLoading />
          ) : (
            posts &&
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:w-[28rem] w-full  mx-0 lg:block px-2">
        <div className="lg:px-8">
          <div className="w-full flex mt-2 lg:ml-1">
            <h1 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-2xl">
              Authors
            </h1>
          </div>
          {isLoading ? <AuthorsLoading /> : <AuthorsBox />}
        </div>
      </div>
    </div>
  );
}

export default Home;
