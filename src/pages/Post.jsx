import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fileService } from "../appwrite/config";
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

export default function Post() {
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
  const isAuthor =
    creatorInfo && creatorInfo.accountId === userData.accountId ? true : false;

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const actionResult = await dispatch(deletePostAction(post.$id));
      if (actionResult) {
        await fileService.deleteFile(post.featuredImage);
        navigate("/");
      }
    }
  };

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
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col  gap-5 justify-between h-full">
              {/* <button className="flex justify-end "> */}

              <SharePost postLink={postUrl} postTitle={post.title} />

              <div className="justify-end">
                {isAuthor && (
                  <div className="flex">
                    <Link to={`/edit-post/${post.$id}`}>
                      <Button className="mr-3 w-20 px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={deletePost}
                      className=" w-20 px-4 py-2 text-white font-bold rounded bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <PostStats post={post} />
          <div className="text-gray-600 dark:text-neutral-300 text-xl text-justify leading-relaxed">
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
