import { useState, useEffect } from "react";
import { getAllEvents } from "../fetching";
import { Link } from "react-router-dom";

export default function Events() {
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    async function fetchAllEvents() {
      const events = await getAllEvents();
      setAllEvents(events);
    }
    fetchAllEvents();
  }, []);

  return (
    // FILTER SECTION
    <div className="flex">
      <div className="filter-section w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-xxl font-semibold mb-4">Filters</h1>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-4">Subject</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Mathematics</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">History</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Science</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Art</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Geography</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Music</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">English</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Psychology</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Computer Science</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Type of Study</h2>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Group study</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Partner work</span>
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
            <span className="ml-2">Non binary</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Other</span>
          </label>
          <h2 className="text-xl font-semibold mb-4">Days</h2>
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
          <h2 className="text-xl font-semibold mb-4">Times</h2>
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
          <br></br>
        </div>
      </div>

      {/* EVENTS SECTION*/}
      <div className="flex-1 justify-center items-center p-10">
        <div className="border-b border-gray-200 pb-5">
          <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h1 className="ml-2 mt-2  font-semibold leading-6 text-indigo-500">
              All Events
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          {allEvents ? (
            allEvents.map(
              ({
                event_id,
                title,
                location,
                address,
                datetime,
                timezone,
                virtual,
                topic,
                duration,
                gender,
                group,
              }) => {
                const eventDate = new Date(datetime);
                const formattedDate = eventDate.toLocaleString();
                return (
                  <Link
                    key={event_id}
                    to={`/events/${event_id}`}
                    className="w-1/ p-2"
                  >
                    <div className="w-80 h-90 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
                        <img
                          className="rounded-t-l w-full h-48 object-cover"
                          src="https://media.istockphoto.com/id/594484448/vector/books-sketch-seamless.jpg?s=612x612&w=0&k=20&c=DACpDBVkXYVwafxvixLdFERAbVJMF94SyZO9gJ0FcU4="
                          alt=""
                        />
                      </a>
                      <div className="p-5">
                        <dd className="mt-3">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {duration} min
                          </span>
                          <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                            {duration} rsvps
                          </span>
                        </dd>
                        <a href="#">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                          </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          <b>Subject:</b> {topic}
                        </p>
                        {location && address && (
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Location: {address} {location}
                          </p>
                        )}
                        {!location && !address && virtual && (
                          <p className="mb-3 font-normal text-green-700 dark:text-gray-400">
                            Virtual {virtual}
                          </p>
                        )}
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          When: {formattedDate} {timezone}
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {gender}
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {group}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              }
            )
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex-1 p-4">
  <h1 className="text-5xl font-semibold mb-6">All Events</h1>
  <div className="flex flex-wrap">
  {allEvents ? (
    allEvents.map(
      ({
        event_id,
        title,
        location,
        address,
        datetime,
        timezone,
        virtual,
        topic,
        duration,
        gender,
        group,
      }) => {
        const eventDate = new Date(datetime);
        const formattedDate = eventDate.toLocaleString();
        return (
          <Link
          key={event_id}
          to={`/events/${event_id}`}
          className="w-1/4 p-4"
          >
          <div
          key={event_id}
          className="event-details border rounded-md p-5 hover: bg-gray-100"
          >
          <h1>{title}</h1>
          <p>Subject: {topic}</p>
          {location && address && (
            <p>
            Location: {location}, Zipcode: {address}
            </p>
            )}
            {!location && !address && virtual && (
              <p>Virtual {virtual}</p>
              )}
              <p>When: {formattedDate}</p>
              <p>Timezone: {timezone}</p>
              <p>Duration: {duration} minutes</p>
              <p>{gender}</p>
              <p>{group}</p>
              </div>
              </Link>
              );
            }
            )
            ) : (
              <p>No events available.</p>
              )}
              </div>
              </div>
              </div> */
}

// <div className="-translate-x-5">
//   <Buttonlink to="/events/new_event_form">
//     Create New Event
//   </Buttonlink>
// </div>
