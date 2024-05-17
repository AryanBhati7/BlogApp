import React from "react";
import heroImg from "../assets/img/hero.png";
import calenderImg from "../assets/img/calendar.svg";
import Container from "./Container/Container";
import "../assets/css/landingpage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Landingpage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div class="bg-[#f2f2f2] h-auto">
      <div class="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-center">
        <div class="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
          <h1
            data-aos="fade-right"
            data-aos-once="true"
            class="my-4 text-5xl font-bold leading-tight text-darken"
          >
            <span class="text-[#e10112]">Blogging</span> Online is now much
            easier
          </h1>
          <p
            data-aos="fade-down"
            data-aos-once="true"
            data-aos-delay="300"
            class="leading-normal text-2xl mb-8 text-justify "
          >
            Write Blogs on various topics and start your journey as a impactful{" "}
            <span className="text-[#e10112] font-bold">Content Creator</span>,
            exploring your passions, sharing your knowledge and experiences with
            the world.
          </p>
          <div
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="700"
            class="w-full md:flex items-center justify-center lg:justify-start md:space-x-5"
          >
            <button class="lg:mx-0 bg-[#e10112] text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
              Join Now
            </button>
          </div>
        </div>
        <div class="w-full lg:w-6/12 lg:-mt-10 relative pt-16" id="hero">
          <img
            data-aos="fade-up"
            data-aos-once="true"
            class="w-8/12 mx-auto 2xl:-mb-20"
            src={heroImg}
          />

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-once="true"
            class="absolute top-20 -left-6 sm:top-32 sm:left-10 md:top-40 md:left-16 lg:-left-0 lg:top-52 floating-4"
          >
            <img
              class="bg-white bg-opacity-80 rounded-lg h-12 sm:h-16"
              src={calenderImg}
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="true"
            class="absolute top-20 right-10 sm:right-24 sm:top-28 md:top-36 md:right-32 lg:top-32 lg:right-16 floating"
          >
            <svg
              class="h-16 sm:h-24"
              viewBox="0 0 149 149"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d)">
                <rect
                  x="40"
                  y="32"
                  width="69"
                  height="69"
                  rx="14"
                  fill="#F3627C"
                />
              </g>
              <rect
                x="51.35"
                y="44.075"
                width="47.3"
                height="44.85"
                rx="8"
                fill="white"
              />
              <path
                d="M74.5 54.425V78.575"
                stroke="#F25471"
                stroke-width="4"
                stroke-linecap="round"
              />
              <path
                d="M65.875 58.7375L65.875 78.575"
                stroke="#F25471"
                stroke-width="4"
                stroke-linecap="round"
              />
              <path
                d="M83.125 63.9125V78.575"
                stroke="#F25471"
                stroke-width="4"
                stroke-linecap="round"
              />
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="149"
                  height="149"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="8" />
                  <feGaussianBlur stdDeviation="20" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.825 0 0 0 0 0.300438 0 0 0 0 0.396718 0 0 0 0.26 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-once="true"
            class="absolute bottom-14 -left-4 sm:left-2 sm:bottom-20 lg:bottom-24 lg:-left-4 floating"
          >
            <img
              class="bg-white bg-opacity-80 rounded-lg h-20 sm:h-28"
              src={calenderImg}
              alt=""
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-once="true"
            class="absolute bottom-20 md:bottom-48 lg:bottom-52 -right-6 lg:right-8 floating-4"
          >
            <img
              class="bg-white bg-opacity-80 rounded-lg h-12 sm:h-16"
              src={calenderImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
