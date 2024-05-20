import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
// import { getAllPosts as getAllPostsSlice } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../features/postSlice";
function AllPost() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.allPosts);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (!authStatus) return;
    dispatch(fetchAllPosts());
  }, []);
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

export default AllPost;
