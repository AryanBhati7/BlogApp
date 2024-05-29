import { PostCard, PostCardLoading } from "../components/index";
import { fetchMyPosts } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Saves() {
  const currentUser = useSelector((state) => state.auth.userData);
  const posts = currentUser.saved;
  const postsStatus = useSelector((state) => state.posts.loading);
  const currentUserStatus = useSelector((state) => state.auth.loading);
  const authorsStatus = useSelector((state) => state.users.loading);

  const isLoading = postsStatus || authorsStatus || currentUserStatus;

  if (posts.length === 0) {
    return (
      <div className="dark:text-gray-400 text-gray-800 py-10 ml-12  w-full flex px-20 text-3xl font-bold h-screen">
        No Posts have been saved
      </div>
    );
  }
  return (
    <div className="w-screen lg:pr-48">
      <div className="px-5 lg:px-24 mt-4 flex flex-col justify-center">
        <h1 className="mb-3 ml-8 text-2xl font-bold text-gray-800 dark:text-gray-200  md:text-2xl">
          Saved Posts
        </h1>
        <div className="px-6  lg:ml-2 lg:w-full flex flex-col gap-8">
          {isLoading ? (
            <PostCardLoading />
          ) : (
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard post={post} contentLength={200} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Saves;
