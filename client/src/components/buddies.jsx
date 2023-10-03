import { useState, useEffect } from "react";
import { AuthError, getAllUsers } from "../fetching";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { LOGIN_ROUTE } from "./login";

export default function Buddies() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getAllUsers();
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
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-xxl font-semibold mb-4">Filters</h1>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-4">Age</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">15-17</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">18-25</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">25-30</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">30+</span>
          </label>

          {/* Location */}
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2 text-white">Zipcode: </span>
            <select
              multiple
              id="countries_multiple"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </label>

          {/* Institution */}
          <h2 className="text-xl font-semibold mb-4">Institution</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">University Name: </span>
          </label>

          <h2 className="text-xl font-semibold mb-4">Education Level</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">High School</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">College Freshman</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">College Sophmore</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">College Junior</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">College Senior</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Masters</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">phD</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Other</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Available Days</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Monday</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Tuesday</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Wednesday</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Thursday</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Friday</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Saturday</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Sunday</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Available Times</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Morning</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Afternoon</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Evening</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Language</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">English</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Spanish</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Mandarin</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">French</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Arabic</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Other</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Study Commitment</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Chill</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Semi-Chill</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Semi-Grind</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Grind</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Major</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">English</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Mathematics</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Science</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Social Studies</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Finance/ Economics</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Computer Science</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Business/Marketing</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Gender</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Male</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Female</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Nonbinary</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Other</span>
          </label>
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
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allUsers.map((user) => (
            <li
              key={user.email}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-md"
            >
              <div className="flex flex-1 flex-col p-8 bg-slate-50">
                <img className="mx-auto w-32 aspect-square flex-shrink-0 rounded-full" src={user.photo} alt={`${user.first_name} ${user.last_name}`} />
                <h3 className="mt-6 text-md font-medium text-gray-900">{user.first_name} {user.last_name}</h3>
                <dl className="mt-1 flex flex-grow flex-col">
                  <dd className="text-sm text-gray-500"><b>Age:</b> {user.age}</dd>
                  <dd className="text-sm text-gray-500">{user.gender}</dd>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {user.education_level}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
              </div>
              <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a href="#"
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg bg-indigo-800	 border border-transparent py-4 text-sm font-semibold text-white"
                >
                  Connect
                </a>
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
