import Buttonlink from "./neweventbutton";
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
      <div className="filter-section">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="space-y-2">
          <p className="text font-semibold mb-2">Subject</p>
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
            <span className="ml-2">Computer Science</span>
          </label>
          <p className="text font-semibold mb-2">Type of Study</p>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Group study</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Partner work</span>
          </label>
          <p className="text font-semibold mb-2">Gender</p>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Male</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" />
            <span className="ml-2">Female</span>
          </label>
        </div>
      </div>

      <div>
        <Buttonlink to="/events/new_event_form">Create New Event</Buttonlink>
      </div>

      {/* EVENTS SECTION*/}
      <div className="flex-1 p-4">
        <h1 className="text-5xl font-semibold mb-6">All Events</h1>
        <div className="flex flex-wrap">
          {allEvents ? (
            allEvents.map(
              ({
                event_id,
                title,
                description,
                location,
                datetime,
                virtual,
                created_at,
                topic,
                duration,
                gender,
                group,
              }) => (
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
                    <p>{description}</p>
                    <p>{location}</p>
                    <p>{datetime}</p>
                    <p>{virtual}</p>
                    <p>{created_at}</p>
                    <p>{topic}</p>
                    <p>{duration}</p>
                    <p>{gender}</p>
                    <p>{group}</p>
                  </div>
                </Link>
              )
            )
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
