import React, { useState } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { AvatarImage, AvatarName } from "./index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { savePost } from "../features/authSlice";
import { fetchMyPosts, fetchPublicPosts } from "../features/postSlice";

function PostCard({ post, uploadedBy = true, contentLength = 180 }) {
  const dispatch = useDispatch();
  const creatorInfo = post.creator;
  const user = useSelector((state) => state.auth.userData);
  function truncateHtmlContent(html, length) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  }

  const savedList = user.saved.map((post) => post.$id);
  const [saves, setSaves] = useState(savedList);
  const checkIfSaved = (saves, postId) => {
    return saves.includes(postId) ? true : false;
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
    <div className="group p-3 w-full rounded-xl overflow-hidden flex flex-col md:flex-row bg-gray-100 dark:bg-[#262f40] border border-gray-400">
      <Link to={`/post/${post.$id}`}>
        <div className="relative rounded-xl overflow-hidden w-full md:w-[20rem] lg:w-60 h-60 flex-none ">
          <img
            src={post.featuredImageURL}
            alt={post.title}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
          />
        </div>
      </Link>
      <div className="mt-4 sm:mt-0 sm:ms-2 sm:px-2 w-full ">
        <Link to={`/post/${post.$id}`}>
          <div className="flex items-center justify-between mt-1 lg:mt-0 mr-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-600 dark:text-neutral-100 dark:group-hover:text-white">
              {post.title}
            </h3>
            <div className="flex flex-row gap-2 items-center justify-center ">
              <IconContext.Provider value={{ size: "1.5em" }}>
                <FaHeart className="text-gray-500 dark:text-gray-200" />
              </IconContext.Provider>
              <span className="text-md dark:text-neutral-100 text-gray-900">
                {post.likes.length}
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {post.tags &&
              post.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-0.5 flex items-center text-xs font-semibold uppercase rounded-full"
                  >
                    {tag}
                  </span>
                );
              })}
          </div>
          <div className="min-h-[6rem]">
            <p className="mt-3 text-gray-600 dark:text-neutral-300">
              {truncateHtmlContent(post.content, contentLength)}
            </p>
            <p className="inline-flex items-center gap-x-1 dark:text-blue-300  text-blue-600 decoration-2 hover:underline font-medium">
              Read more {">"}
            </p>
          </div>
        </Link>

        {uploadedBy ? (
          <div className="flex justify-between items-center">
            <div className="author flex items-center -ml-3 my-3">
              <AvatarImage
                src={creatorInfo ? creatorInfo.profileImg : ""}
                className="w-12 h-12 object-cover rounded-full mx-4  shadow"
              />
              <h2 className="text-lg tracking-tight text-gray-800 dark:text-neutral-100">
                By {/* <Link to={`/profile/${creatorInfo.username}`}> */}
                {creatorInfo ? (
                  <AvatarName
                    name={"@" + creatorInfo.username || ""}
                    className="hover:underline"
                  />
                ) : (
                  "Unknown"
                )}
                <br></br>
                <span className="text-gray-600 dark:text-gray-200">
                  {new Date(post.$createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                  })}
                  {" ("}
                  {formatDistanceToNow(new Date(post.$createdAt), {
                    addSuffix: true,
                  })}
                  {")"}
                </span>
              </h2>
            </div>

            <div className="mt-6 lg:mt-8">
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
            </div>
          </div>
        ) : (
          <div className="author flex items-center gap-2 mt-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="grey"
                d="M945 412H689c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h256c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8M811 548H689c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h122c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8M477.3 322.5H434c-6.2 0-11.2 5-11.2 11.2v248c0 3.6 1.7 6.9 4.6 9l148.9 108.6c5 3.6 12 2.6 15.6-2.4l25.7-35.1v-.1c3.6-5 2.5-12-2.5-15.6l-126.7-91.6V333.7c.1-6.2-5-11.2-11.1-11.2"
              ></path>
              <path
                fill="grey"
                d="M804.8 673.9H747c-5.6 0-10.9 2.9-13.9 7.7c-12.7 20.1-27.5 38.7-44.5 55.7c-29.3 29.3-63.4 52.3-101.3 68.3c-39.3 16.6-81 25-124 25c-43.1 0-84.8-8.4-124-25c-37.9-16-72-39-101.3-68.3s-52.3-63.4-68.3-101.3c-16.6-39.2-25-80.9-25-124s8.4-84.7 25-124c16-37.9 39-72 68.3-101.3s63.4-52.3 101.3-68.3c39.2-16.6 81-25 124-25c43.1 0 84.8 8.4 124 25c37.9 16 72 39 101.3 68.3c17 17 31.8 35.6 44.5 55.7c3 4.8 8.3 7.7 13.9 7.7h57.8c6.9 0 11.3-7.2 8.2-13.3c-65.2-129.7-197.4-214-345-215.7c-216.1-2.7-395.6 174.2-396 390.1C71.6 727.5 246.9 903 463.2 903c149.5 0 283.9-84.6 349.8-215.8c3.1-6.1-1.4-13.3-8.2-13.3"
              ></path>
            </svg>
            <h2 className="text-lg tracking-tight text-gray-800 dark:text-neutral-100">
              <span className="text-gray-600 dark:text-gray-200">
                {new Date(post.$createdAt).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                })}
                {" ("}
                {formatDistanceToNow(new Date(post.$createdAt), {
                  addSuffix: true,
                })}
                {")"}
              </span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
