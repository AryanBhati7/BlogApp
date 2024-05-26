import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../appwrite/config";
import authService from "../appwrite/auth";

import save from "../assets/img/save.svg";
import saved from "../assets/img/saved.svg";
import like from "../assets/img/like.svg";
import liked from "../assets/img/liked.svg";
import { checkAuthStatus, updateUserData } from "../features/authSlice";
function PostStats({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const [user, setUser] = useState(userData);
  console.log(userData, "User");
  console.log(post, "Post");
  const dispatch = useDispatch();
  const likesList = post.likes.map((user) => user.$id);
  const savedList = user.saved.map((post) => post.$id);

  const [likes, setLikes] = useState(likesList);
  const [saves, setSaves] = useState(savedList);

  const checkIfLiked = (likes, userId) => {
    return likes.includes(userId) ? true : false;
    // likes.includes(userData.accountId) ? setLikes(likes.filter((id) => id !== userData.accountId)) : setLikes([...likes, userData.accountId]);
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
    userService.likePost(post.$id, likesArray).then((res) => {
      console.log(res, "LikePost");
      dispatch(checkAuthStatus());
    });
  };
  const handleSavePost = (e) => {
    let savedArray = [...saves];
    if (savedArray.includes(post.$id)) {
      savedArray = savedArray.filter((Id) => Id !== post.$id);
    } else {
      savedArray.push(post.$id);
    }
    setSaves(savedArray);
    userService.savePost(user.$id, savedArray).then((res) => {
      console.log(res, "SavePost");
      dispatch(checkAuthStatus());
    });
  };

  return (
    <div className="stats   border-t-neutral-100 border-b-neutral-100 border-t-2 border-b-2 flex justify-between items-center py-2">
      <div className="likes-comment">
        <img
          src={checkIfLiked(likes, user.$id) ? liked : like}
          alt="save"
          width={"30px"}
          height={"30px"}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <span>{likes ? likes.length : 0}</span>{" "}
      </div>
      <div>
        <img
          src={checkIfSaved(saves, post.$id) ? saved : save}
          alt="save"
          width={"30px"}
          height={"30px"}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
    </div>
  );
}

export default PostStats;
