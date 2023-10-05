import { useState, useEffect } from "react";
import { AuthError, getUsersMatchingFilters } from "../fetching";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { LOGIN_ROUTE } from "./login";
import NewMessage from "./NewMessage";
import MessageThread from "./Thread";

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
  const [thread_id, setThreadId] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [existingThread, setExistingThread] = useState(null);

  const updateMessages = (newMessage) => {
    setMessages([...messages, newMessage]);
  };
  // Function to open the pop-up
  function openForm(user) {
    console.log("Opening chat pop-up for user:", user.first_name);
    setSelectedUser(user);
    setIsEditFormVisible(true);
    setThreadId(thread_id);
  }

  // Function to close the pop-up
  function closeForm() {
    setIsEditFormVisible(false);
  }

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
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

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-xxl font-semibold mb-4">Filters</h1>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-4">Age</h2>
          <MultiCheckboxSelect
            selectedOpts={ageFilter}
            setSelectedOpts={setAgeFilter}
            options={["15-17", "18-25", "25-30", "30+"]}
          />

          {/* Location */}
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2 text-white">Zipcode: </span>
          </label>

          {/* Institution */}
          <h2 className="text-xl font-semibold mb-4">Institution</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
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
            options={["Morning", "Afternoon", "Evening"]}
          />

          <h2 className="text-xl font-semibold mb-4">Languages</h2>
          <MultiCheckboxSelect
            selectedOpts={languagesFilter}
            setSelectedOpts={setLanguagesFilter}
            options={["English", "Spanish", "Mandarin", "German"]}
          />

          <h2 className="text-xl font-semibold mb-4">Study Commitment</h2>
          <MultiCheckboxSelect
            selectedOpts={studyCommitmentFilter}
            setSelectedOpts={setStudyCommitmentFilter}
            options={[
              "Relaxed",
              "Semi-relaxed",
              "Committed studying",
              "Grinding studying",
            ]}
          />

          <h2 className="text-xl font-semibold mb-4">Major</h2>
          <MultiCheckboxSelect
            selectedOpts={majorFilter}
            setSelectedOpts={setMajorFilter}
            options={[
              "Psychology",
              "Biology",
              "Computer Science",
              "Engineering",
              "Business Administration",
              "Political Science",
              "Humanities",
              "English Literature",
              "Economics",
              "Social Studies",
              "Science",
              "Mathematics",
              "Literature",
              "Marketing",
              "Foreign Language",
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
                {isEditFormVisible && selectedUser === user ? (
                  <div className="fixed bottom-0 right-0 z-50">
                    <div
                      className="form-popup w-80 h-96 flex flex-col border shadow-md bg-white sticky bottom-0 right-0 ..."
                      id="myForm"
                    >
                      <div className="flex items-center justify-between border-b p-2">
                        <div className="flex items-center">
                          {/* close chat window */}
                          <button
                            onClick={() => closeForm(user)}
                            className="inline-flex hover:bg-indigo-50 rounded-full p-2 right-0 absolute"
                            type="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 "
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          {/* User info */}
                          <img
                            className="rounded-full w-10 h-10"
                            src={user.photo}
                          />
                          <div className="pl-2">
                            <div className="font-semibold">
                              <a
                                className="hover:underline"
                                href={`/users/${user.user_id}`}
                              >
                                {user.first_name}
                              </a>
                            </div>
                          </div>
                        </div>
                        {/* message thread          */}

                        <div className="flex-1 px-4 py-4 overflow-y-auto">
                          <div className="flex items-center mb-4">
                            {isEditFormVisible && selectedMessage && (
                              <MessageThread
                                selectedMessage={selectedMessage}
                                className="absolute inset-x-0 bottom-0 h-16 ..."
                              />
                            )}
                          </div>
                        </div>

                        {/* chat input / new message */}
                        <div style={{ position: "absolute", bottom: "0" }}>
                          {user ? (
                            <NewMessage
                              sender={1}
                              receiver={user.user_id}
                              thread_id={existingThread}
                              updateMessages={updateMessages}
                              className="w-full rounded-full border border-gray-200"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* open pop up / connect button */}
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href="#"
                      onClick={() => openForm(user, existingThread)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg bg-indigo-800 border border-transparent py-4 text-sm font-semibold text-white"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Buddies.propTypes = {};
