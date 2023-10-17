import { useState, useEffect } from "react";
import {
  AuthError,
  getProfile,
  getRsvpByUserId,
  getAllMyFavorites,
  getUnreadMessages,
  getAllRatings,
  getRatingsForUser,
} from "../fetching";
import { LOGIN_ROUTE } from "./login";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "./ratingstar";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState(null);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [events, setEvents] = useState([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const navigate = useNavigate();

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate.replace(",", "");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProfile();
        setUser(response);
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

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favorites = await getAllMyFavorites();
        setFavoriteUsers(favorites);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFavorites();
  }, []);

  useEffect(() => {
    async function getAllEvents() {
      try {
        if (user) {
          const response = await getRsvpByUserId(user.user_id);
          setRsvps(response);
          console.log("Rsvps:", response);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getAllEvents();
  }, [user]);

  useEffect(() => {
    async function getAllRatings() {
      try {
        if (user) {
          const response = await getRatingsForUser(user.user_id);
          setRatings(response);
          console.log("RatingsL", response);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getAllRatings();
  },[user]);

    let avg = 0;

    if (ratings&&ratings.length > 0) {
      const totalStars = ratings.reduce(
        (total, rating) => total + rating.rating_star,
        0
      );
      avg = totalStars / ratings.length;
    }

  useEffect(() => {
    async function fetchUnreadMessageCount() {
      if (user) {
        try {
          const count = await getUnreadMessages(user.user_id);
          setUnreadMessageCount(count);
          console.log("Unread messages:", count);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchUnreadMessageCount();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen  bg-white mt-16">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
        <div className="post p-5 lg:p-1 rounded-md">
          <div className="lg:fixed lg:top-7 lg:left-14 lg:w-3/12 md:fixed md:w-5/12">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mb-4 mt-16">
              {/* <!-- Banner Profile --> */}
              <div className="relative">
                <img
                  src="https://prod-website-cdn.studysmarter.de/sites/5/us/Study-with-Me-dark-2048x1152-1-1536x864-min.png"
                  alt="Banner Profile"
                  className="w-full rounded-t-lg"
                />
                <img
                  src={user.photo}
                  alt="Profile Picture"
                  className="absolute bottom-0 left-2/4 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
                />
              </div>
              {/* <!-- User Info with Verified Button --> */}
              <div className="flex items-center mt-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {user.first_name}
                </h2>
              </div>
              {/* <!-- Bio --> */}
              <p className="text-gray-700 mt-2"> {user.about_me} </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
              <form>
                {/* <!-- Post Content Section --> */}
                <div className="mb-6">
                  <label
                    htmlFor="postContent"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Daily Check in:
                  </label>

                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    whatever
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          option 1
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          option 2
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          option 3
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="laravel-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="laravel-checkbox"
                          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          option 4
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- Submit Button and Character Limit Section --> */}
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                  >
                    {" "}
                    Submit{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      id="send"
                      fill="#fff"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- First Column / EVENT INFO--> */}
        <div className="lg:col-span-2 p-4 bg-white mt-3" id="posted">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
              {/* <!-- User Info with Three-Dot Menu --> */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://img.freepik.com/free-vector/boy-student-sitting-stack-books-with-laptop-flat-icon-illustration_1284-64037.jpg"
                    alt="Event Avatar"
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Events</p>
                    <p className="text-gray-500 text-sm">Upcoming Events</p>
                  </div>
                </div>
              </div>
              {/* <!-- Message --> */}
              <div className="flex flex-col gap-4">
                {rsvps.map((event) => (
                  <div
                    key={event.event_id}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-green-50  px-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/events/${event.event_id}`}
                        className="w-1/ p-2"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="truncate text-xs text-gray-500">
                          {new Date(event.datetime).toLocaleString()}{" "}
                          {event.timezone}
                        </p>
                        <p className="text-md font-medium text-gray-900">
                          {event.title}
                        </p>
                        <p className="truncate text-xs text-emerald-600 italic">
                          {!event.location &&
                            !event.address &&
                            event.virtual && <p>Virtual {event.virtual}</p>}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <!-- Second Column / RATING--> */}
            <div className="bg-white p-8 shadow-md rounded-lg max-w-md">
              {/* <!-- User Info with Three-Dot Menu --> */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://img.freepik.com/free-vector/customer-feedback-abstract-illustration-flat-style_335657-4558.jpg?w=996&t=st=1697059699~exp=1697060299~hmac=8c8b224c3d2131bc4e17dd40e5a7a872a0f010d2cbf9f63893bfea7f6f824278"
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Ratings</p>
                    <p className="text-gray-500 text-sm">Current Ratings</p>
                  </div>
                </div>
              </div>
              {/* <!-- Message --> */}
              <div className="mb-4">
                <a href="" className="text-blue-600">
                {avg===0?null:<StarRating averageRating={avg}/>}
                </a>
                <p className="text-gray-800">Average Rating: {avg===0?'No Rating Available': avg.toFixed(2)}</p>
              </div>
   {/* <!-- Message --> */}
   <div className="flex flex-col gap-4">
                {ratings.map((rating,index) => (
                  <div
                    key={index}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-green-50  px-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/users/${user.user_id}`}
                        className="w-1/ p-2"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="truncate text-xs text-gray-500">
                        {<StarRating averageRating= {parseInt(rating.rating_star)}/>}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                        {formatDateTime(rating.posted_at)}
                        </p>
                        <p className="text-md font-medium text-gray-900">
                          {rating.rating_content}
                        </p>

                      </Link>
                    </div>
                  </div>
                                ))}
              </div>
            </div>
            {/* <!-- PARTNERS--> */}
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
              {/* <!-- User Info with Three-Dot Menu --> */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://img.pikbest.com/png-images/20211011/focused-people-studying-in-online-school_6139981.png!bw700"
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      Favorite Buddies
                    </p>
                    <p className="text-gray-500 text-sm">
                      Some of your favorite people to work with
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Message --> */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {favoriteUsers.map((favorite_buddy) => (
                  <div
                    key={favorite_buddy.user_id}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-pink-50 px-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={favorite_buddy.photo}
                        alt={favorite_buddy.first_name}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/users/${favorite_buddy.user_id}`}
                        className="w-1/ p-2"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {favorite_buddy.first_name} {favorite_buddy.last_name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {favorite_buddy.education_level}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <!-- Second Column --> */}
            <div className="bg-white p-8 shadow-md rounded-lg max-w-md">
              {/* <!-- User Info with Three-Dot Menu --> */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/010/915/785/non_2x/3d-business-mail-send-icon-or-3d-business-important-mail-send-concept-icon-or-3d-mail-envelope-icon-free-png.png"
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Messages</p>
                    <p className="text-gray-500 text-sm">Unread messages:</p>
                  </div>
                </div>
              </div>
              {/* <!-- Message --> */}
              <div className="mb-4">
                <a href="" className="text-blue-600">
                  You have {unreadMessageCount} unread messages.
                </a>
                <p className="text-gray-800">maybe not</p>
              </div>
              {/* <!-- Image --> */}
              <div className="mb-4">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e02da3d7774dfff7799598fa07b"
                  alt="Post Image"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
