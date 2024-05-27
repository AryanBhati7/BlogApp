import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { fetchUsers, updateUser } from "../../features/usersSlice";

function EditProfile({ profile }) {
  const schema = z.object({
    username: z
      .string()
      .min(4)
      .max(15)
      .refine((value) => !value.includes(" "), {
        message: "Username must not contain spaces",
      })
      .refine((value) => value === value.toLowerCase(), {
        message: "Username must be all lowercase",
      })
      .refine(
        (value) => {
          if (value === currentUsername) {
            return true;
          }
          const isUnique = users.every((user) => user.username !== value);
          return isUnique;
        },
        {
          message: "Username already exists",
        }
      ),
    name: z.string().min(6),
    bio: z.string().max(150),
    location: z.string().max(60),
    instaLink: z.string().max(50),
    fbLink: z.string().max(50),
    twitterLink: z.string().max(50),
  });
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [DOB, setDOB] = useState(() => {
    if (profile.dob) {
      const [day, month, year] = profile.dob.split("/");
      return new Date(`${month}/${day}/${year}`);
    }
    return new Date();
  });
  const currentUsername = profile.username;

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile?.name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      gender: profile?.gender || "",
      dob: profile?.dob || "",
      location: profile?.location || "",
      instaLink: profile?.socials[0] || "",
      twitterLink: profile?.socials[1] || "",
      fbLink: profile?.socials[2] || "",
    },
  });

  const submit = async (data) => {
    const socials = [data.instaLink, data.twitterLink, data.fbLink];

    data.dob = DOB.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (data.profileImg && data.profileImg.length > 0) {
      const profile = await authService.uploadProfile(data.profileImg[0]);
      const profileView = authService.getProfilePreview(profile.$id);
      data.profileImg = profileView;
      data.profileId = profile.$id;
    } else {
      data.profileImg = profile.profileImg;
      data.profileId = profile.profileId;
    }
    if (data.coverphoto && data.coverphoto.length > 0) {
      const cover = await authService.uploadCoverPhoto(data.coverphoto[0]);
      const coverView = authService.getCoverPhotoPreview(cover.$id);
      data.coverphoto = coverView;
      data.coverphotoId = cover.$id;
    } else {
      data.coverphoto = profile.coverphoto;
      data.coverphotoId = profile.coverphotoId;
    }

    // Delete profile from storage if new profile is uploaded
    if (data.profileImg !== profile.profileImg && data.profileImg) {
      if (profile.profileId) {
        authService.deleteProfile(profile.profileId);
      }
    }

    // Delete cover photo from storage if new cover photo is uploaded
    if (data.coverphoto !== profile.coverphoto && data.coverphoto) {
      if (profile.coverphotoId) {
        authService.deleteCoverPhoto(coverphotoId);
      }
    }
    const userData = await authService.updateProfile(profile.$id, {
      ...data,
      socials,
    });
    if (userData) {
      dispatch(updateUser(userData));
      dispatch(updateUserData({ userData }));
      dispatch(fetchUsers());
      navigate(`/profile/${userData.username}`);
    } else {
      setError("root", {
        message: "Profile Updation Failed Please try again",
      });
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
    <section className="py-2 my-auto dark:bg-gray-900 bg-background  ">
      <div className="lg:w-[85%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div className="">
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Edit Profile
            </h1>
            {errors.root && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.root.message}
              </div>
            )}
            {errors.name && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.name.message}
              </div>
            )}
            {errors.username && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.username.message}
              </div>
            )}
            {errors.bio && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.bio.message}
              </div>
            )}
            {errors.location && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.location.message}
              </div>
            )}
            {errors.instaLink && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.instaLink.message}
              </div>
            )}
            {errors.fbLink && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.fbLink.message}
              </div>
            )}
            {errors.twitterLink && (
              <div className="mx-auto text-center font-bold text-red-500 my-2">
                {errors.twitterLink.message}
              </div>
            )}

            <form onSubmit={handleSubmit(submit)}>
              <div
                className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center"
                style={{
                  backgroundImage: `url(${selectedCover})`,
                }}
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
                <div className="w-full mt-3">
                  <label className=" dark:text-gray-300">Username</label>
                  <input
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="username"
                    {...register("username", {
                      required: true,
                      pattern: {
                        value: /^[a-z0-9]+$/,
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

              <div className="flex flex-col mb-3 sm:flex-row md:flex-row lg:flex-row gap-2 justify-center w-full">
                <div className="flex-1 mb-2">
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
                <div className="mb-2">
                  <h3 className="dark:text-gray-300 mb-2">Date of Birth</h3>
                  <DatePicker
                    selected={DOB}
                    onChange={(date) => setDOB(date)}
                    dateFormat="dd/MM/yyyy"
                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
                <div className="flex-1 mb-2">
                  <label className="mb-2 dark:text-gray-300">Location</label>
                  <input
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Enter your location here"
                    {...register("location", { required: false })}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-2 justify-center w-full">
                <div className="flex-1 mb-2">
                  <label className="mb-2 dark:text-gray-300">Instagram</label>
                  <input
                    type="text"
                    className="mt-2 p-4 pl-10 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    style={{
                      backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDE1IDE1Ij48cGF0aCBmaWxsPSIjYzJjMmMyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi45MSAxMi45MDljLjMyNi0uMzI3LjU4Mi0uNzIuNzQ5LTEuMTUxYy4xNi0uNDE0LjI3LS44ODYuMzAyLTEuNTc4Yy4wMzItLjY5My4wNC0uOTE1LjA0LTIuNjhjMC0xLjc2NS0uMDA4LTEuOTg3LS4wNC0yLjY4Yy0uMDMyLS42OTItLjE0Mi0xLjE2NC0uMzAyLTEuNTc4YTMuMTg1IDMuMTg1IDAgMCAwLS43NS0xLjE1MWEzLjE4NyAzLjE4NyAwIDAgMC0xLjE1MS0uNzVjLS40MTQtLjE2LS44ODYtLjI3LTEuNTc4LS4zMDJDOS40ODcgMS4wMDcgOS4yNjUgMSA3LjUgMWMtMS43NjUgMC0xLjk4Ny4wMDctMi42OC4wNGMtLjY5Mi4wMy0xLjE2NC4xNC0xLjU3OC4zMDFhMy4yIDMuMiAwIDAgMC0xLjE1MS43NWEzLjIgMy4yIDAgMCAwLS43NSAxLjE1MWMtLjE2LjQxNC0uMjcuODg2LS4zMDIgMS41NzhDMS4wMDcgNS41MTMgMSA1LjczNSAxIDcuNWMwIDEuNzY1LjAwNyAxLjk4Ny4wNCAyLjY4Yy4wMy42OTIuMTQgMS4xNjQuMzAxIDEuNTc4Yy4xNjQuNDM0LjQyLjgyNi43NSAxLjE1MWMuMzI1LjMzLjcxOC41ODYgMS4xNTEuNzVjLjQxNC4xNi44ODYuMjcgMS41NzguMzAyYy42OTMuMDMxLjkxNS4wMzkgMi42OC4wMzljMS43NjUgMCAxLjk4Ny0uMDA4IDIuNjgtLjA0Yy42OTItLjAzIDEuMTY0LS4xNCAxLjU3OC0uMzAxYTMuMzIzIDMuMzIzIDAgMCAwIDEuMTUxLS43NU0yIDYuNzM1djEuNTNjLS4wMDIuODIxLS4wMDIgMS4wMzQuMDIgMS41Yy4wMjYuNTg2LjA1OCAxLjAxNi4xNTYgMS4zNGMuMDk0LjMxMi4xOTkuNjMuNTQzIDEuMDEyYy4zNDQuMzgzLjY3NS41NTYgMS4wOTcuNjg0Yy40MjMuMTI3Ljk1NC4xNTQgMS40MTUuMTc1Yy41MjIuMDI0LjczLjAyNCAxLjgyNi4wMjRIOC4yNGMuODQyLjAwMSAxLjA1NC4wMDIgMS41MjYtLjAyYy41ODUtLjAyNyAxLjAxNS0uMDU5IDEuMzQtLjE1NmMuMzExLS4wOTQuNjI5LS4yIDEuMDExLS41NDNjLjM4My0uMzQ0LjU1Ni0uNjc2LjY4NC0xLjA5OGMuMTI3LS40MjIuMTU1LS45NTMuMTc2LTEuNDE0QzEzIDkuMjQ3IDEzIDkuMDQgMTMgNy45NDd2LS44OWMwLTEuMDk2IDAtMS4zMDMtLjAyMy0xLjgyNmMtLjAyMS0uNDYxLS4wNDktLjk5Mi0uMTc2LTEuNDE0Yy0uMTI3LS40MjMtLjMtLjc1NC0uNjg0LTEuMDk4Yy0uMzgzLS4zNDQtLjctLjQ0OS0xLjAxMS0uNTQzYy0uMzI1LS4wOTctLjc1NS0uMTMtMS4zNC0uMTU2QTI3LjI5IDI3LjI5IDAgMCAwIDguMjQgMkg3LjA1N2MtMS4wOTYgMC0xLjMwNCAwLTEuODI2LjAyM2MtLjQ2MS4wMjEtLjk5Mi4wNDktMS40MTUuMTc2Yy0uNDIyLjEyOC0uNzUzLjMwMS0xLjA5Ny42ODRjLS4zNDQuMzgzLS40NS43LS41NDMgMS4wMTJjLS4wOTguMzI0LS4xMy43NTQtLjE1NiAxLjM0Yy0uMDIyLjQ2Ni0uMDIyLjY3OS0uMDIgMS41TTcuNSA1LjI1YTIuMjUgMi4yNSAwIDEgMCAwIDQuNWEyLjI1IDIuMjUgMCAwIDAgMC00LjVNNC4yNSA3LjVhMy4yNSAzLjI1IDAgMSAxIDYuNSAwYTMuMjUgMy4yNSAwIDAgMS02LjUgMG02LjcyLTIuNzJhLjc1Ljc1IDAgMSAwIDAtMS41YS43NS43NSAwIDAgMCAwIDEuNSIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "30px 30px",
                      backgroundPosition: "5px center",
                    }}
                    placeholder="Your Insta profile link here"
                    {...register("instaLink", { required: false })}
                  />
                </div>
                <div className="flex-1 mb-2">
                  <label className="mb-2 dark:text-gray-300">Twitter</label>
                  <input
                    type="text"
                    className="mt-2 p-4 pl-10 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    style={{
                      backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjYzJjMmMyIiBkPSJNMjIuNDYgNmMtLjc3LjM1LTEuNi41OC0yLjQ2LjY5Yy44OC0uNTMgMS41Ni0xLjM3IDEuODgtMi4zOGMtLjgzLjUtMS43NS44NS0yLjcyIDEuMDVDMTguMzcgNC41IDE3LjI2IDQgMTYgNGMtMi4zNSAwLTQuMjcgMS45Mi00LjI3IDQuMjljMCAuMzQuMDQuNjcuMTEuOThDOC4yOCA5LjA5IDUuMTEgNy4zOCAzIDQuNzljLS4zNy42My0uNTggMS4zNy0uNTggMi4xNWMwIDEuNDkuNzUgMi44MSAxLjkxIDMuNTZjLS43MSAwLTEuMzctLjItMS45NS0uNXYuMDNjMCAyLjA4IDEuNDggMy44MiAzLjQ0IDQuMjFhNC4yIDQuMiAwIDAgMS0xLjkzLjA3YTQuMjggNC4yOCAwIDAgMCA0IDIuOThhOC41MiA4LjUyIDAgMCAxLTUuMzMgMS44NHEtLjUxIDAtMS4wMi0uMDZDMy40NCAyMC4yOSA1LjcgMjEgOC4xMiAyMUMxNiAyMSAyMC4zMyAxNC40NiAyMC4zMyA4Ljc5YzAtLjE5IDAtLjM3LS4wMS0uNTZjLjg0LS42IDEuNTYtMS4zNiAyLjE0LTIuMjMiLz48L3N2Zz4=')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "30px 30px",
                      backgroundPosition: "5px center",
                    }}
                    placeholder="Your Twitter profile link here"
                    {...register("twitterLink", { required: false })}
                  />
                </div>
                <div className="flex-1 mb-2">
                  <label className="mb-2 dark:text-gray-300">Facebook</label>
                  <input
                    type="text"
                    className="mt-2 p-4 pl-10 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    style={{
                      backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSIjYzJjMmMyIiBkPSJNMTYgOC4wNDljMC00LjQ0Ni0zLjU4Mi04LjA1LTgtOC4wNUMzLjU4IDAtLjAwMiAzLjYwMy0uMDAyIDguMDVjMCA0LjAxNyAyLjkyNiA3LjM0NyA2Ljc1IDcuOTUxdi01LjYyNWgtMi4wM1Y4LjA1SDYuNzVWNi4yNzVjMC0yLjAxNyAxLjE5NS0zLjEzMSAzLjAyMi0zLjEzMWMuODc2IDAgMS43OTEuMTU3IDEuNzkxLjE1N3YxLjk4aC0xLjAwOWMtLjk5MyAwLTEuMzAzLjYyMS0xLjMwMyAxLjI1OHYxLjUxaDIuMjE4bC0uMzU0IDIuMzI2SDkuMjVWMTZjMy44MjQtLjYwNCA2Ljc1LTMuOTM0IDYuNzUtNy45NTEiLz48L3N2Zz4=')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "30px 30px",
                      backgroundPosition: "5px center",
                    }}
                    placeholder=" Your FB profile link here"
                    {...register("fbLink", { required: false })}
                  />
                </div>
              </div>

              <div className="w-full rounded-lg bg-blue-500 hover:bg-blue-400 mt-4 text-white text-lg font-semibold">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full p-4 ${
                    isSubmitting ? "animate-pulse" : ""
                  }`}
                >
                  {isSubmitting ? "Updating Your Profile.." : "Update"}
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
