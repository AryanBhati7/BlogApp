import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import {
  AvatarImage,
  AvatarName,
  PostLoading,
  RecentPosts,
} from "../components/index";

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const allPublicPosts = useSelector((state) => state.posts.publicPosts);
  const allUsers = useSelector((state) => state.users.users);
  const userData = useSelector((state) => state.auth.userData);
  console.log(allPublicPosts);
  const post = allPublicPosts.find((post) => post.$id === postId);

  const creatorInfo = post
    ? allUsers.find((user) => user.accountId === post.userId)
    : null;
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  console.log(creatorInfo);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post && creatorInfo ? (
    <div className="p-2 mx-auto sm:p-10 md:p-16 dark:bg-dark-bg dark:text-gray-800">
      <div className="flex flex-col max-w-6xl max-h-2xl mx-auto overflow-hidden rounded">
        <div
          className="rounded-md h-60 sm:h-96 w-full"
          style={{
            backgroundImage: `url(${appwriteService.getFilePreview(
              post.featuredImage
            )})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxSizing: "border-box",
          }}
        ></div>

        <div className=" border border-gray-400 p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:min-w-4xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-[#262f40] bg-gray-200">
          <div className="space-y-6">
            <h2
              rel="noopener noreferrer"
              href="#"
              className="inline-block text-2xl font-semibold sm:text-3xl text-gray-800  dark:text-neutral-100"
            >
              {post.title}
            </h2>
            <div className="flex">
              <div className="flex justify-center items-center text-gray-600 dark:text-neutral-300 text-lg">
                By
              </div>
              <Link
                to={`/profile/${creatorInfo.username}`}
                className="text-xs flex"
              >
                <div>
                  <AvatarImage
                    src={creatorInfo ? creatorInfo.profileImg : ""}
                    className="w-12 h-12 object-cover rounded-full mx-4  shadow"
                  />
                </div>
                <div>
                  {creatorInfo ? (
                    <AvatarName
                      name={"@" + creatorInfo.username}
                      className="hover:underline text-gray-600 dark:text-neutral-200"
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
                </div>
              </Link>
            </div>
          </div>
          <div className="flex">
            {isAuthor && (
              <div className="flex justify-end">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <p className="text-gray-600 dark:text-neutral-300 text-xl text-justify leading-relaxed">
            {parse(post.content)}
          </p>
        </div>
      </div>

      <RecentPosts currentPostId={postId} />
    </div>
  ) : (
    <PostLoading />
  );
}
