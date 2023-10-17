import { useState, useEffect } from "react";
import { getProfile, updateUser, AuthError } from "../fetching";
// import Select from "react-select";
import { LOGIN_ROUTE } from "./login";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile({ user_id, setLoggedIn }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getProfile();
        console.log("Fetched user data:", response);
        setUser(response);
        setLoggedIn(true);
        // setUser((prevUser) => ({ ...prevUser, ...current_user }));
      } catch (err) {
        if (err instanceof AuthError) {
          navigate(LOGIN_ROUTE);
        } else {
          throw err;
        }
      }
    }
    fetchUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedUserData = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        // password: user.password,
        location: user.location,
        about_me: user.about_me,
        education: user.education,
        education_level: user.education_level,
        classes: user.classes,
        days_available: user.days_available,
        times_available: user.times_available,
        timezone: user.timezone,
        interests: user.interests,
        photo: user.photo,
        languages: user.languages,
        study_habits: user.study_habits,
        major: user.major,
        age: user.age,
        work: user.work,
      };
      console.log(updatedUserData);
      const response = await updateUser(user.user_id, updatedUserData);
      console.log("prof updated", response);
      setUser(response);
    } catch (error) {
      console.error("oopsie prof updates a no-go", error);
      setError("failed to update profile");
    }
    // window.location.reload();
    alert("Your changes have been saved!");
  }

  return (
    <div>
      {user && (
        <form className="profile" onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                User Information
              </h2>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Profile Picture
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      value={user.photo || ""}
                      name="photo"
                      id="photo"
                      autoComplete="photo"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Photo"
                      onChange={(e) =>
                        setUser({ ...user, photo: e.target.value })
                      }
                    />
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
                    type="text"
                    name="about"
                    autoComplete="about"
                    placeholder="About Me"
                    value={user.about_me || ""}
                    rows={3}
                    className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setUser({ ...user, about_me: e.target.value })
                    }
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
                        value={user.email || ""}
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Email"
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    First Name
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={user.first_name || ""}
                        name="first_name"
                        id="first_name"
                        autoComplete="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="First Name"
                        onChange={(e) =>
                          setUser({ ...user, first_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Last Name
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={user.last_name || ""}
                        name="last_name"
                        id="last_name"
                        autoComplete="last_name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Last Name"
                        onChange={(e) =>
                          setUser({ ...user, last_name: e.target.value })
                        }
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
                        value={user.gender || ""}
                        name="gender"
                        id="gender"
                        autoComplete="gender"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Gender"
                        onChange={(e) =>
                          setUser({ ...user, gender: e.target.value })
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
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
                        value={user.age || ""}
                        name="age"
                        id="age"
                        autoComplete="age"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Age"
                        onChange={(e) =>
                          setUser({ ...user, age: e.target.value })
                        }
                      >
                        <option value="">Select Age</option>
                        <option value="15-17">15-17</option>
                        <option value="18-24">18-24</option>
                        <option value="25-29">25-29</option>
                        <option value="30+">30+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Zipcode
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={user.location || ""}
                        name="location"
                        id="location"
                        autoComplete="location"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Location"
                        onChange={(e) =>
                          setUser({ ...user, location: e.target.value })
                        }
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
                      <select
                        id="days_available"
                        className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={user.days_available || [""]}
                        multiple
                        type="text"
                        name="days_available"
                        placeholder="Select Days Available"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            days_available: Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            ),
                          })
                        }
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    <p
                      className="mt-3 text-sm leading-6 text-gray-600"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      To select multiple options hold the Command or Ctrl key &
                      select options
                    </p>
                  </div>
                </div>

                {/* <p>Days Available:</p>
                <select
                  value={user.days_available || [""]}
                  multiple
                  name="days available"
                  type="text"
                  placeholder="days available"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      days_available: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    })
                  }
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select> */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="times_available"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Times Available
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <select
                        id="times_available"
                        className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={user.times_available || [""]}
                        multiple
                        name="times_available"
                        placeholder="Times Available"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            times_available: Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            ),
                          })
                        }
                      >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                      </select>
                    </div>
                    <p
                      className="mt-3 text-sm leading-6 text-gray-600"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      ex: Morning (5AM-12PM), Afternoon (12PM-5PM), Evening
                      (5PM-9PM), Night (9PM-5AM)
                    </p>
                    <p
                      className="mt-3 text-sm leading-6 text-gray-600"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      To select multiple options hold the Command or Ctrl key &
                      select options
                    </p>
                  </div>
                </div>

                {/* <p>Times Available:</p>
                <select
                  value={user.times_available || [""]}
                  multiple
                  name="times available"
                  placeholder="times available"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      times_available: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    })
                  }
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select> */}

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Time Zone
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <select
                        id="timezone"
                        className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={user.timezone || ""}
                        type="text"
                        name="timezone"
                        placeholder="timezone"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            timezone: e.target.value,
                          })
                        }
                      >
                        <option value="HST">HST</option>
                        <option value="AKST">AKST</option>
                        <option value="PST">PST</option>
                        <option value="MST">MST</option>
                        <option value="CST">CST</option>
                        <option value="EST">EST</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <p>Timezone:</p>
            <select
              value={user.timezone || ""}
              name="timezone"
              type="text"
              placeholder="timezone"
              onChange={(e) =>
                setUser({
                  ...user,
                  timezone: e.target.value,
                })
              }
            >
              <option value="HST">HST</option>
              <option value="AKST">AKST</option>
              <option value="PST">PST</option>
              <option value="MST">MST</option>
              <option value="CST">CST</option>
              <option value="EST">EST</option>
            </select> */}
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Experience & Interests
              </h2>

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
                      value={user.education || ""}
                      name="education"
                      id="education"
                      autoComplete="education"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Education"
                      onChange={(e) =>
                        setUser({ ...user, education: e.target.value })
                      }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    If applicable.
                  </p>
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
                      value={user.education_level || ""}
                      name="education_level"
                      id="education_level"
                      autoComplete="education_level"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Education Level"
                      onChange={(e) =>
                        setUser({ ...user, education_level: e.target.value })
                      }
                    >
                      <option value="">Select Education Level</option>
                      <option value="High School">High School</option>
                      <option value="College Freshman">College Freshman</option>
                      <option value="College Sophomore">
                        College Sophomore
                      </option>
                      <option value="College Junior">College Junior</option>
                      <option value="College Senior">College Senior</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    If applicable.
                  </p>
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
                        value={user.major || ""}
                        name="major"
                        id="major"
                        autoComplete="major"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Major"
                        onChange={(e) =>
                          setUser({ ...user, major: e.target.value })
                        }
                      >
                        <option value="">Select Major</option>
                        <option value="Art">Art</option>
                        <option value="Business">Business</option>
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Foreign Language">
                          Foreign Language
                        </option>
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
                      value={user.classes || ""}
                      name="classes"
                      id="classes"
                      autoComplete="classes"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Classes"
                      onChange={(e) =>
                        setUser({ ...user, classes: e.target.value })
                      }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Classes taken or are currently taking.
                  </p>
                </div>
              </div>
              {/* <p>Classes:</p>
              <input
                value={user.classes || [""]}
                type="text"
                name="classes"
                placeholder="classes"
                onChange={(e) =>
                  setUser({
                    ...user,
                    classes: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
              /> */}

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
                        value={user.study_habits || ""}
                        name="study_habits"
                        id="study_habits"
                        autoComplete="study_habits"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Study Commitment"
                        onChange={(e) =>
                          setUser({ ...user, study_habits: e.target.value })
                        }
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
                      value={user.interests || ""}
                      name="interests"
                      id="interests"
                      autoComplete="interest"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Interests"
                      onChange={(e) =>
                        setUser({ ...user, interests: e.target.value })
                      }
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
                      <select
                        id="languages"
                        className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={user.languages || [""]}
                        type="text"
                        multiple
                        name="languages"
                        placeholder="languages"
                        onChange={(e) =>
                          setUser({
                            ...user,
                            languages: Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            ),
                          })
                        }
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Mandarin">Mandarin</option>
                        <option value="French">French</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <p
                      className="mt-3 text-sm leading-6 text-gray-600"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      To select multiple options hold the Command or Ctrl key &
                      select options
                    </p>
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
                      value={user.work || ""}
                      name="work"
                      id="work"
                      autoComplete="work"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Work"
                      onChange={(e) =>
                        setUser({ ...user, work: e.target.value })
                      }
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    If applicable.
                  </p>
                </div>
              </div>
            </div>
            <button type="submit" className="btn draw-border">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
