import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ProfileAvatar,
  UserInformation,
  PostCardLoading,
  PostCard,
} from "../components/index";
import { fetchMyPosts } from "../features/postSlice";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { username } = useParams();
  const postsStatus = useSelector((state) => state.posts.status);
  const isLoading = postsStatus === "loading";
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.myPosts);
  const currentUserInfo = useSelector((state) => state.auth.userData);

  const allUsers = useSelector((state) => state.users.users);

  const isUser =
    userInfo && currentUserInfo
      ? userInfo.accountId === currentUserInfo.accountId
      : false;

  useEffect(() => {
    const user = allUsers.find((user) => user.username === username);
    if (user) {
      setUserInfo(user);
    }
    dispatch(fetchMyPosts(user.accountId));
  }, [allUsers, username]);

  return userInfo ? (
    <>
      <ProfileAvatar userInfo={userInfo} isUser={isUser} />
      <UserInformation userInfo={userInfo} />
      <section className="py-2 sm:py-8 lg:py-4">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-2 md:mb-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:mb-6 lg:text-3xl">
              {isUser ? "My Posts" : `${userInfo.name}'s Posts`}
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            {isLoading ? (
              <PostCardLoading />
            ) : (
              posts &&
              posts.map((post) => (
                <div key={post.$id}>
                  <PostCard post={post} uploadedBy={false} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  ) : null;
}

export default Profile;
