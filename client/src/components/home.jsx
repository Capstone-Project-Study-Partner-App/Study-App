import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkLoginStatus } from "../fetching"; // Import your checkLoginStatus function

export default function Home({ loggedIn }) {
  return (
    <>
      <div className="relative bg-gray-900">
        <div className="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            className="h-full w-full object-contain object-bottom"
            style={{ backgroundColor: "#18314b" }}
            src="https://prod-website-cdn.studysmarter.de/sites/5/us/Study-with-Me-dark-2048x1152-1-1536x864-min.png"
            alt=""
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#776FFF" />
                <stop offset={1} stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Where Knowledge Meets Community
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Binder Buddies
            </p>
            <p className="mt-6 text-base leading-7 text-gray-300">
              Binder Buddies is the essential app for people seeking to
              enhance their learning journey. Stay motivated in your studies
              with a study partner. Filter potential partners by age, gender,
              study subject, expertise level, location, and availability. Reach
              out by message to coordinate times and explore interests. Create
              events to meet up in person or online. Find a study partner in
              your neighborhood or meet new partners from around the world.
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              {loggedIn ? null : ( // Render nothing if logged in
                // Render login and register buttons if not logged in
                <>
                  <Link
                    to={`/login`}
                    className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    LOG IN
                  </Link>
                  <Link
                    to={`/register`}
                    className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>
            {/* <div className="mt-8 flex gap-3 justify-center">
              <Link
                to={`/login`}
                className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                LOG IN
              </Link>
              <Link
                to={`/register`}
                className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                REGISTER
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
