import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Landingpage, Author } from "../components/index";
import { getPublicPosts as getPublicPostsSlice } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";

// import Author from "../components/index";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.publicPosts);
  const authStatus = useSelector((state) => state.auth.status);

  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    if (authStatus) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          console.log(posts);
          dispatch(getPublicPostsSlice({ posts: posts.documents }));
        }
      });
      authService.getAllUsers().then((allUsers) => {
        if (allUsers) {
          const authorsData = allUsers.map((user) => {
            return appwriteService
              .getPostsByUser(user.accountId)
              .then((data) => {
                return {
                  userId: user.accountId,
                  username: user.name,
                  profileImg: user.profileImg,
                  numberOfPosts: data.total,
                };
              });
          });

          Promise.all(authorsData).then(setAuthors);
          console.log(authors);
        } else {
          console.log("errors");
        }
      });
    }
  }, []);

  if (authStatus === false) {
    return <Landingpage />;
  }
  return (
    <div className="flex flex-wrap px-16 py-4 gap-6 w-full">
      <div class="w-full lg:w-8/12">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.$id} className="p-2">
          <PostCard {...post} />
        </div>
      ))}
      <div className="hidden w-4/12 -mx-8 lg:block ">
        <div className="px-8">
          <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
          <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-gray-100 dark:bg-[#262f40] border border-gray-400 rounded-lg shadow-md">
            <ul className="-mx-4">
              {authors.map((author) => (
                <Author {...author} key={author.userId} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
