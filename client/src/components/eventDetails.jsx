import { useState, useEffect } from "react";
import { getEventById, getUserById, createRsvp, deleteRsvp } from "../fetching";
import { useParams, Link } from "react-router-dom";
import {
  VideoCameraIcon,
  CheckCircleIcon,
  LinkIcon,
} from "@heroicons/react/outline";
import EventComments from "./AllComments";
import DeleteEvent from "./eventdelete";

// Define a mapping of topic names to image URLs
const topicImageMapping = {
  Science:
    "https://e0.pxfuel.com/wallpapers/135/1007/desktop-wallpaper-science-background-vectors-stock-psd-social-science.jpg",
  Mathematics:
    "https://t4.ftcdn.net/jpg/02/05/76/23/360_F_205762306_KCw2syVz457NVnZNQCgFdeWW0MRKqlt0.jpg",
  Art: "https://i.pinimg.com/736x/cb/2c/13/cb2c130454e570e4d6a2896928b9a1d0.jpg",
  "Social Studies":
    "https://www.oksd.wednet.edu/cms/lib/WA01001356/Centricity/Domain/78/geography-555x370.jpg",
  Literature:
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl0ZXJhdHVyZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "Foreign Language":
    "https://media.istockphoto.com/id/493800479/photo/thank-you.webp?b=1&s=170667a&w=0&k=20&c=3NBo_wEnJ7AEZ2mDuyGKZqmZssmKNN7sUOYX7xKjdpo=",
  "Computer Science":
    "https://t4.ftcdn.net/jpg/02/38/56/37/360_F_238563715_TT246ABsfPc7OMkIASI5wTOYiwwlf8Yz.jpg",
  Business:
    "https://thumbs.dreamstime.com/b/infographic-showing-economics-trends-39390289.jpg",
};

// Function to get the image URL based on the event's topic
function getImageUrl(topic) {
  // Check if the topic exists in the mapping, otherwise use a default image URL
  return (
    topicImageMapping[topic] ||
    "https://media.istockphoto.com/id/594484448/vector/books-sketch-seamless.jpg?s=612x612&w=0&k=20&c=DACpDBVkXYVwafxvixLdFERAbVJMF94SyZO9gJ0FcU4="
  );
}

export default function Event({setLoggedIn}) {
  const [event, setEvent] = useState([]);
  const [host, setHost] = useState(null);
  const [rsvp, setRsvp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchEvent() {
      const singleEvent = await getEventById(id);
      setEvent(singleEvent);
      setLoggedIn(true);

      // Fetch the host's information based on host_id
      const hostId = singleEvent.host_id;
      const hostInfo = await getUserById(hostId);
      setHost(hostInfo);
    }
    fetchEvent();
  }, [id]);

  const imageUrl = getImageUrl(event.topic);

  // Function to toggle the attending state
  const toggleRsvp = async () => {
    if (rsvp) {
      // If already attending, set the user to unattending
      await deleteRsvp(id);
    } else {
      // If not attending, set the user to attending
      await createRsvp(id);
    }
    // Toggle the attending state
    setRsvp(!rsvp);
  };

  // Function for google meet link
  const meetingLink = event.meeting_link;

  const joinMeeting = () => {
    if (meetingLink) {
      window.open(meetingLink);
    } else {
      alert("Meeting link is not available");
    }
  };

  return (
    <div>
      {/* Rounded Image */}
      <img className="h-32 w-full object-cover lg:h-48" src={imageUrl} alt="" />

      {/* Event Title */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-40 sm:w-40"
              src={host ? host.photo : imageUrl}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              {host && (
                <Link to={`/users/${host.user_id}`} className="text-gray-500">
                  <h3>Hosted By: </h3>
                  {/* Apply different styles to "Hosted By" and the host's name */}
                  <h1 className="truncate text-2xl font-bold">
                    <span className="text-blue-500 hover:text-blue-700">
                      {host.first_name} {host.last_name}
                    </span>
                  </h1>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {event.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-8">
        {/* Event Title and Buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold">{event.title}</h1>
          </div>

          <div className="grid grid-rows-2 gap-4">
            {/* Link Button */}
            <button
              className="bg-gray-400 text-white px-3 py-3 rounded-lg shadow-md  focus:outline-none flex items-center"
              onClick={() => alert("Copy Link When Clicked")}
            >
              <LinkIcon className="-ml-0.5 h-5" aria-hidden="true" />
              <span className="ml-2">Share</span>
            </button>

            {/* RSVP Button */}
            <button
              className={`px-8 py-4 rounded-lg shadow-md focus:outline-none flex items-center
    ${rsvp ? "bg-indigo-100 text-indigo-600" : "bg-indigo-600 text-white"}
    hover:bg-indigo-700`}
              onClick={toggleRsvp}
            >
              {rsvp && (
                <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="ml-2">{rsvp ? "RSVPed" : "RSVP"}</span>
            </button>

            {/* Join Button */}
            {meetingLink && (
              <button
                className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none flex items-center"
                onClick={joinMeeting}
              >
                <VideoCameraIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="ml-2">Join the Meeting</span>
              </button>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <p className="text-gray-600 mb-4">
          Date & Time: {new Date(event.datetime).toLocaleString()}{" "}
          {event.timezone}
        </p>

        {/* Topic */}
        <p className="text-gray-600 mb-4">Topic: {event.topic}</p>

        {event.group !== null ? (
          <p className="text-gray-600 mb-4">Group Study</p>
        ) : (
          <p>Partner Study</p>
        )}

        {event.gender !== null ? (
          <p className="text-gray-600 mb-4">Gender: {event.gender}</p>
        ) : null}

        {event.location !== null && (
          <p className="text-gray-600 mb-4">
            Address: {event.address} {event.location}
          </p>
        )}

        <br></br>
        <h1 className="text-3xl font-bold">Description</h1>
        <div className="mt-8 text-xl text-gray-800">
          <p>{event.description}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6 text-white">
        <div>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            
          >
            <Link to={`/edit_event/${id}` } style={{ color: "white" }}>
              Edit Event
            </Link>
          </button>
        </div>
        <DeleteEvent event_id={id} />
      </div>
      <br />
      <br />
      <br />
      <div>
        <EventComments event_id={id} />
      </div>
    </div>
  );
}
