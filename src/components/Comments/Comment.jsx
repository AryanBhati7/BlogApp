import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function Comment({ comment, onDeleteComment, onUpdateComment, userId, user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [currentComment, setCurrentComment] = useState(comment.comment);
  const isAuthor = userId === comment.user.$id;
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleEditClick = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
  };
  const handleInputChange = (e) => {
    setEditedComment(e.target.value);
    setIsDropdownOpen(false);
  };

  const handleSaveClick = () => {
    onUpdateComment(comment.$id, editedComment);
    setCurrentComment(editedComment);
    setIsEditing(false);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <article className="p-6 mb-6 text-lg bg-white rounded-lg dark:bg-gray-800">
      <footer className="relative flex justify-between items-center mb-2">
        <div className="flex items-center flex-col sm:flex-row">
          <Link to={`/profile/${user.username}`}>
            <p className="inline-flex items-center mr-3 text-xl hover:underline text-gray-900 dark:text-white">
              <img
                className="mr-2 w-8 h-8 rounded-full"
                src={user.profileImg}
                alt="profile image"
              />
              {user.username}
            </p>
          </Link>

          <p className="text-md text-gray-600 dark:text-gray-400">
            {new Date(comment.$createdAt).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
            })}
            {" ("}
            {formatDistanceToNow(new Date(comment.$createdAt), {
              addSuffix: true,
            })}
            {")"}
          </p>
        </div>
        {isAuthor && (
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="absolute -top-2 right-0 inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
            onClick={handleDropdownClick}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
        )}

        {/* <!-- Dropdown menu --> */}
        <div
          ref={dropdownRef}
          className={`${
            isDropdownOpen ? "" : "hidden"
          } z-10 w-32 absolute top-2 right-7 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="text-md text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li
              onClick={handleEditClick}
              className="block cursor-pointer py-[6px] px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDeleteComment(comment.$id);
              }}
              className="block py-[6px] cursor-pointer px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </li>
          </ul>
        </div>
      </footer>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedComment}
            onChange={handleInputChange}
            className="bg-gray-100 border-2 border-neutral-200 dark:bg-gray-800 p-2 w-full rounded-lg mb-2 dark:text-gray-200"
          />
          <button
            onClick={handleSaveClick}
            className="p-2 bg-blue-500 rounded-xl px-4 text-white"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="dark:text-gray-200 text-gray-900 font-bold">
          {currentComment}
        </p>
      )}
    </article>
  );
}

export default Comment;
