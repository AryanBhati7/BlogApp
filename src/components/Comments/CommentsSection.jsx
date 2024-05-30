import React from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useDispatch } from "react-redux";

import {
  addComment,
  deleteComment,
  editComment,
} from "../../features/postSlice";
import CommentLoading from "../Loading/CommentLoading";

function CommentsSection({ userId, postId, postComments }) {
  const comments = postComments;
  const dispatch = useDispatch();

  const handleAddComment = async (comment) => {
    await dispatch(addComment({ userId, postId, comment }));
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId));
  };

  const handleUpdateComment = async (commentId, comment) => {
    await dispatch(editComment({ commentId, comment }));
  };

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
          comments.map((comment) =>
            comment ? (
              <Comment
                key={comment.$id}
                comment={comment}
                userId={userId}
                user={comment.user}
                onDeleteComment={handleDeleteComment}
                onUpdateComment={handleUpdateComment}
              />
            ) : (
              <CommentLoading />
            )
          )}
      </div>
    </section>
  );
}

export default CommentsSection;
