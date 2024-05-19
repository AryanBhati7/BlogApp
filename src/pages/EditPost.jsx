import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((post) => {
        if (post) {
          setPosts(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [postId, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
