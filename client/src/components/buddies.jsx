import { useState, useEffect } from "react";
import { AuthError, getAllUsers } from "../fetching";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import { LOGIN_ROUTE } from "./home";
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
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Zipcode: </span>
          </label>
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
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">All Buddies</h1>
        <div className="flex flex-wrap">
          {allUsers ? (
            allUsers.map(
              ({
                user_id,
                photo,
                first_name,
                last_name,
                gender,
                age,
                education_level,
              }) => (
                <Link
                  key={user_id}
                  to={`/users/${user_id}`}
                  className="w-1/4 p-4"
                >
                  <div
                    key={user_id}
                    className="border rounded-md p-4 hover:bg-gray-100"
                  >
                    <img src={photo} alt={`${first_name} ${last_name}`} />
                    <p>
                      {first_name} {last_name}
                    </p>
                    <p>Gender: {gender}</p>
                    <p>Age: {age}</p>
                    <p>Level of Education: {education_level}</p>
                  </div>
                </Link>
              )
            )
          ) : (
            <p>No buddies available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

Buddies.propTypes = {};
