import { PostCard, PostCardLoading } from "../components/index";
import { fetchMyPosts } from "../features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function AllPost() {
  const posts = useSelector((state) => state.posts.myPosts);
  const currentUser = useSelector((state) => state.auth.userData);
  console.log(posts);
  const postsStatus = useSelector((state) => state.posts.status);
  const isLoading = postsStatus === "loading";
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0) dispatch(fetchMyPosts(currentUser.accountId));
  }, [dispatch, currentUser]);

  return (
    <div className="px-5 lg:px-24 mt-4 flex flex-col justify-center">
      <h1 className="mb-3 ml-8 text-2xl font-bold text-gray-800 dark:text-gray-200  md:text-2xl">
        My Posts
      </h1>
      <div className="px-6  lg:ml-2 lg:w-full flex flex-col gap-8">
        {isLoading ? (
          <PostCardLoading />
        ) : (
          posts.map((post) => (
            <div key={post.$id}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllPost;
