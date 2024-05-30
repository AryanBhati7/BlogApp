import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fileService } from "../appwrite/config";
import Modal from "react-modal";
import { MdEdit, MdDelete } from "react-icons/md";

import {
  Button,
  CommentsSection,
  PostStats,
  SharePost,
} from "../components/index";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import {
  AvatarImage,
  AvatarName,
  PostLoading,
  RecentPosts,
} from "../components/index";
import { deletePostAction } from "../features/postSlice";
Modal.setAppElement("#root");

export default function Post() {
  a;
  const postfetchingStatus = useSelector((state) => state.posts.loading);
  const { postId } = useParams();
  const navigate = useNavigate();
  const postUrl = window.location.href;
  const dispatch = useDispatch();
  const publicPosts = useSelector((state) => state.posts.publicPosts);
  const myPosts = useSelector((state) => state.posts.myPosts);

  const userData = useSelector((state) => state.auth.userData);
  const post =
    publicPosts.find((post) => post.$id === postId) ||
    myPosts.find((post) => post.$id === postId);

  const creatorInfo = post ? post.creator : undefined;
  const isAuthor = post && post.userId === userData.accountId ? true : false;

  const deletePost = async () => {
    const actionResult = await dispatch(deletePostAction(post.$id));
    if (actionResult) {
      await fileService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  if (postfetchingStatus) return <PostLoading />;

  return post && creatorInfo ? (
    <div className="p-2 mx-auto sm:p-10 md:p-16 dark:bg-dark-bg dark:text-gray-800 w-screen">
      <div className="flex flex-col max-w-6xl max-h-2xl mx-auto  rounded">
        <div
          className="rounded-md h-60 sm:h-96 w-full"
          style={{
            backgroundImage: `url(${post.featuredImageURL})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxSizing: "border-box",
          }}
        ></div>

        <div className="content-container border border-gray-400 p-6 pb-12 m-4 lg:mx-12 -mt-16 mx-5 space-y-6 lg:min-w-4xl sm:px-12 sm:mx-12 rounded-md dark:bg-[#262f40] bg-gray-200">
          <div className=" flex  justify-between">
            <div className="flex flex-col lg:gap-3 gap-5 lg:w-6/12 w-8/12">
              <h2
                rel="noopener noreferrer"
                href="#"
                className="block text-2xl font-semibold sm:text-3xl text-gray-800  dark:text-neutral-100"
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
            <div className="flex flex-col gap-4 w-4/12 justify-between h-full">
              <SharePost postLink={postUrl} postTitle={post.title} />

              <div className="justify-end">
                {isAuthor && (
                  <div className="flex justify-end lg:gap-6 gap-2">
                    <Link to={`/edit-post/${post.$id}`} className="">
                      <button className=" p-2 flex gap-2 lg:px-5 px-3 justify-center items-center bg-green-600 text-white font-bold rounded hover:bg-green-700">
                        <MdEdit className="text-white" size={24} />
                        <span className="sm:block hidden">Edit</span>
                      </button>
                    </Link>

                    <button
                      onClick={openModal}
                      className=" p-2 px-3 flex justify-center items-center gap-2 text-white font-bold rounded bg-red-500 hover:bg-red-700"
                    >
                      <MdDelete className="text-white" size={24} />
                      <span className="sm:block hidden">Delete</span>
                    </button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Share Post"
                      className={
                        " min-h-screen overflow-hidden overflow-y-hidden bg-transparent flex items-center justify-center"
                      }
                      overlayClassName="fixed inset-0 bg-transparent"
                    >
                      <div className=" w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3 text-gray-800 dark:text-neutral-200 dark:bg-dark-bg bg-gray-200 border border-gray-200">
                        <div className="flex flex-col gap-5">
                          <p className="mx-auto text-xl font-bold text-gray-800 dark:text-neutral-50">
                            Are you Sure??
                          </p>
                          <div className="flex justify-center items-center gap-6">
                            <Button
                              onClick={deletePost}
                              className="w-20 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={closeModal}
                              className="w-20 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700"
                            >
                              No
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          </div>
          <PostStats post={post} />
          <div className="text-gray-600 dark:text-neutral-100 text-xl sm:text-justify text-center  leading-relaxed">
            {parse(post.content)}
          </div>
        </div>
      </div>
      {post && post.comments && (
        <CommentsSection
          userId={userData.$id}
          postComments={post.comments}
          postId={post.$id}
        />
      )}

      <RecentPosts currentPostId={postId} />
    </div>
  ) : (
    <PostLoading />
  );
}
