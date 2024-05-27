import React from "react";
import { PostCardLoading, PostCard } from "./index";
import { useSelector } from "react-redux";
function RecentPosts({ currentPostId }) {
  const posts = useSelector((state) => state.posts.publicPosts);
  const postsStatus = useSelector((state) => state.posts.status);
  const recentPosts = posts.filter((post) => post.$id !== currentPostId);
  const isLoading = postsStatus === "loading";

  return (
    <section className="py-2 sm:py-8 lg:py-4">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-2 md:mb-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:mb-6 lg:text-3xl">
            Recent Posts
          </h2>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-12">
          {isLoading ? (
            <PostCardLoading />
          ) : (
            recentPosts.map((recentPost) => (
              <div key={recentPost.$id}>
                <PostCard post={recentPost} contentLength={60} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default RecentPosts;
