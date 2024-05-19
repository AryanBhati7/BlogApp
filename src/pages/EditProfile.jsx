import React from "react";
import { EditProfile as EditprofileComp } from "../components/index";
import { useSelector } from "react-redux";

function EditProfile() {
  const profile = useSelector((state) => state.auth.userData);

  return profile ? <EditprofileComp profile={profile} /> : null;
}

export default EditProfile;
