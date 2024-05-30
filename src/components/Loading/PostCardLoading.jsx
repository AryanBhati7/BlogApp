import React from "react";

function PostCardLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="group rounded-xl w-full overflow-hidden sm:flex bg-gray-200 animate-pulse mx-auto ">
        <div className="flex space-x-2 py-6  px-3 lg:px-0 flex-col md:flex-row w-full overflow-hidden">
          <div className="relative rounded-xl lg:mx-4 overflow-hidden w-full md:w-1/3 lg:w-1/4 h-48 md:h-48 lg:h-60 bg-gray-300"></div>
          <div className="flex-1 space-y-4 py-1 mt-6 lg:mt-0 pr-8">
            <div className="h-6 bg-gray-400 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-400 rounded w-3/12"></div>
              <div className="h-2 bg-gray-400 rounded w-full "></div>
              <div className="h-2 bg-gray-400 rounded w-full"></div>
              <div className="h-2 bg-gray-400 rounded w-full"></div>
              <div className="h-2 bg-gray-400 rounded w-full"></div>
              <div className="h-2 bg-gray-400 rounded w-full"></div>
              <div className="h-2 bg-gray-400 rounded w-full"></div>

              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded w-3/6"></div>
                    <div className="h-4 bg-gray-400 rounded w-3/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCardLoading;
