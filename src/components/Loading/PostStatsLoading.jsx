import React from "react";

function PostStatsLoading() {
  return (
    <div className="stats px-3 border-t-neutral-100 border-b-neutral-100 border-t-2 border-b-2 flex justify-between items-center py-2">
      <div className="likes-comment flex justify-center items-center gap-2 animate-pulse">
        <div className="rounded-full bg-gray-400 h-6 w-6"></div>
        <div className="h-4 bg-gray-400 rounded w-16"></div>
      </div>
      <div className="savepost flex justify-center items-center gap-3 animate-pulse">
        <div className="rounded-full bg-gray-400 h-6 w-6"></div>
        <div className="h-4 bg-gray-400 rounded w-24"></div>
      </div>
    </div>
  );
}

export default PostStatsLoading;
