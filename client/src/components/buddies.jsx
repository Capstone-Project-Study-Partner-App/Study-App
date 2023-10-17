import React, { useState, useEffect } from "react";
import {
  AuthError,
  getUsersMatchingFilters,
  checkIfFavoriteExists,
  deleteFavorite,
  createFavorite,
  getUserById,
  getProfile,
} from "../fetching";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "./login";
import { HeartIcon, UsersIcon } from "@heroicons/react/outline";
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
  const [searchParam, setSearchParam] = useState("");

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

  // SEARCH BAR
  const buddiesToDisplay = searchParam
    ? allUsers.filter((user) => {
        return user.first_name
          .toLowerCase()
          .includes(searchParam.toLowerCase());
      })
    : allUsers;
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-sky-100 text-indigo p-4">
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

            {/* Location
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-indigo">Zipcode: </span>
            </label>

            {/* Institution
            <h2 className="text-xl font-semibold mb-4">Institution</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2">University Name: </span>
            </label> */}

            <h2 className="text-xl font-semibold mb-4">Education Level</h2>
            <MultiCheckboxSelect
              selectedOpts={edLevelFilter}
              setSelectedOpts={setEdLevelFilter}
              options={[
                "High School",
                "College Freshman",
                "College Sophomore",
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
                "Computer Science/Data Science",
                "Business/Finance/Econ/Marketing",
                "Art/Music",
                "Science/Engineering/Psychology",
                "Mathematics/Statistics",
                "Literature",
                "Foreign Language",
                "Social Studies/Humanities",
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
            <h1 className="ml-2 mt-2 font-semibold leading-6 text-indigo-500">
              All Buddies
            </h1>
            <div className="mt-2 flex rounded-md shadow-sm ml-auto">
              <div className="relative flex flex-grow items-stretch">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UsersIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-r-md"
                  placeholder="Search Buddies"
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
                />
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {buddiesToDisplay.map((user) => (
            <li
              key={user.email}
              className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow-md"
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
                <div className="-mt-px flex">
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
                )}{" "}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Buddies.propTypes = {};
