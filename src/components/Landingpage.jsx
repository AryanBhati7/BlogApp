import React from "react";
import heroImg from "../assets/img/hero.png";
import "../assets/css/landingpage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Landingpage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-background dark:bg-dark-bg">
      <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-center">
        <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
          <h1
            data-aos="fade-right"
            data-aos-once="true"
            className="my-4 text-5xl font-bold leading-tight text-primary dark:text-dark-primary"
          >
            <span className="text-theme-color">Blogging</span> Online is now
            much easier
          </h1>
          <p
            data-aos="fade-down"
            data-aos-once="true"
            data-aos-delay="300"
            className="leading-normal mb-8 text-justify text-2.5xl text-primary dark:text-dark-primary"
          >
            Write Blogs on various topics and start your journey as a impactful{" "}
            <span className="text-theme-color font-bold">Content Creator</span>,
            exploring your passions, sharing your knowledge and experiences with
            the world.
          </p>
          <div
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="700"
            className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5"
          >
            <Link to="/signup">
              <button className="lg:mx-0 bg-[#e10112] text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
                Join Now
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-6/12 lg:-mt-10 relative pt-16" id="hero">
          <img
            data-aos="fade-up"
            data-aos-once="true"
            className="w-8/12 mx-auto 2xl:-mb-20"
            src={heroImg}
          />

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-once="true"
            className="absolute top-20 left-6 sm:top-32 sm:left-18 md:top-40 md:left-32 lg:left-12 lg:top-32 floating-4"
          >
            <div className="card card-side bg-white shadow-xl  w-12 h-12 rounded-xl flex justify-center items-center">
              <figure className="flex  items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 16 16"
                >
                  <g fill="darkblue">
                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path>
                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z"></path>
                  </g>
                </svg>
              </figure>
            </div>
          </div>

          {/* {Second Floating Card} */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-once="true"
            className="absolute top-20 right-10 sm:right-24 sm:top-28 md:top-36 md:right-32 lg:top-32 lg:right-16 floating"
          >
            <div className="card card-side bg-white shadow-xl  w-12 h-12 rounded-xl flex justify-center items-center">
              <figure className="flex  items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#cd0a0a"
                    d="M7.993 6.003h-.719a7 7 0 0 0 .339-1.118c.098-.486.142-1.054-.019-1.573c-.17-.55-.56-1.009-1.234-1.235c-.863-.289-1.608.317-1.924.925L3.143 5.49a2.5 2.5 0 0 1-.976 1.017l-1.161.665a2 2 0 0 0-.88 2.435l.311.834a2 2 0 0 0 1.313 1.22l4.243 1.24a2.5 2.5 0 0 0 3.09-1.66l.82-2.646a2 2 0 0 0-1.91-2.592m4.733 8h-.719a2 2 0 0 1-1.91-2.593l.82-2.646a2.5 2.5 0 0 1 3.09-1.66l4.243 1.24a2 2 0 0 1 1.313 1.22l.311.835a2 2 0 0 1-.88 2.435l-1.161.665a2.5 2.5 0 0 0-.976 1.016l-1.293 2.488c-.316.608-1.06 1.214-1.924.925c-.674-.226-1.064-.685-1.234-1.235c-.16-.518-.118-1.087-.019-1.573c.084-.414.216-.805.338-1.117"
                  ></path>
                </svg>
              </figure>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-once="true"
            className="absolute bottom-14 left-4 sm:left-2 sm:bottom-20 lg:bottom-12 lg:left-20 floating"
          >
            <div className="card card-side bg-white shadow-xl  w-12 h-12 rounded-xl flex justify-center items-center">
              <figure className="flex  items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffce47"
                    d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
                  ></path>
                </svg>
              </figure>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-once="true"
            className="absolute bottom-20 md:bottom-48 lg:bottom-24 -right-6 lg:right-8 floating-4"
          >
            <div className="card card-side bg-white shadow-xl  w-12 h-12 rounded-xl flex justify-center items-center">
              <figure className="flex  items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#a30096"
                    d="M19 5v14H5V5zm2-2H3v18h18zm-4 14H7v-1h10zm0-2H7v-1h10zm0-3H7V7h10z"
                  ></path>
                </svg>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
