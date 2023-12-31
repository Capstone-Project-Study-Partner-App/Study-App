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
import CheckIn from "./dailycheckin";

export default function UserDashboard({ setLoggedIn }) {
  const [user, setUser] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState(null);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [events, setEvents] = useState([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadMessageContent, setUnreadMessageContent] = useState([]);
  const [unreadThreadCount, setUnreadThreadCount] = useState(0);
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
        setLoggedIn(true);
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
  }, [user]);

  let avg = 0;

  if (ratings && ratings.length > 0) {
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
          const unread = await getUnreadMessages(user.user_id);
          setUnreadMessageCount(unread.unread_count);
          // show only by thread
          const groupedUnreadMessages = {};
          unread.unread_messages.forEach((message) => {
            if (!groupedUnreadMessages[message.thread_id]) {
              groupedUnreadMessages[message.thread_id] = message;
            }
          });

          const unreadMessagesArray = Object.values(groupedUnreadMessages);
          setUnreadMessageContent(unreadMessagesArray);

          // number of threads with unread messages
          const uniqueThreadIds = new Set(
            unreadMessagesArray.map((message) => message.thread_id)
          );
          setUnreadThreadCount(uniqueThreadIds.size);

          console.log("Unread messages total:", unread.unread_count);
          console.log("Unread messages content:", unreadMessagesArray);
          console.log("Threads with unread messages:", uniqueThreadIds.size);
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
    <div className="h-screen bg-white mt-8 ">
      <div className="grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 ">
        <div className="post p-5 lg:p-4 rounded-md">
          <div className="lg:col-span-2 p-4 bg-white pb-20">
            <div className="bg-sky-50 p-8 rounded-lg shadow-lg max-w-md w-full mb-4 mt-16">
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
            {/* <!-- DAILY CHECK IN --> */}
            <div className="bg-sky-50 p-8 rounded-lg shadow-md max-w-md w-full lg:col-span-2  mt-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://img.freepik.com/premium-photo/3d-calendar-with-alarm-clock-icon_356415-1854.jpg?w=360"
                    alt="Check in icon"
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      Daily Check in:
                    </p>
                    <p className="text-gray-500 text-sm">
                      How are you feeling today?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-2 ">
                <CheckIn user_id={user.user_id} />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- First Column / EVENT INFO--> */}
        <div className="lg:col-span-2 p-4 bg-white mt-3" id="posted">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-sky-50 p-8 rounded-lg shadow-md max-w-md">
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
            <div className="bg-sky-50 p-8 shadow-md rounded-lg max-w-md">
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
                  {avg === 0 ? null : <StarRating averageRating={avg} />}
                </a>
                <p className="text-gray-800">
                  Average Rating:{" "}
                  {avg === 0 ? "No Rating Available" : avg.toFixed(2)}
                </p>
              </div>
              {/* <!-- Message --> */}
              <div className="flex flex-col gap-4">
                {ratings.map((rating, index) => (
                  <div
                    key={index}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-green-50  px-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  >
                    <div className="min-w-0 flex-1">
                      <Link to={`/users/${user.user_id}`} className="w-1/ p-2">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="truncate text-xs text-gray-500">
                          {
                            <StarRating
                              averageRating={parseInt(rating.rating_star)}
                            />
                          }
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
            <div className="bg-sky-50 p-8 rounded-lg shadow-md max-w-md">
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
            {/* <!-- UNREAD MESSAGES--> */}
            {/* <!-- Second Column --> */}
            <div className="bg-sky-50 p-8 rounded-lg shadow-md max-w-md">
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
                    <p className="text-gray-500 text-sm">
                      You have {unreadThreadCount} unread messages
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Message --> */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {unreadMessageContent.map((message, index) => (
                  <div
                    key={index}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-fuchsia-100 px-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={message.sender_photo}
                        alt={message.sender_first_name}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/${user.user_id}/messages`}
                        className="w-1/ p-2"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {message.sender_first_name} {message.sender_last_name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {message.message_content}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
