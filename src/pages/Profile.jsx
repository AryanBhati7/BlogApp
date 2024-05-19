import React from "react";
import { ProfileAvatar, UserInformation } from "../components/index";
import { useSelector } from "react-redux";

function Profile() {
  const userInfo = useSelector((state) => state.auth.userData);
  return (
    <div>
      <ProfileAvatar />
      <UserInformation />
    </div>
  );
}

export default Profile;
