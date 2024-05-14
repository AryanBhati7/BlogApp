import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { getAllPosts as getAllPostsSlice } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";

function AllPost() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.allPosts);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(getAllPostsSlice({ posts: posts.documents }));
      }
    });
  }, []);
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

export default AllPost;
