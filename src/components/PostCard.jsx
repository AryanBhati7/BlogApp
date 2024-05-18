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
    <Link to={`/post/${$id}`} className="w-80 m-auto block">
      <div className="mx-auto px-4 max-w-lg ">
        <div className="bg-gray-600 dark:bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
          <div className="">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-64 rounded-lg rounded-b-none"
            />
          </div>
          <div className="px-4 py-2 mt-2">
            <h2 className="font-bold text-2xl dark:text-gray-800 text-white tracking-normal">
              {title}
            </h2>
            <div className="flex items-center justify-between mt-2 text-lg ">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-gray-200 px-2 py-0.5 flex items-center text-xs font-semibold uppercase rounded-full">
                  Tag 1
                </span>
                <span className="bg-gray-200 px-2 py-0.5 flex items-center text-xs font-semibold uppercase rounded-full">
                  Tag 2
                </span>
              </div>
              <div className="flex items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#e10112"
                    d="M12.001 4.529a5.998 5.998 0 0 1 8.242.228a6 6 0 0 1 .236 8.236l-8.48 8.492l-8.478-8.492a6 6 0 0 1 8.48-8.464"
                  ></path>
                </svg>
                <span className="text-white dark:text-black">5</span>
              </div>
            </div>
            <div className="author flex items-center -ml-3 my-3">
              <AvatarImage className="w-12 h-12 object-cover rounded-full mx-4  shadow" />

              <h2 className="text-lg tracking-tighte gap-4 text-white dark:text-black">
                By <AvatarName />
                <br></br>
                <span className="dark:text-gray-600 text-gray-200">
                  {new Date($createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                  })}
                  {" ("}
                  {formatDistanceToNow(new Date($createdAt), {
                    addSuffix: true,
                  })}
                  {")"}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
