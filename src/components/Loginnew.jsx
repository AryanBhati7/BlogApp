import React from "react";
import Button from "./Button";

function Loginnew() {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-center min-h-screen">
        <div
          class="hidden bg-cover lg:block lg:w-2/5"
          style="background-image: url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')"
        ></div>

        <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <p class="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <div class="mt-6">
              <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form
              onSubmit={handleSubmit(create)}
              class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
            >
              <div>
                <Input
                  labelClasses="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  label="Profile Image"
                  type="file"
                  placeholder="Enter your full name"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("profileImg", {
                    required: false, //this is for react hook form
                  })}
                />
              </div>

              <div></div>
              <Input
                labelClasses="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                label="Full Name :"
                type="text"
                placeholder="John Wick"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register("name", {
                  required: true, //this is for react hook form
                })}
                required
              />
              <div>
                <Input
                  labelClasses="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  label="Username :"
                  type="text"
                  placeholder="johnwick7"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("username", {
                    required: true, //this is for react hook form
                  })}
                  required
                />
              </div>

              <div>
                <Input
                  labelClasses="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  label="Email :"
                  type="text"
                  placeholder="johnwick07@gmail.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    }, //this is for react hook form
                  })}
                  required
                />
              </div>

              <div>
                <Input
                  labelClasses="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  label="Password :"
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("password", {
                    required: true, //this is for react hook form
                  })}
                  required
                />
              </div>

              <div>
                <Input
                  labelClasses="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  label="Confirm Password :"
                  type="password"
                  placeholder="Confirm your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
              <Button
                type="submit"
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Create Account </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
              <button class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"></button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loginnew;
