import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { userService } from "../../appwrite/config";
import { useDispatch } from "react-redux";
import { fetchMyPosts } from "../../features/postSlice";

function Comments({ userId, postComments, postId }) {
  console.log(postComments);
  const [comments, setComments] = useState(postComments || []);
  const dispatch = useDispatch();

  const handleAddComment = async (comment) => {
    const newComment = await userService.addComment(userId, postId, comment);
    console.log(newComment);
    setComments([...comments, newComment]);
    dispatch(fetchMyPosts());
    dispatch(fetchPublicPosts());
  };

  const handleDeleteComment = async (commentId) => {
    await userService.deleteComment(commentId);
    setComments(comments.filter((comment) => comment.$id !== commentId));
  };

  const handleUpdateComment = async (commentId, comment) => {
    console.log(commentId, comment);
    const updatedComment = await userService.updateComment(commentId, comment);
    setComments(
      comments.map((c) => (c.$id === commentId ? updatedComment : c))
    );
  };

  return (
    <section className="not-format px-16 mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion (20)
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
