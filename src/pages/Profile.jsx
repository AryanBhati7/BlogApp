import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileAvatar, UserInformation } from "../components/index";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { username } = useParams();

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
  }, [allUsers, username]);

  return userInfo ? (
    <div>
      <ProfileAvatar userInfo={userInfo} isUser={isUser} />
      <UserInformation userInfo={userInfo} />
    </div>
  ) : null;
}

export default Profile;
