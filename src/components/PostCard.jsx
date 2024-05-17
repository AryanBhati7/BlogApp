import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarImage, AvatarName } from "./index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCreatorInfo } from "../features/creatorSlice";

function PostCard({ $id, title, featuredImage, $createdAt, userId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getUserInfo(userId).then((response) => {
      if (response && response.documents && response.documents.length > 0) {
        const info = response.documents[0];
        console.log(info);
        dispatch(setCreatorInfo(info));
      }
    });
  }, [userId]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <Avatar className="flex gap-3 items-center">
          <AvatarImage />
          <AvatarName />
        </Avatar>
        <div>
          {new Date($createdAt).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
          })}
          {" ("}
          {formatDistanceToNow(new Date($createdAt), { addSuffix: true })}
          {")"}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
