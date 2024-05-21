import { PostCard, PostCardLoading } from "../components/index";

import { useSelector } from "react-redux";

function AllPost() {
  const posts = useSelector((state) => state.posts.allPosts);
  console.log(posts);
  const postsStatus = useSelector((state) => state.posts.status);
  const isLoading = postsStatus === "loading";
  return (
    <>
      <h1 className="mb-3 ml-6 text-2xl font-bold text-gray-800 dark:text-gray-200 lg:ml-3 md:text-2xl">
        My Posts
      </h1>
      <div className="px-6  lg:ml-2 lg:w-full flex flex-col gap-8">
        {isLoading ? (
          <PostCardLoading />
        ) : (
          posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AllPost;
