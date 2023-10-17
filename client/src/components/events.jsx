import { useState, useEffect } from "react";
import {
  AuthError,
  getEventsMatchingFilters,
  getRsvpsForEvent,
} from "../fetching";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "./login";
import { PlusIcon, UserIcon, ClockIcon } from "@heroicons/react/outline";

function MultiCheckboxSelect({ selectedOpts, setSelectedOpts, options }) {
  return (
    <>
      {options.map((option) => (
        <label key={option} className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600"
            checked={selectedOpts.includes(option)}
            onChange={(evt) =>
              setSelectedOpts([
                ...selectedOpts.filter((o) => o !== option),
                ...(evt.target.checked ? [option] : []),
              ])
            }
          />
          <span className="ml-2 select-none">{option}</span>
        </label>
      ))}
    </>
  );
}

function undefinedIfEmpty(arr) {
  if (arr.length === 0) {
    return undefined;
  }
  return arr;
}

function boolOrUndefined(true_value, arr) {
  if (arr.length !== 1) {
    return undefined;
  } else {
    return arr[0] === true_value;
  }
}

// Define a mapping of topic names to image URLs
const topicImageMapping = {
  "Science/Engineering/Psychology":
    "https://e0.pxfuel.com/wallpapers/135/1007/desktop-wallpaper-science-background-vectors-stock-psd-social-science.jpg",
  "Mathematics/Statistics":
    "https://t4.ftcdn.net/jpg/02/05/76/23/360_F_205762306_KCw2syVz457NVnZNQCgFdeWW0MRKqlt0.jpg",
  "Art/Music":
    "https://i.pinimg.com/736x/cb/2c/13/cb2c130454e570e4d6a2896928b9a1d0.jpg",
  "Social Studies/Humanities":
    "https://www.oksd.wednet.edu/cms/lib/WA01001356/Centricity/Domain/78/geography-555x370.jpg",
  Literature:
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl0ZXJhdHVyZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "Foreign Language":
    "https://media.istockphoto.com/id/493800479/photo/thank-you.webp?b=1&s=170667a&w=0&k=20&c=3NBo_wEnJ7AEZ2mDuyGKZqmZssmKNN7sUOYX7xKjdpo=",
  "Computer Science/Data Science":
    "https://t4.ftcdn.net/jpg/02/38/56/37/360_F_238563715_TT246ABsfPc7OMkIASI5wTOYiwwlf8Yz.jpg",
  "Business/Finance/Econ/Marketing":
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

export default function Events({ setLoggedIn }) {
  const [topicFilter, setTopicFilter] = useState([]);
  const [virtualFilter, setVirtualFilter] = useState([]);
  const [groupFilter, setGroupFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [daysFilter, setDaysFilter] = useState([]);
  const [timezoneFilter, setTimezoneFilter] = useState([]);
  // const [rsvpsForEvent, setRsvpsForEvent] = useState([]);

  const [allEvents, setAllEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const events = await getEventsMatchingFilters({
          filters: {
            topic: undefinedIfEmpty(topicFilter),
            virtual: boolOrUndefined("Online", virtualFilter),
            group: boolOrUndefined("Group Study", groupFilter),
            gender: undefinedIfEmpty(genderFilter),
            days: undefinedIfEmpty(daysFilter),
            timezone: undefinedIfEmpty(timezoneFilter),
          },
        });
        // Fetch RSVPs for each event
        const rsvpPromises = events.map(async (event) => {
          const rsvps = await getRsvpsForEvent(event.event_id);
          return { ...event, rsvps };
        });

        const eventsWithRsvps = await Promise.all(rsvpPromises);

        setAllEvents(eventsWithRsvps);
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
  }, [
    navigate,
    topicFilter,
    virtualFilter,
    groupFilter,
    genderFilter,
    daysFilter,
    timezoneFilter,
  ]);
  return (
    <div className="flex">
      {/* SIDEBAR SECTION */}

      <div className="filter-section w-1/4 bg-sky-100 text-indigo p-4">
        <div
          className="filter-scrollable"
          style={{ height: "calc(100vh - 64px)", overflowY: "auto" }}
        >
          <h1 className="text-xxl font-semibold mb-4">Filters</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-4">Topics</h2>
            <MultiCheckboxSelect
              selectedOpts={topicFilter}
              setSelectedOpts={setTopicFilter}
              options={[
                "Computer Science/Data Science",
                "Business/Finance/Econ/Marketing",
                "Art/Music",
                "Science/Engineering/Psychology",
                "Mathematics/Statistics",
                "Literature",
                "Foreign Language",
                "Social Studies/Humanities",
              ]}
            />

            <h2 className="text-xl font-semibold mb-4">Virtual</h2>
            <MultiCheckboxSelect
              selectedOpts={virtualFilter}
              setSelectedOpts={setVirtualFilter}
              options={["Online", "In Person"]}
            />
            <h2 className="text-xl font-semibold mb-4">Type of Study</h2>
            <MultiCheckboxSelect
              selectedOpts={groupFilter}
              setSelectedOpts={setGroupFilter}
              options={["Group Study", "Partner Work"]}
            />

            <h2 className="text-xl font-semibold mb-4">
              Preferred Gender of Meeting
            </h2>
            <MultiCheckboxSelect
              selectedOpts={genderFilter}
              setSelectedOpts={setGenderFilter}
              options={["Male", "Female", "Non Binary", "Other"]}
            />

            <h2 className="text-xl font-semibold mb-4">Days</h2>
            <MultiCheckboxSelect
              selectedOpts={daysFilter}
              setSelectedOpts={setDaysFilter}
              options={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
            />

            <h2 className="text-xl font-semibold mb-4">Timezone</h2>
            <MultiCheckboxSelect
              selectedOpts={timezoneFilter}
              setSelectedOpts={setTimezoneFilter}
              options={["EST", "CST", "MST", "PST", "AKST", "HST"]}
            />
            <br></br>
          </div>
        </div>
      </div>

      {/* EVENTS SECTION*/}
      <div className="flex-1 justify-center items-center p-10">
        <div className="border-b border-gray-200 pb-5">
          <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h1 className="ml-2 mt-2 font-semibold leading-6 text-indigo-500">
              All Events
            </h1>
            <Link
              to="/events/new_event_form"
              className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
            >
              <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Create New Event
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          {allEvents ? (
            allEvents.map((event) => {
              const eventDate = new Date(event.datetime);
              const formattedDate = eventDate.toLocaleString();
              const imageUrl = getImageUrl(event.topic);
              return (
                <Link
                  key={event.event_id}
                  to={`/events/${event.event_id}`}
                  className="w-1/ p-2"
                >
                  <div className="w-80 h-90 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img
                      className="rounded-t-l w-full h-48 object-cover"
                      src={imageUrl} // Use the dynamically selected image URL
                    />
                    <div className="p-5">
                      <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-2">
                          <ClockIcon
                            className="-ml-0.25 h-4 w-4"
                            aria-hidden="true"
                          />
                          {event.duration} min
                        </span>
                        <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                          <UserIcon
                            className="-ml-0.5 h-4 w-4"
                            aria-hidden="true"
                          />
                          {event.rsvps.length} rsvps
                        </span>
                      </dd>

                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {event.title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <b>Subject:</b> {event.topic}
                      </p>
                      {event.location && event.address && (
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          Location: {event.address} {event.location}
                        </p>
                      )}
                      {!event.location && !event.address && event.virtual && (
                        <p className="mb-3 font-normal text-green-700 dark:text-gray-400">
                          Virtual {event.virtual}
                        </p>
                      )}
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        When: {formattedDate} {event.timezone}
                      </p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {event.gender}
                      </p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {event.group}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
