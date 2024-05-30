import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostStatsLoading from "./Loading/PostStatsLoading";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { IconContext } from "react-icons";
import { savePost } from "../features/authSlice";
import { likePost } from "../features/postSlice";
function PostStats({ post }) {
  const user = useSelector((state) => state.auth.userData);
  const postFetchingStatus = useSelector((state) => state.posts.loading);
  const myPostsFetchingStatus = useSelector(
    (state) => state.posts.myPostsLoading
  );

  const dispatch = useDispatch();
  const likesList = post?.likes?.map((user) => user.$id);
  const savedList = user?.saved?.map((post) => post.$id);

  const [likes, setLikes] = useState(likesList);
  const [saves, setSaves] = useState(savedList);

  const checkIfLiked = (likes, userId) => {
    return likes.includes(userId) ? true : false;
  };
  const checkIfSaved = (saves, postId) => {
    return saves.includes(postId) ? true : false;
  };
  const handleLikePost = async (e) => {
    let likesArray = [...likes];

    if (likesArray.includes(user.$id)) {
      likesArray = likesArray.filter((Id) => Id !== user.$id);
    } else {
      likesArray.push(user.$id);
    }
    setLikes(likesArray);
    dispatch(likePost({ postId: post.$id, likesArray }));
  };
  const handleSavePost = (e) => {
    let savedArray = [...saves];
    if (savedArray.includes(post.$id)) {
      savedArray = savedArray.filter((Id) => Id !== post.$id);
    } else {
      savedArray.push(post.$id);
    }
    setSaves(savedArray);
    dispatch(savePost({ userId: user.$id, savedArray }));
  };

  return (
    <div className="stats px-3   border-t-neutral-100 border-b-neutral-100 border-t-2 border-b-2 flex justify-between items-center py-2">
      <div className="likes-comment flex justify-center items-center gap-2">
        <button onClick={handleLikePost}>
          <IconContext.Provider value={{ size: "1.5em" }}>
            {checkIfLiked(likes, user.$id) ? (
              <IoIosHeart className="text-red-500" /> // Change this to the icon you want to display when the post is liked
            ) : (
              <IoMdHeartEmpty className="text-gray-900 dark:text-gray-200" />
            )}
          </IconContext.Provider>
        </button>
        <span className="dark:text-gray-200 text-gray-900">
          {likes ? likes.length : 0}
        </span>{" "}
      </div>
      <div className="savepost flex justify-center items-center gap-3">
        <IconContext.Provider value={{ size: "1.5em" }}>
          {checkIfSaved(saves, post.$id) ? (
            <BsFillBookmarkFill
              className="cursor-pointer text-gray-800 dark:text-neutral-100"
              onClick={handleSavePost}
            />
          ) : (
            <BsBookmark
              className="cursor-pointer text-gray-800 dark:text-neutral-100"
              onClick={handleSavePost}
            />
          )}
        </IconContext.Provider>
        <span className="dark:text-gray-200 text-gray-900">
          {checkIfSaved(saves, post.$id) ? "Post Saved" : "Save Post"}{" "}
        </span>
      </div>
    </div>
  );
}

export default PostStats;
