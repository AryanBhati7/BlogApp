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
    <Link to={`/post/${$id}`} className="w-96 m-auto block">
      <div className="p-56">
        <div className="w-96 m-auto ">
          <div className=" grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
            {/* {featuredImage} */}
            <div className="col-span-3 row-span-4 p-1 m-1">
              <img
                src={appwriteService.getFilePreview(featuredImage)}
                alt={title}
                className="rounded-t-xl object-cover h-48 w-full"
              />
            </div>

            {/* {User Avatar} */}
            <div className="col-span-3 row-span-1">
              <div className="flex align-bottom flex-col leading-none p-2 md:p-4">
                <Avatar className="flex flex-row justify-between items-center">
                  <AvatarImage className="block rounded-full" />
                  <AvatarName className="ml-2 text-sm" />
                </Avatar>
              </div>
            </div>

            {/* {Title Time of Post} */}
            <div className="col-span-3 row-span-1">
              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <a
                    className="no-underline hover:underline text-black"
                    href="#"
                  >
                    {title}
                  </a>
                </h1>
                <p className="text-grey-darker text-sm">
                  {new Date($createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                  })}
                  {" ("}
                  {formatDistanceToNow(new Date($createdAt), {
                    addSuffix: true,
                  })}
                  {")"}
                </p>
              </header>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 row-span-1">
        <ul className="flex flex-row pl-2 text-gray-600 overflow-x-scroll hide-scroll-bar">
          <li className="py-1">
            <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
              <a className="" href="#">
                #hogehoge
              </a>
            </div>
          </li>
          <li className="py-1">
            <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
              <a className="" href="#">
                #fugafuga
              </a>
            </div>
          </li>

          <li className="py-1">
            <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
              <a className="" href="#">
                #foofoo
              </a>
            </div>
          </li>
          <li className="py-1">
            <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
              <a className="" href="#">
                #barbarbar
              </a>
            </div>
          </li>
          <li className="py-1">
            <div className="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800">
              <a className="" href="#">
                #hogefugafoo
              </a>
            </div>
          </li>
        </ul>
      </div>
    </Link>
  );
}

export default PostCard;
