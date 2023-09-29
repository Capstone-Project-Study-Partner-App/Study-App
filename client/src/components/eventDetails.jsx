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
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <img
              className="h-96 w-full rounded-2xl object-cover shadow-xl"
              src="https://media.istockphoto.com/id/594484448/vector/books-sketch-seamless.jpg?s=612x612&w=0&k=20&c=DACpDBVkXYVwafxvixLdFERAbVJMF94SyZO9gJ0FcU4="
              alt=""
            />
          </div>
          <div className="w-full lg:w-1/3 text-white">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              {event.title}
            </h2>
            <p className="text-lg leading-8 mb-4">Topic: {event.topic}</p>
            <p className="text-white-500 mb-4">{event.description}</p>

            <ul className="list-disc list-inside">
              {event.location !== null && (
                <li>
                  Zipcode: {event.location} {event.virtual}
                </li>
              )}
              {event.address !== null && <li>Where: {event.address}</li>}
              {event.virtual === true && (
                <li className="text-green-500">Virtual</li>
              )}
              <li>Session length: {event.duration} minutes</li>
              <li>When: {new Date(event.datetime).toLocaleString()}</li>
              {event.group !== null ? <li>Group: Yes</li> : null}
              {event.gender !== null ? <li>Gender: {event.gender}</li> : null}
            </ul>
            <br></br>
            <button
              type="button"
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              RSVP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="md:flex-1 px-4">
<h2 className="mb-2 leading-tight tracking-tight font-bold text-white-800 text-2xl md:text-3xl">
  {event.title}
</h2>
<p className="text-white-500 text-xl">Topic: {event.topic}</p>
<div className="flex items-center space-x-4 my-4">
  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
    <span className="font-bold text-indigo-600 text-3xl">
      When: {new Date(event.datetime).toLocaleString()}
    </span>
  </div>
  {event.location !== null && (
    <div>
      <p className="text-white-500 text-xl font-semibold">
        Zipcode: {event.location} {event.virtual}
      </p>
      {event.address !== null && (
        <p className="text-white-500 text-xl font-semibold">
          Where: {event.address}
        </p>
      )}
    </div>
  )}
  {event.virtual === true && (
    <div>
      <p className="text-green-500 text-xl font-semibold">Virtual</p>
    </div>
  )}

  <div>
    <p className="text-white-500 text-xl font-semibold">
      Session length:
    </p>
    <p className="text-white-500 text-xl font-semibold">
      {event.duration} minutes
    </p>
  </div>
</div>
<p className="text-white-500">About: {event.description}</p>
{/* <p>{event.gender}</p> */
}
{
  /* <p>{event.group}</p>
<br></br>
<button
  type="button"
  className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
>
  RSVP
</button>
</div>
); */
}

{
  /* <div className="comments-section relative grid grid-cols-1 gap-4 p-6 mb-8 border rounded-lg bg-white shadow-lg">
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
</div> */
}
