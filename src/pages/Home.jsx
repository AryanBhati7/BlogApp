import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Landingpage } from "../components/index";
import { getPublicPosts as getPublicPostsSlice } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.publicPosts);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          dispatch(getPublicPostsSlice({ posts: posts.documents }));
        }
      });
    }
  }, []);

  if (authStatus === false) {
    return <Landingpage />;
  }
  return (
    <div className="flex flex-wrap px-28 py-4 gap-6 w-full">
      {posts.map((post) => (
        <div key={post.$id} className="p-2">
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
