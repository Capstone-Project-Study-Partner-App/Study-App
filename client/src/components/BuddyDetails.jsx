import { useState, useEffect } from "react";
import {
  getUserById,
  createFavorite,
  deleteFavorite,
  checkIfFavoriteExists,
  AuthError,
  getProfile,
} from "../fetching";
import { useParams } from "react-router-dom";
import Rating from "./rating";
import RatingCreate from "./ratingcreate";
import PopUpThread from "./PopUpThread";

export default function User({ setLoggedIn }) {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      const singleUser = await getUserById(id);
      setUser(singleUser);
      setLoggedIn(true);
    }
    fetchUser();
  }, [id]);

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

  // Check if the favorite exists when the component mounts
  useEffect(() => {
    async function fetchFavoriteExists() {
      const exists = await checkIfFavoriteExists(id);
      setLiked(exists); // Set the liked state based on the result
    }
    fetchFavoriteExists();
  }, [id]);

  if (user === null) {
    return null;
  }

  // Function to toggle the liked state
  const toggleLike = async () => {
    if (liked) {
      // If already liked, unlike the user
      await deleteFavorite(id);
    } else {
      // If not liked, like the user
      await createFavorite(id);
    }
    // Toggle the liked state
    setLiked(!liked);
  };

  return (
    <div>
      <div className="bg-white min-h-screen p-4">
        <div className="max-w-screen-2xl mx-auto flex items-center">
          <div className="w-1/3 text-center">
            <img
              className="mx-auto w-96 aspect-square flex-shrink-0 rounded-full"
              src={user.photo}
              alt={`${user.first_name} ${user.last_name}`}
            />
            <h1 className="text-2xl font-semibold mt-4">
              {user.first_name} {user.last_name}
            </h1>
          </div>

          <div className="flex-grow ml-4 text-left">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-2">About Me</h2>

                <div className="flex flex-col space-y-2 ">
                  {/* Heart button */}
                  <button
                    className={`ml-2 bg-blue-400 focus:outline-none`}
                    onClick={toggleLike}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={liked ? "red" : "black"}
                      className="w-6 h-6"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  </button>

                  {/* Message button */}
                  <img
                    src="https://img1.cgtrader.com/items/840184/022253b90f/large/web-icon-mail-3d-model-obj-fbx-ma-mb-mtl.jpg"
                    className={`ml-4 w-14 h-13 rounded-md hover:border-red-400 cursor-pointer`}
                    onClick={() => {
                      setIsChatOpen(true);
                      setSelectedUser(user);
                    }}
                  />
                  {isChatOpen && selectedUser === user && (
                    <div className="fixed bottom-0 right-0 z-50">
                      <PopUpThread
                        sender={currentUser.user_id}
                        receiver={selectedUser.user_id}
                        currentUser={currentUser}
                        selectedUser={selectedUser}
                        closeChat={() => setIsChatOpen(false)} // Function to close the chat
                      />
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mt-2">{user.about_me}</p>
            </div>

            {/* General Info Section */}
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
                    <b>Times Available:</b> {user.times_available.join(", ")}
                  </p>
                  <p className="mb-2">
                    <b>Interests:</b> {user.interests}
                  </p>
                  <p className="mb-2">
                    <b>Languages:</b> {user.languages.join(", ")}
                  </p>
                  <p className="mb-2">
                    <b>Current Study Mode:</b> {user.study_habits}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Rating />
      <RatingCreate userId={user.user_id} />
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
