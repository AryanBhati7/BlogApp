import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const posts = useSelector((state) => state.posts.publicPosts);
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.$id === postId);
  if (!post) {
    navigate("/");
  }
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
