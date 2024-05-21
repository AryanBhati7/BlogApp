import React from "react";

function PostLoading() {
  return (
    <div className="p-2 mx-auto sm:p-10 md:p-16">
      <div className="flex flex-col max-w-6xl max-h-2xl mx-auto overflow-hidden rounded">
        <div className="animate-pulse bg-gray-200 rounded-md h-60 sm:h-96 w-full"></div>
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:min-w-4xl sm:px-10 sm:mx-12 lg:rounded-md">
          <div className="space-y-2">
            <div className="animate-pulse bg-gray-200 h-6 w-1/2"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-1/4"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-4 w-full"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-3/4"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default PostLoading;
