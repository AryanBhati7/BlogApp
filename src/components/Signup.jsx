import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { createUser } from "../features/usersSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Signup() {
  const schema = z
    .object({
      email: z.string().email(),
      username: z
        .string()
        .min(4)
        .refine((value) => !value.includes(" "), {
          message: "Username must not contain spaces",
        })
        .refine((value) => value === value.toLowerCase(), {
          message: "Username must be all lowercase",
        })
        .refine(
          (value) => {
            const isUnique = users.every((user) => user.username !== value);
            return isUnique;
          },
          {
            message: "Username already exists",
          }
        ),
      name: z.string().min(6),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords should match",
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  const create = async (data) => {
    setError("");
    try {
      if (data.profileImg && data.profileImg.length > 0) {
        const profile = await authService.uploadProfile(data.profileImg[0]);
        console.log(profile);
        const profileView = authService.getProfilePreview(profile.$id);
        data.profileImg = profileView;
        data.profileId = profile.$id;
      } else {
        data.profileImg = authService.createAvatar(data.name);
      }
      const actionResult = await dispatch(createUser(data));
      const userData = unwrapResult(actionResult);
      if (userData) {
        dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError("root", {
        message: "Account Creation Failed Please try again",
      });
    }
  };

  const googleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      authService.googleLogin();
    } catch (error) {
      setError("root", {
        message: "Account Creation Failed Please try again",
      });
    }
  };

  return (
    <section className=" flex items-center justify-center w-full">
      <div className=" bg-dark-bg dark:bg-background flex items-center w-full max-w-3xl p-4 mx-auto  rounded-xl border-black/10 lg:px-12 lg:w-3/5">
        <div className="w-full">
          <h1 className="text-2.5xl text-center font-bold tracking-wider dark:text-primary text-white">
            Create your Account
          </h1>

          <div>
            <p className=" text-center text-base dark:text-black/60 text-gray-300">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

          {errors.root && (
            <div className="mx-auto text-center font-bold text-red-500">
              {errors.root.message}
            </div>
          )}
          {errors.password && (
            <div className="mx-auto text-center font-bold text-red-500">
              {errors.password.message}
            </div>
          )}
          {errors.confirmPassword && (
            <div className="mx-auto text-center font-bold text-red-500">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.email && (
            <div className="mx-auto text-center font-bold text-red-500">
              {errors.email.message}
            </div>
          )}
          {errors.username && (
            <div className="mx-auto text-center font-bold text-red-500">
              {errors.username.message}
            </div>
          )}
          <form onSubmit={handleSubmit(create)} className="mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  labelClasses="block  dark:text-black text-white"
                  label="Profile Image :"
                  type="file"
                  className="block w-full px-5 py-3 mb-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("profileImg", {
                    required: false, //this is for react hook form
                  })}
                />
              </div>

              <Input
                labelClasses="block   dark:text-black text-white"
                label="Full Name :"
                type="text"
                placeholder="John Wick"
                className="block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register("name")}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  labelClasses="block   dark:text-black text-white"
                  label="Username :"
                  type="text"
                  placeholder="johnwick7"
                  className={`block w-full px-5 py-3 mb-3 text-gray-700 placeholder-gray-400 bg-white border
                   rounded-md dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                  {...register("username", {
                    required: true,
                    validate: {
                      noSpaces: (value) =>
                        !/\s/.test(value) ||
                        "Username should not contain spaces",
                    }, //this is for react hook form
                  })}
                />
              </div>

              <div>
                <Input
                  labelClasses="block   dark:text-black text-white"
                  label="Email :"
                  type="text"
                  placeholder="johnwick07@gmail.com"
                  className="block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input
                  labelClasses="block   dark:text-black text-white"
                  label="Password :"
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mb-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("password", {
                    required: true, //this is for react hook form
                  })}
                />
              </div>

              <div>
                <Input
                  labelClasses="block   dark:text-black text-white"
                  label="Confirm Password :"
                  type="password"
                  placeholder="Confirm your password"
                  className="block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("confirmPassword", {
                    required: true,
                    validate: {
                      matchesPassword: (value) =>
                        value === password || "Passwords should match", // validate that confirmPassword matches password
                    },
                  })}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`flex mt-6 items-center text-lg justify-center w-full px-6 py-3 tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary hover:bg-blue-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                isSubmitting ? "animate-pulse" : ""
              }`}
            >
              <span>
                {isSubmitting ? "Creating Your Account.." : "Create Account"}{" "}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <div className="flex items-center justify-center mt-4">
              <hr className="w-full border-gray-300" />
              <span className="px-2 text-gray-500">or</span>
              <hr className="w-full border-gray-300" />
            </div>

            <Button
              onClick={(e) => googleAuth(e)}
              className="flex mt-1 text-lg bg-white flex-wrap justify-center items-center w-full border border-gray-300 hover:border-gray-600 px-2 py-1.5 rounded-md text-gray-800"
            >
              <img
                className="w-5 mr-2"
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              />
              Sign in with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
