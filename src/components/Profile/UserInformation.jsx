import React from "react";

function UserInformation({ userInfo }) {
  return (
    <div className="w-full my-auto py-6 flex flex-col justify-center gap-2 bg-dark-bg shadow-xl pb-8">
      <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
        <div className="w-full mx-8">
          <div className="text-gray-900 dark:text-white">
            <div className="flex flex-col pb-3 border-b border-gray-200 dark:border-gray-700 mb-3">
              <div className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Full Name
              </div>
              <div className="text-lg font-semibold">Samuel</div>
            </div>
            <div className="flex flex-col py-3 border-b border-gray-200 dark:border-gray-700 mb-3">
              <div className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Date Of Birth
              </div>
              <div className="text-lg font-semibold">21/02/1997</div>
            </div>
            <div className="flex flex-col py-3 border-b border-gray-200 dark:border-gray-700 mb-3">
              <div className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Gender
              </div>
              <div className="text-lg font-semibold">Male</div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="text-gray-900 dark:text-white">
            <div className="flex flex-col pb-3 border-b border-gray-200 dark:border-gray-700 mb-3">
              <div className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Location
              </div>
              <div className="text-lg font-semibold">Ethiopia, Addis Ababa</div>
            </div>

            <div className="flex flex-col py-3 border-b border-gray-200 dark:border-gray-700 mb-3">
              <div className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Email
              </div>
              <div className="text-lg font-semibold">
                samuelabera87@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
