import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import "../index.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const googleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      authService.googleLogin();
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="mx-auto w-full max-w-lg bg-dark-bg dark:bg-background rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <Logo textColor="white" darkTextColor="primary" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight dark:text-primary text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base dark:text-black/60 text-gray-300 ">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium dark:text-primary text-white transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              labelClasses="dark:text-black text-white"
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
            />
            <Input
              labelClasses="dark:text-black text-white"
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <div className="mb-3">
              <Button
                type="submit"
                className="mb-1.5 block w-full text-center text-white bg-primary hover:bg-blue-600 px-2 py-1.5 rounded-md"
              >
                Sign in
              </Button>

              <div className="flex items-center justify-center mt-4">
                <hr className="w-full border-gray-300" />
                <span className="px-2 text-gray-500">or</span>
                <hr className="w-full border-gray-300" />
              </div>
              <Button
                onClick={(e) => googleAuth(e)}
                className="flex mt-1 bg-white flex-wrap justify-center items-center w-full border border-gray-300 hover:border-gray-600 px-2 py-1.5 rounded-md text-gray-800"
              >
                <img
                  className="w-5 mr-2"
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                />
                Sign in with Google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
