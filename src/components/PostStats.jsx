import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../appwrite/config";
import authService from "../appwrite/auth";

import save from "../assets/img/save.svg";
import saved from "../assets/img/saved.svg";
import like from "../assets/img/like.svg";
import liked from "../assets/img/liked.svg";
import { updateUserData } from "../features/authSlice";
function PostStats({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const [user, setUser] = useState(userData);
  const dispatch = useDispatch();
  const likesList = post.likes.map((user) => user.$id);

  const getCurrentUser = () => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData);
          return userData;
        } else {
          console.log("GetCurrentuserFailed");
        }
      })
      .catch((error) => {
        console.error("Error getting current user:", error);
      });
  };

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const checkIfLiked = (likes, userId) => {
    return likes.includes(userId) ? true : false;
    // likes.includes(userData.accountId) ? setLikes(likes.filter((id) => id !== userData.accountId)) : setLikes([...likes, userData.accountId]);
  };
  const savedPostRecord = user.save.find(
    (record) => record.post.$id === post.$id
  );
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
    });
    authService.getCurrentUser().then((userData) => {
      console.log(userData);
      setUser(userData);
      dispatch(updateUserData({ userData }));
    });
  };
  const handleSavePost = (e) => {
    if (savedPostRecord) {
      setIsSaved(false);
      authService.getCurrentUser().then((userData) => {
        console.log(userData);
        setUser(userData);
        dispatch(updateUserData({ userData }));
      });
      return userService.unsavePost(savedPostRecord.$id);
    }
    userService.savePost(user.$id, post.$id).then((res) => {
      console.log(res, "SavePost");
    });
    setIsSaved(true);
    authService.getCurrentUser().then((userData) => {
      console.log(userData);
      setUser(userData);
      dispatch(updateUserData({ userData }));
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
          src={isSaved ? saved : save}
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
