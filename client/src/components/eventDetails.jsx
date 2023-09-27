import { useState, useEffect } from "react";
import { getEventById } from "../fetching";
import { useParams } from "react-router-dom";

export default function Event() {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchEvent() {
      const singleEvent = await getEventById(id);
      setEvent(singleEvent);
    }
    fetchEvent();
  }, [id]);

  return (
    <div className="md:flex-1 px-4">
      <h2 className="mb-2 leading-tight tracking-tight font-bold text-white-800 text-2xl md:text-3xl">
        {event.title}
      </h2>
      <p className="text-gray-500 text-sm">Hosted By (host name)</p>
      <p className="text-white-500 text-xl">Topic: {event.topic}</p>
      <div className="flex items-center space-x-4 my-4">
        <div className="rounded-lg bg-gray-100 flex py-2 px-3">
          <span className="font-bold text-indigo-600 text-3xl">
            When: {event.datetime}
          </span>
        </div>
        <div>
          <p className="text-green-500 text-xl font-semibold">
            {event.location} {event.virtual}
          </p>
          <p className="text-gray-400 text-sm">
            Created On: {event.created_at}
          </p>
        </div>
        <div>
          <p className="text-white-500 text-xl font-semibold">
            Session length:
          </p>
          <p className="text-white-500 text-xl font-semibold">
            {event.duration}
          </p>
        </div>
      </div>
      <p className="text-white-500">About: {event.description}</p>
      {/* <p>{event.gender}</p> */}
      <p>{event.group}</p>
      <button
        type="button"
        className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
      >
        RSVP
      </button>

      {/* <div className="comments-section relative grid grid-cols-1 gap-4 p-6 mb-8 border rounded-lg bg-white shadow-lg">
        <div className="relative flex gap-4">
          <img
            src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
            className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
            alt=""
            loading="lazy"
          ></img>
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                COMMENTOR
              </p>
              <a className="text-gray-500 text-xl" href="#">
                <i className="fa-solid fa-trash"></i>
              </a>
            </div>
            <p className="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
          </div>
        </div>
        <p className="-mt-4 text-gray-500">{event.comments}</p>
      </div> */}
    </div>
  );
}

{
  /* <div>
<h1>{event.title}</h1>
<p>{event.description}</p>
<p>{event.location}</p>
<p>{event.datetime}</p>
<p>{event.virtual}</p>
<p>{event.created_at}</p>
<p>{event.topic}</p>
<p>{event.duration}</p>
<p>{event.gender}</p>
<p>{event.group}</p>
<p>{event.comments}</p>
</div> */
}
