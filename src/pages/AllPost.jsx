import { PostCard, PostCardLoading } from "../components/index";

import { useSelector } from "react-redux";

function AllPost() {
  const posts = useSelector((state) => state.posts.allPosts);
  console.log(posts);
  const postsStatus = useSelector((state) => state.posts.status);
  const isLoading = postsStatus === "loading";
  return (
    <div className="flex flex-wrap px-28 py-4 gap-6 w-full">
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
  );
}

export default AllPost;
