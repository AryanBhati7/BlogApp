import React, { useState } from "react";

import { userService } from "../../appwrite/config";

function CommentForm({ onAddComment }) {
  const [comment, setComment] = useState("");
  const submit = (e) => {
    e.preventDefault();
    onAddComment(comment);
    setComment("");
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <form className="mb-6 overflow-hidden" onSubmit={submit}>
      <div className="py-1 px-2 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="text-white">
          Your comment
        </label>
        <textarea
          id="comment"
          rows="6"
          className="p-3 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-400 rounded-full shadow-lg"
      >
        Post comment
      </button>
    </form>
  );
}

export default CommentForm;
