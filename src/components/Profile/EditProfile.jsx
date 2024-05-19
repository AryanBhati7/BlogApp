import React from "react";
import { useForm, Controller, appendErrors } from "react-hook-form";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function EditProfile({ profile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [DOB, setDOB] = useState(() => {
    if (profile.dob) {
      const [day, month, year] = profile.dob.split("/");
      return new Date(`${month}/${day}/${year}`);
    }
    return new Date();
  });
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "") // remove non-alphanumeric characters
        .replace(/\s+/g, "-"); // replace one or more spaces with a hyphen
    }
    return "";
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      gender: profile?.gender || "",
      dob: profile?.dob || "",
      location: profile?.location || "",
    },
  });

  const submit = async (data) => {
    if (Object.keys(errors).length > 0) {
      for (const error in errors) {
        toast.error(errors[error].message);
      }
    } else {
      data.dob = DOB.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      console.log(data.profileImg);
      console.log(data.coverphoto);
      console.log(data);
      if (data.profileImg && data.profileImg.length > 0) {
        const profile = await authService.uploadProfile(data.profileImg[0]);
        const profileView = authService.getProfilePreview(profile.$id);
        console.log(profileView);
        data.profileImg = profileView;
      } else {
        data.profileImg = profile.profileImg;
      }
      if (data.coverphoto && data.coverphoto.length > 0) {
        const cover = await authService.uploadCoverPhoto(data.coverphoto[0]);
        const coverView = authService.getCoverPhotoPreview(cover.$id);
        data.coverphoto = coverView;
      } else {
        data.coverphoto = profile.coverphoto;
      }

      // Delete profile from storage if new profile is uploaded pending

      const userData = await authService.updateProfile(profile.$id, {
        ...data,
      });
      console.log(userData);
      if (userData) {
        dispatch(login({ userData }));
        navigate("/profile");
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState(profile.profileImg);
  const [selectedCover, setSelectedCover] = useState(profile.coverphoto);
  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCoverSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <section className="py-2 my-auto dark:bg-gray-900 bg-background">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div className="">
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Edit Profile
            </h1>

            <form onSubmit={handleSubmit(submit)}>
              <div
                className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center"
                style={{ backgroundImage: `url(${selectedCover})` }}
              >
                <div
                  className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat border border-dark-bg `}
                  style={{ backgroundImage: `url(${selectedImage})` }}
                >
                  <div className="bg-white/90 flex justify-center items-center rounded-full w-7 h-7 text-center ml-28 mt-[106px]">
                    <Controller
                      name="profileImg"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="profileImg"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          {...register("profileImg", { required: !profile })}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            handleImageSelect(e);
                          }}
                        />
                      )}
                    />

                    <label
                      htmlFor="profileImg"
                      className="
                   cursor-pointer"
                    >
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Controller
                    name="coverphoto"
                    control={control}
                    render={({ field }) => (
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="coverphoto"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("coverphoto", { required: !profile })}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          handleCoverSelect(e);
                        }}
                      />
                    )}
                  />

                  <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                    <label
                      htmlFor="coverphoto"
                      className="inline-flex items-center gap-1 cursor-pointer"
                    >
                      Cover
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3 flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mt-3">
                  <label className="mb-2 dark:text-gray-300">Full Name</label>

                  <input
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="w-full lg:mt-3">
                  <label className=" dark:text-gray-300">Username</label>
                  <input
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="username"
                    {...register("username", {
                      required: true,
                      pattern: {
                        value: /^[a-z]+$/,
                        message: "No uppercase letters allowed",
                      },
                    })}
                  />
                </div>
              </div>

              <div className="w-full mb-4">
                <label className="mb-2 dark:text-gray-300">Bio</label>
                <input
                  type="text"
                  className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  placeholder="Enter bio here..."
                  {...register("bio", { required: false })}
                />
              </div>

              <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="flex-1">
                  <h3 className="dark:text-gray-300 mb-2">Gender</h3>
                  <select
                    {...register("gender", { required: false })}
                    className="w-full text-grey border-2 rounded-lg p-4  dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  >
                    <option disabled value="">
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <h3 className="dark:text-gray-300 mb-2">Date of Birth</h3>
                  <DatePicker
                    selected={DOB}
                    onChange={(date) => setDOB(date)}
                    dateFormat="dd/MM/yyyy"
                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="mb-2 dark:text-gray-300">Location</label>
                  <input
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Enter your location here"
                    {...register("location", { required: false })}
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;
