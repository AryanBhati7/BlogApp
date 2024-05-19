import React from "react";
import { ProfileAvatar, UserInformation } from "../components/index";
import { useSelector } from "react-redux";

function Profile() {
  const userInfo = useSelector((state) => state.auth.userData);
  return (
    <div>
      <ProfileAvatar userInfo={userInfo} />
      <UserInformation userInfo={userInfo} />
    </div>
  );
}

export default Profile;
