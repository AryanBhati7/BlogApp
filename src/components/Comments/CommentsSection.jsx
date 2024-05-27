import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { userService } from "../../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts, fetchPublicPosts } from "../../features/postSlice";
import CommentLoading from "../Loading/CommentLoading";

function Comments({ userId, postId }) {
  const publicPosts = useSelector((state) => state.posts.publicPosts);
  const myPosts = useSelector((state) => state.posts.myPosts);
  const postFetchingStatus = useSelector((state) => state.posts.loading);
  const myPostsFetchingStatus = useSelector(
    (state) => state.posts.myPostsLoading
  );
  const isLoading = postFetchingStatus || myPostsFetchingStatus;

  // const post = posts.find((post) => post.id === postId);
  const post =
    myPosts.find((post) => post.$id === postId) ||
    publicPosts.find((post) => post.$id === postId);
  const commentsFromPost = post ? post.comments : [];
  const [comments, setComments] = useState(commentsFromPost);
  const dispatch = useDispatch();

  const handleAddComment = async (comment) => {
    const newComment = await userService.addComment(userId, postId, comment);
    setComments([...comments, newComment]);
    dispatch(fetchMyPosts());
    dispatch(fetchPublicPosts());
  };

  const handleDeleteComment = async (commentId) => {
    await userService.deleteComment(commentId);
    setComments(comments.filter((comment) => comment.$id !== commentId));
    dispatch(fetchMyPosts());
    dispatch(fetchPublicPosts());
  };

  const handleUpdateComment = async (commentId, comment) => {
    const updatedComment = await userService.updateComment(commentId, comment);
    setComments(
      comments.map((c) => (c.$id === commentId ? updatedComment : c))
    );
    dispatch(fetchMyPosts());
    dispatch(fetchPublicPosts());
  };
  if (isLoading) {
    return <CommentLoading />;
  }

  return (
    <section className="not-format px-16 mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion ({comments.length})
        </h2>
      </div>
      <CommentForm onAddComment={handleAddComment} />
      <div className="overflow-hidden">
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment.$id}
              comment={comment}
              userId={userId}
              user={comment.user}
              onDeleteComment={handleDeleteComment}
              onUpdateComment={handleUpdateComment}
            />
          ))}
      </div>
    </section>
  );
}

export default Comments;
