import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { AvatarImage, AvatarName, PostCardLoading } from "./index";
import { useSelector } from "react-redux";

function PostCard({ post }) {
  console.log(post, "Post - PostCard");
  const creatorInfo = post.creator;
  function truncateHtmlContent(html, length) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  }
  return (
    <div className="group p-3 w-full rounded-xl overflow-hidden flex flex-col md:flex-row bg-gray-100 dark:bg-[#262f40] border border-gray-400">
      <Link to={`/post/${post.$id}`}>
        <div className="relative rounded-xl overflow-hidden w-full md:w-[18rem] lg:w-56 h-60 flex-none">
          <img
            src={post.featuredImageURL}
            alt={post.title}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
          />
        </div>
      </Link>
      <div className="mt-4 sm:mt-0 sm:ms-6 sm:px-2 w-full">
        <Link to={`/post/${post.$id}`}>
          <div className="flex items-center justify-between mt-1 lg:mt-0 mr-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-600 dark:text-neutral-100 dark:group-hover:text-white">
              {post.title}
            </h3>
            <div className="flex flex-row gap-1 items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ff0000"
                  d="m12.75 20.66l6.184-7.098c2.677-2.884 2.559-6.506.754-8.705c-.898-1.095-2.206-1.816-3.72-1.855c-1.293-.034-2.652.43-3.963 1.442c-1.315-1.012-2.678-1.476-3.973-1.442c-1.515.04-2.825.76-3.724 1.855c-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a1 1 0 0 0 .743-.34Z"
                ></path>
              </svg>
              <span className="text-md text-neutral-100">
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
          <p className="mt-3 text-gray-600 dark:text-neutral-300">
            {truncateHtmlContent(post.content, 180)}
          </p>
          <p className="mt-2 inline-flex items-center gap-x-1 dark:text-blue-300  text-blue-600 decoration-2 hover:underline font-medium">
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
        </Link>
        <div className="flex justify-between items-center mt-8">
          <div className="author flex items-center -ml-3 my-3">
            <AvatarImage
              src={creatorInfo ? creatorInfo.profileImg : ""}
              className="w-12 h-12 object-cover rounded-full mx-4  shadow"
            />
            <h2 className="text-lg tracking-tight text-gray-800 dark:text-neutral-100">
              By{" "}
              <Link to={`/profile/${creatorInfo.username}`}>
                {creatorInfo ? (
                  <AvatarName
                    name={"@" + creatorInfo.username}
                    className="hover:underline"
                  />
                ) : (
                  "Unknown"
                )}
              </Link>
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
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M5 21V5q0-.825.588-1.412T7 3h6v2H7v12.95l5-2.15l5 2.15V11h2v10l-7-3zM7 5h6zm10 4V7h-2V5h2V3h2v2h2v2h-2v2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
