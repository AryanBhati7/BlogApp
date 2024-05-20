import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { AvatarImage, AvatarName, PostCardLoading } from "./index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function PostCard({ $id, title, featuredImage, $createdAt, userId, content }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  console.log(users);
  const creatorInfo = users.find((user) => user.userId === userId);
  console.log(creatorInfo);

  function truncateHtmlContent(html, length) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  }
  return (
    <Link
      to={`/post/${$id}`}
      className="group p-5 ml-12 rounded-xl max-w-4xl overflow-hidden sm:flex bg-gray-100 dark:bg-[#262f40] border border-gray-400"
    >
      <div className="relative rounded-xl overflow-hidden w-[36rem] sm:w-56 h-60 flex-none">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
        />
      </div>
      <div className="mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-600 dark:text-neutral-100 dark:group-hover:text-white">
          {title}
        </h3>
        <div className="flex gap-2 flex-wrap mt-2">
          <span className="bg-gray-200 px-2 py-0.5 flex items-center text-xs font-semibold uppercase rounded-full">
            Tag 1
          </span>
          <span className="bg-gray-200 px-2 py-0.5 flex items-center text-xs font-semibold uppercase rounded-full">
            Tag 2
          </span>
        </div>
        <p className="mt-3 text-gray-600 dark:text-neutral-300">
          {/* {parse(content, options)} */}
          {truncateHtmlContent(content, 150)}
          {/* {content.length > 400 ? `${content.substring(0, 400)}...` : content} */}
        </p>
        <p className="mt-4 inline-flex items-center gap-x-1 dark:text-blue-300  text-blue-600 decoration-2 hover:underline font-medium">
          Read more
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </p>
        <div className="author flex items-center -ml-3 my-3">
          <AvatarImage
            src={creatorInfo.profileImg}
            className="w-12 h-12 object-cover rounded-full mx-4  shadow"
          />
          <h2 className="text-lg tracking-tight text-gray-800 dark:text-neutral-100">
            By <AvatarName name={"@" + creatorInfo.username} />
            <br></br>
            <span className="text-gray-600 dark:text-gray-200">
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
    </Link>
  );
}

export default PostCard;
