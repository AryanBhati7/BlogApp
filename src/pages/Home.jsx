import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { getPublicPosts as getPublicPostsSlice } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { Client, Account } from "appwrite";

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.publicPosts);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        dispatch(getPublicPostsSlice({ posts: posts.documents }));
      }
    });
  }, []);

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   appwriteService.getPosts().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     }
  //   });
  // }, []);

  if (posts.length === 0) {
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
