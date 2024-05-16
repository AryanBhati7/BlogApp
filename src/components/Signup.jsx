import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Input, Logo, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      if (data.profileImg) {
        const profile = await authService.uploadProfile(data.profileImg[0]);
        const profilefileId = profile.$id;
        data.profileImg = profilefileId;
      }
      const accData = await authService.createAccount(data);
      if (accData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          if (!userData.hasCompletedOnboarding) {
            navigate("/onboarding");
          } else {
            navigate("/");
          }
        }
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const googleAuth = async (e) => {
    e.preventDefault();
    setError("");
    // const client = new Client();

    // const account = new Account(client);

    try {
      authService.googleLogin();
      // const session = await account.getSession("current");
      // console.log(session.provider);
      // console.log(session.providerUid);
      // console.log(session.providerAccessToken);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Profile Image"
              type="file"
              placeholder="Enter your full name"
              {...register("profileImg", {
                required: false, //this is for react hook form
              })}
            />
            <Input
              label="Full Name :"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
              required //to add red astrick on the label name
            />
            <Input
              label="Username :"
              placeholder="Enter your username"
              {...register("username", {
                required: true,
              })}
              required //to add red astrick on the label name
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              required //to add red astrick on the label name
            />
            <Input
              label="Password :"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
              required //to add red astrick on the label name
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <Button onClick={(e) => googleAuth(e)} className="w-full">
              Sign in using Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
