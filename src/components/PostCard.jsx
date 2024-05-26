import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { AvatarImage, AvatarName, PostCardLoading } from "./index";
import { useSelector } from "react-redux";

function PostCard({ post, uploadedBy = true }) {
  const creatorInfo = post.creator;
  const user = useSelector((state) => state.auth.userData);

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

        {uploadedBy ? (
          <div className="flex justify-between items-center mt-8">
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
