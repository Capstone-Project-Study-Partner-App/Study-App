import React, { useState, useEffect } from "react";
import {
  AuthError,
  getUsersMatchingFilters,
  checkIfFavoriteExists,
  deleteFavorite,
  createFavorite,
  getUserById,
  getProfile
} from "../fetching";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "./login";
import { HeartIcon } from "@heroicons/react/outline";
import PopUpThread from "./PopUpThread";

function MultiCheckboxSelect({ selectedOpts, setSelectedOpts, options }) {
  return (
    <>
      {options.map((option) => (
        <label key={option} className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600"
            checked={selectedOpts.includes(option)}
            onChange={(evt) =>
              setSelectedOpts([
                ...selectedOpts.filter((o) => o !== option),
                ...(evt.target.checked ? [option] : []),
              ])
            }
          />
          <span className="ml-2 select-none">{option}</span>
        </label>
      ))}
    </>
  );
}

function undefinedIfEmpty(arr) {
  if (arr.length === 0) {
    return undefined;
  }
  return arr;
}

export default function Buddies() {
  const [user, setUser] = useState(null);
  const [ageFilter, setAgeFilter] = useState([]);
  const [edLevelFilter, setEdLevelFilter] = useState([]);
  const [availableDaysFilter, setAvailableDaysFilter] = useState([]);
  const [availableTimesFilter, setAvailableTimesFilter] = useState([]);
  const [languagesFilter, setLanguagesFilter] = useState([]);
  const [studyCommitmentFilter, setStudyCommitmentFilter] = useState([]);
  const [majorFilter, setMajorFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);



  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await getProfile();
        setCurrentUser(response);
        console.log("Current User:", response);
      } catch (err) {
        if (err instanceof AuthError) {
          navigate(LOGIN_ROUTE);
        } else {
          throw err;
        }
      }
    }
    getCurrentUser();
  }, []);



  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };



  const [liked, setLiked] = useState(false);

  const fetchData = React.useCallback(async () => {
    try {
      const users = await getUsersMatchingFilters({
        filters: {
          age: undefinedIfEmpty(ageFilter),
          education_level: undefinedIfEmpty(edLevelFilter),
          days_available: undefinedIfEmpty(availableDaysFilter),
          times_available: undefinedIfEmpty(availableTimesFilter),
          languages: undefinedIfEmpty(languagesFilter),
          study_habits: undefinedIfEmpty(studyCommitmentFilter),
          major: undefinedIfEmpty(majorFilter),
          gender: undefinedIfEmpty(genderFilter),
        },
      });
      setAllUsers(users);
    } catch (err) {
      if (err instanceof AuthError) {
        navigate(LOGIN_ROUTE);
      } else {
        throw err;
      }
    }
  }, [
    navigate,
    ageFilter,
    edLevelFilter,
    availableDaysFilter,
    availableTimesFilter,
    languagesFilter,
    studyCommitmentFilter,
    majorFilter,
    genderFilter,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to toggle the liked state
  const toggleLike = async (userId) => {
    if (liked) {
      // If already liked, unlike the user
      await deleteFavorite(userId);
    } else {
      // If not liked, like the user
      await createFavorite(userId);
    }
    // // Toggle the liked state
    // setLiked(!liked);

    await fetchData();
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-xxl font-semibold mb-4">Filters</h1>
        <div
          className="filter-scrollable"
          style={{ height: "calc(100vh - 64px)", overflowY: "auto" }}
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-4">Age</h2>
            <MultiCheckboxSelect
              selectedOpts={ageFilter}
              setSelectedOpts={setAgeFilter}
              options={["15-17", "18-24", "25-29", "30+"]}
            />

            {/* Location */}
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-white">Zipcode: </span>
            </label>

            {/* Institution */}
            <h2 className="text-xl font-semibold mb-4">Institution</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2">University Name: </span>
            </label>

            <h2 className="text-xl font-semibold mb-4">Education Level</h2>
            <MultiCheckboxSelect
              selectedOpts={edLevelFilter}
              setSelectedOpts={setEdLevelFilter}
              options={[
                "High School",
                "College Freshman",
                "College Sophmore",
                "College Junior",
                "College Senior",
                "Masters",
                "PhD",
                "Other",
              ]}
            />

            <h2 className="text-xl font-semibold mb-4">Available Days</h2>
            <MultiCheckboxSelect
              selectedOpts={availableDaysFilter}
              setSelectedOpts={setAvailableDaysFilter}
              options={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
            />

            <h2 className="text-xl font-semibold mb-4">Available Times</h2>
            <MultiCheckboxSelect
              selectedOpts={availableTimesFilter}
              setSelectedOpts={setAvailableTimesFilter}
              options={["Morning", "Afternoon", "Evening", "Night"]}
            />

            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <MultiCheckboxSelect
              selectedOpts={languagesFilter}
              setSelectedOpts={setLanguagesFilter}
              options={[
                "English",
                "Spanish",
                "Mandarin",
                "French",
                "Arabic",
                "Other",
              ]}
            />

            <h2 className="text-xl font-semibold mb-4">Study Commitment</h2>
            <MultiCheckboxSelect
              selectedOpts={studyCommitmentFilter}
              setSelectedOpts={setStudyCommitmentFilter}
              options={["Chill", "Semi-Chill", "Semi-Grind", "Grind"]}
            />

            <h2 className="text-xl font-semibold mb-4">Major</h2>
            <MultiCheckboxSelect
              selectedOpts={majorFilter}
              setSelectedOpts={setMajorFilter}
              options={[
                "Computer Science",
                "Business",
                "Art",
                "Science",
                "Mathematics",
                "Literature",
                "Foreign Language",
                "Social Studies",
              ]}
            />

            <h2 className="text-xl font-semibold mb-4">Gender</h2>
            <MultiCheckboxSelect
              selectedOpts={genderFilter}
              setSelectedOpts={setGenderFilter}
              options={["Male", "Female", "Non-Binary", "Other"]}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 justify-center items-center p-10">
        <div className="border-b border-gray-200 pb-5">
          <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h1 className="ml-2 mt-2  font-semibold leading-6 text-indigo-500">
              All Buddies
            </h1>
          </div>
        </div>
        <br></br>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {allUsers.map((user) => (
            <li
              key={user.email}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-md"
            >
              <Link
                key={user.user_id}
                to={`/users/${user.user_id}`}
                className="flex flex-1"
              >
                <div className="flex flex-1 flex-col p-8 bg-slate-50">
                  <img
                    className="mx-auto w-32 aspect-square flex-shrink-0 rounded-full"
                    src={user.photo}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <h3 className="mt-6 text-md font-medium text-gray-900">
                    {user.first_name} {user.last_name}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col">
                    <dd className="text-sm text-gray-500">
                      <b>Age:</b> {user.age}
                    </dd>
                    <dd className="text-sm text-gray-500">{user.gender}</dd>
                    <dd className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {user.education_level}
                      </span>
                    </dd>
                  </dl>
                </div>
              </Link>
              {/* CONNECT */}

              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    {/* Heart button */}
                    <button
                      className={`center bg-blue-400 focus:outline-none text-white`}
                      onClick={() => toggleLike(user.user_id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={liked[user.user_id] ? "red" : "black"}
                        className="w-6 h-6"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                      </svg>
                      Like
                    </button>
                  </div>

                  {/* open pop up / connect button */}
                  <div className="ml-px flex w-0 flex-1">
                    <a
                     
                      onClick={() => {
                        setIsChatOpen(true);
                        handleUserSelect(user);
                      }}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg bg-indigo-800 border border-transparent py-4 text-sm font-semibold text-white"
                    >
                      Message
                    </a>
                  </div>
                </div>
              </div>
              <div>
                {isChatOpen && selectedUser === user && (
                  <div className="fixed bottom-0 right-0 z-50">
                          <PopUpThread
                            sender={currentUser.user_id}
                            receiver={selectedUser.user_id}
                            currentUser={currentUser}
                            selectedUser={selectedUser}
                            closeChat={closeChat}
                          />
                        </div>
                )}  </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Buddies.propTypes = {};
