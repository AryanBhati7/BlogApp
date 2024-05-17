import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { getPublicPosts as getPublicPostsSlice } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.publicPosts);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        console.log(posts);
        dispatch(getPublicPostsSlice({ posts: posts.documents }));
      }
    });
  }, []);

  if (authStatus === false) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to Read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
