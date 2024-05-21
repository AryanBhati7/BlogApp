import React from "react";
// import PostCard from "./PostCard";
import { PostCardLoading, PostCard } from "./index";
import { useSelector } from "react-redux";
function RecentPosts({ currentPostId }) {
  console.log(currentPostId);
  const posts = useSelector((state) => state.posts.publicPosts);
  console.log(posts);

  const postsStatus = useSelector((state) => state.posts.status);

  const recentPosts = posts.filter((post) => post.$id !== currentPostId);
  console.log(recentPosts);

  const isLoading = postsStatus === "loading";

  return (
    <section class="py-2 sm:py-8 lg:py-4">
      <div class="mx-auto max-w-screen-xl px-4 md:px-8">
        <div class="mb-2 md:mb-8">
          <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:mb-6 lg:text-3xl">
            Recent Posts
          </h2>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
          {isLoading ? (
            <PostCardLoading />
          ) : (
            recentPosts.map((recentPost) => (
              <div key={recentPost.$id}>
                <PostCard {...recentPost} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default RecentPosts;
