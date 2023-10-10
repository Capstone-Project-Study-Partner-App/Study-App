import { useState, useEffect } from "react";
import { getUserById } from "../fetching";
import { useParams } from "react-router-dom";
import Rating from './rating'

export default function User() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      const singleUser = await getUserById(id);
      setUser(singleUser);
    }
    fetchUser();
  }, [id]);

  if (user === null) {
    return null;
  }

  return (
    <div>
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-screen-2xl mx-auto flex items-center">
        <div className="w-1/3 text-center">
          <img
            className="mx-auto w-96 aspect-square flex-shrink-0 rounded-full"
            src={user.photo}
            alt={`${user.first_name} ${user.last_name}`}
            // className="w-full h-auto rounded-lg"
          />
          <h1 className="text-2xl font-semibold mt-4">
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <div className="flex-grow ml-4 text-left">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-600 mt-2">{user.about_me}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2">
                  <b>Age:</b> {user.age}
                </p>
                <p className="mb-2">
                  <b>Location Zip Code:</b> {user.location}
                </p>
                <p className="mb-2">
                  <b>Current Education level:</b> {user.education_level}
                </p>
                {user.work !== null ? (
                  <p className="mb-2">
                    <b>Work Title:</b> {user.work}
                  </p>
                ) : null}
                <p className="mb-2">
                  <b>Institution:</b> {user.education}
                </p>
                <p className="mb-2">
                  <b>Major:</b> {user.major}
                </p>
                <p className="mb-2">
                  <b>Gender:</b> {user.gender}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <b>Classes Taken:</b> {user.classes}
                </p>
                <p className="mb-2">
                  <b>Days Available:</b> {user.days_available.join(", ")}
                </p>
                <p className="mb-2">
                  <b>Times Available:</b> {user.times_available}
                </p>
                <p className="mb-2">
                  <b>Interests:</b> {user.interests}
                </p>
                <p className="mb-2">
                  <b>Languages:</b> {user.languages}
                </p>
                <p className="mb-2">
                  <b>Current Study Mode:</b> {user.study_habits}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Rating/>
    </div>
    </div>
  );
}

// export default function User() {
//   const [user, setUser] = useState([]);
//   const { id } = useParams();
//   useEffect(() => {
//     async function fetchUser() {
//       const singleUser = await getUserById(id);
//       setUser(singleUser);
//     }
//     fetchUser();
//   }, [id]);
//   return (
//     <div>
//       <img src={user.photo} alt={`${user.first_name} ${user.last_name}`} />
//       <h1>{user.first_name} {user.last_name}</h1>
//       <p><b>Age:</b> {user.age}</p>
//       <p><b>Location Zip Code:</b> {user.location}</p>
//       <p><b>About me:</b> {user.about_me}</p>
//       <p><b>Current Education level:</b> {user.education_level}</p>
//       <p><b>Work Title:</b> {user.work}</p>
//       <p><b>Institution:</b> {user.education}</p>
//       <p><b>Classes Taken:</b> {user.classes}</p>
//       <p><b>Days Available:</b> {user.days_available}</p>
//       <p><b>Times Available:</b> {user.times_available}</p>
//       <p><b>Interests:</b> {user.interests}</p>
//       <p><b>Languages:</b> {user.languages}</p>
//       <p><b>Current Study Mode:</b> {user.study_habits}</p>
//       <p><b>Major:</b> {user.major}</p>
//       <p><b>Gender:</b> {user.gender}</p>

//     </div>
//   );
// }
