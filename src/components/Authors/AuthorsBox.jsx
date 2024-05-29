import React, { useEffect } from "react";
import { Author } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/usersSlice";

function AuthorsBox() {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.users.users);
  useEffect(() => {
    if (authors.length === 0) dispatch(fetchUsers());
  }, [dispatch, JSON.stringify(authors)]);
  return (
    <>
      <div className="flex flex-col py-4  lg:w-full gap-8 lg:mx-auto bg-gray-100 dark:bg-[#262f40] border border-gray-400 rounded-lg shadow-md md:w-full">
        <ul className="lg:-mx-4 -ml-4 mx-0">
          {authors &&
            authors.map((author) => (
              <li key={author.accountId} className="flex items-center p-2">
                <Author
                  authorusername={author.username}
                  numberOfPosts={author.posts.length}
                  profileImg={author.profileImg}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default AuthorsBox;
