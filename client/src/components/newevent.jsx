import { useState } from "react";
import { createEvent } from "../fetching.js";
import { useNavigate } from "react-router-dom";

export default function NewEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [datetime, setDatetime] = useState("");
  const [timezone, setTimezone] = useState("");
  const [virtual, setVirtual] = useState(false);
  const [comments, setComments] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [gender, setGender] = useState("");
  const [group, setGroup] = useState(false);

  const navigate = useNavigate();

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let eventData = {
      title: title,
      description: description,
      location: location,
      address: address,
      datetime: datetime,
      timezone: timezone,
      virtual: virtual,
      comments: comments,
      topic: topic,
      duration: duration,
      gender: gender,
      group: group,
    };

    try {
      await createEvent(eventData);
      console.log(eventData);
      navigate("/events");
    } catch (error) {
      console.error("There was a error creating an event!", error);
    }
  }

  return (
    <div>
      <section className="new_event_form">
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-4xl text-center">
          New Event
        </h2>
        <br />
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Event Information
          </h2>
          <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Title
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={title}
                    type="text"
                    name="title"
                    placeholder="  Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Subject
                </label>
                <input
                  id="topic"
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={topic}
                  type="text"
                  name="topic"
                  placeholder="Topic"
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Description
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="descripton"
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={description}
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Please describe the details for this event.
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Event Specifics
          </h2>
          <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="address"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={address}
                    type="text"
                    name="address"
                    placeholder="  Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Location
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      id="location"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={location}
                      type="text"
                      name="location"
                      placeholder="Location"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <fieldset>
                  <legend className="sr-only">By Email</legend>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                    <div
                      className="text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      Is this a virtual event?
                    </div>
                    <div className="mt-4 sm:col-span-2 sm:mt-0">
                      <div className="max-w-lg space-y-6">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="virtual"
                              className="newEventForm_virtual"
                              value={virtual}
                              type="checkbox"
                              name="virtual"
                              placeholder="Virtual"
                              onChange={(e) => setVirtual(e.target.checked)}
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="comments"
                              className="font-small text-gray-900"
                            >
                              Please check here if this is a virtual event
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Date & Time
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"></div>
                      <input
                        id="datetime"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={datetime}
                        type="datetime-local"
                        name="datetime"
                        placeholder="Date Time"
                        onChange={(e) => setDatetime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="timezone"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Time Zone
                    </label>
                    <select
                      id="timezone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={timezone}
                      type="text"
                      name="timezone"
                      placeholder="Time Zone"
                      onChange={handleTimezoneChange}
                      required
                    >
                      <option value="">Select Timezone</option>
                      <option value="Hawaii Time">Hawaii Time</option>
                      <option value="Alaska Time">Alaska Time</option>
                      <option value="Pacific Time">Pacific Time</option>
                      <option value="Mountain Time">Mountain Time</option>
                      <option value="Central Time">Central Time</option>
                      <option value="Eastern Time">Eastern Time</option>
                    </select>
                  </div>
                </div>
                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Duration (mins)
                    </label>
                    <input
                      id="duration"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={duration}
                      type="integer"
                      name="duration"
                      placeholder="Duration (mins)"
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h5>Group?</h5>
          <input
            id="group"
            className="newEventForm_group"
            value={group}
            type="checkbox"
            name="group"
            placeholder="Group"
            onChange={(e) => setGroup(e.target.checked)}
          />

          <h5>Gender</h5>
          <input
            id="gender"
            className="newEventForm_gender"
            value={gender}
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />

          <h5>Comments</h5>
          <input
            id="comments"
            className="newEventForm_comments"
            value={comments}
            type="text"
            name="comments"
            placeholder="Comments"
            onChange={(e) => setComments(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

// async function handleSubmit(e) {
//   e.preventDefault();
//   const APIData = await createEvent(
//     title,
//     description,
//     location,
//     address,
//     datetime,
//     timezone,
//     virtual,
//     comments,
//     topic,
//     duration,
//     gender,
//     group
//   );
//   if (APIData.success) {
//     console.log("New Event: ", APIData.data.newPost);
//     const newPostList = [...post, APIData.data.newPost];
//     setPost(newPostList);

//     setTitle("");
//     setDescription("");
//     setLocation("");
//     setAddress("");
//     setDatetime("");
//     setTimezone("");
//     setVirtual(false);
//     setComments("");
//     setTopic("");
//     setDuration("");
//     setGender("");
//     setGroup(false);

//     setError(null)

//     navigate("/events");
//   } else {
//     setError("There was an error creating a new event");
//   }
// }
