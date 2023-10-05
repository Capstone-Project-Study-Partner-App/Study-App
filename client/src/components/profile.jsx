import { useState, useEffect } from "react";
import { AuthError, getProfile, logOutUser } from "../fetching";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "./login";
import Select from "react-select";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [selectedDayOptions, setSelectedDayOptions] = useState();
  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState();
  const [selectedTimeOptions, setSelectedTimeOptions] = useState();
  const [selectedTimezoneOptions, setSelectedTimezoneOptions] = useState();
  const navigate = useNavigate();

  function handleDaySelect(data) {
    setSelectedDayOptions(data);
  }

  function handleTimeSelect(data) {
    setSelectedTimeOptions(data);
  }

  function handleTimezoneSelect(data) {
    setSelectedTimezoneOptions(data);
  }

  function handleLanguageSelect(data) {
    setSelectedLanguageOptions(data);
  }

  const days = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const times = [
    { value: "Morning", label: "Morning" },
    { value: "Afternoon", label: "Afternoon" },
    { value: "Evening", label: "Evening" },
    { value: "Night", label: "Night" },
  ];

  const timezonesOptions = [
    { value: "HST", label: "HST" },
    { value: "AKST", label: "AKST" },
    { value: "PST", label: "PST" },
    { value: "MST", label: "MST" },
    { value: "CST", label: "CST" },
    { value: "EST", label: "EST" },
  ];

  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "French", label: "French" },
    { value: "Arabic", label: "Arabic" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const { current_user } = await getProfile();
        setUser(current_user);
      } catch (err) {
        if (err instanceof AuthError) {
          navigate(LOGIN_ROUTE);
        } else {
          throw err;
        }
      }
    }
    fetchData();
  }, []);

  if (user === null) {
    // it's loading
    return <></>;
  }

  return (
    <form className="profile">
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            User Information
          </h2>

          <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Profile Picture
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
            >
              About Me
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              {/* Textarea for About */}
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Use this space to describe who you are so buddies can get to
                know you better!
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Email
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.email}
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Password
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.password}
                    name="password"
                    id="password"
                    autoComplete="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                First Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.first_name}
                    name="first_name"
                    id="first_name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Name"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Last Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.last_name}
                    name="last_name"
                    id="last_name"
                    autoComplete="last_name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Gender
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    type="text"
                    value={user.gender}
                    name="gender"
                    id="gender"
                    autoComplete="gender"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Age
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    type="text"
                    value={user.age}
                    name="age"
                    id="age"
                    autoComplete="age"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Age"
                  >
                    <option value="">Select Age</option>
                    <option value="15-17">15-17</option>
                    <option value="18-25">18-24</option>
                    <option value="26-30">25-29</option>
                    <option value="30+">30+</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Location
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.location}
                    name="location"
                    id="location"
                    autoComplete="location"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Location"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="days_available"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Days Available
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <Select
                    id="days_available"
                    className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    options={days}
                    value={selectedDayOptions}
                    isSearchable={true}
                    isMulti
                    type="text"
                    name="days_available"
                    placeholder="Select Days Available"
                    onChange={handleDaySelect}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="times_available"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Times Available
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <Select
                    id="times_available"
                    className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    options={times}
                    value={selectedTimeOptions}
                    isSearchable
                    isMulti
                    type="text"
                    name="times_available"
                    autoComplete="times_available"
                    placeholder="Times Available"
                    onChange={handleTimeSelect}
                    required
                  />
                </div>
                <p
                  className="mt-3 text-sm leading-6 text-gray-600"
                  style={{ whiteSpace: "nowrap" }}
                >
                  ex: Morning (5AM-12PM), Afternoon (12PM-5PM), Evening
                  (5PM-9PM), Night (9PM-5AM)
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="timezone"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Time Zone
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <Select
                    id="timezone"
                    className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    options={timezonesOptions}
                    value={selectedTimezoneOptions}
                    isSearchable={true}
                    type="text"
                    name="timezone"
                    placeholder="Select Time Zone"
                    onChange={handleTimezoneSelect}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Experience & Interests
          </h2>
          <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="education"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Education
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.education}
                    name="education"
                    id="education"
                    autoComplete="education"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Education"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  ex: Hillview University, The Grace Hopper Program at Full
                  Stack Academy
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="education_level"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Education Level
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    type="text"
                    value={user.education_level}
                    name="education_level"
                    id="education_level"
                    autoComplete="education_level"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Education Level"
                  >
                    <option value="">Select Education Level</option>
                    <option value="High School">High School</option>
                    <option value="College Freshman">College Freshman</option>
                    <option value="College Sophomore">College Sophomore</option>
                    <option value="College Junior">College Junior</option>
                    <option value="College Senior">College Senior</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="major"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Major
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      type="text"
                      value={user.major}
                      name="major"
                      id="major"
                      autoComplete="major"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Major"
                    >
                      <option value="">Select Major</option>
                      <option value="Art">Art</option>
                      <option value="Business">Business</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Foreign Language">Foreign Language</option>
                      <option value="Literature">Literature</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Social Studies">Social Studies</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="classes"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Classes
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.classes}
                    name="classes"
                    id="classes"
                    autoComplete="classes"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Classes"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Classes taken or are currently taking.
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="study_habits"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Study Habits
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      type="text"
                      value={user.study_habits}
                      name="study_habits"
                      id="study_habits"
                      autoComplete="study_habits"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Study Commitment"
                    >
                      <option value="">Select Study Commitment</option>
                      <option value="Chill">Chill</option>
                      <option value="Semi-Chill">Semi-Chill</option>
                      <option value="Semi-Grind">Semi-Grind</option>
                      <option value="Grind">Grind</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              {" "}
              <label
                htmlFor="interests"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Interests
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.interests}
                    name="interests"
                    id="interests"
                    autoComplete="interest"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Interests"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="languages"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Languages
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <Select
                      id="languages"
                      className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      options={languages}
                      value={selectedLanguageOptions}
                      isSearchable={true}
                      isMulti
                      type="text"
                      name="languages"
                      autoComplete="language"
                      placeholder="Select Languages"
                      onChange={handleLanguageSelect}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="work"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Work
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    value={user.work}
                    name="work"
                    id="work"
                    autoComplete="work"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Work"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  If applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        <button
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={async () => {
            await logOutUser();
            navigate(LOGIN_ROUTE);
          }}
        >
          Logout
        </button>
      </div>
    </form>
  );
}

// import { useState, useEffect } from "react";
// import { AuthError, getProfile, logOutUser } from "../fetching";
// import { useNavigate, Link } from "react-router-dom"; // Import Link
// import { LOGIN_ROUTE } from "./login";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { current_user } = await getProfile();
//         setUser(current_user);
//       } catch (err) {
//         if (err instanceof AuthError) {
//           navigate(LOGIN_ROUTE);
//         } else {
//           throw err;
//         }
//       }
//     }
//     fetchData();
//   }, []);

//   if (user === null) {
//     // it's loading
//     return <></>;
//   }

//   return (
//     <div>
//       <div className="flex">
//         {user.email}
//         {user.first_name}
//         {user.last_name}
//       </div>
//       <div>
//         <button
//           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//           onClick={async () => {
//             await logOutUser();
//             navigate(LOGIN_ROUTE);
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
