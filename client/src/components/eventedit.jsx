import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { updateEvent, getEventById } from "../fetching";

export default function EventEdit() {
  const [event, setEvent] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  function getCurrentDateTime() {
    const now = new Date().toISOString().slice(0, 16);
    return now;
  }

  useEffect(() => {
    async function fetchEventData() {
      try {
        const response = await getEventById(id);
        console.log("Fetched rating data:", response);
        setEvent(response);
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    }
    fetchEventData();
  }, [id]);

  useEffect(() => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      datetime: getCurrentDateTime(),
    }));
  }, []);

  async function handleEdit(e) {
    e.preventDefault();
    try {
      const updatedEventData = {
        title: event.title,
        description: event.description,
        location: event.location,
        address: event.address,
        datetime: event.datetime,
        timezone: event.timezone,
        virtual: event.virtual,
        meeting_link: event.meeting_link,
        comments: event.comments,
        topic: event.topic,
        duration: event.duration,
        gender: event.gender,
        group: event.group,
        host_id:event.host_id,
      };
      const response = await updateEvent(event.event_id, updatedEventData);
      console.log("rating updated", response);
      setEvent(response);
      navigate(-1);
    } catch (error) {
      console.error("oopsie rating updates a no-go", error);
      setError("failed to update rating");
    }
    // window.location.reload();
  }

  return (
    <div>
      <section className="edit_event_form">
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-4xl text-center">
          Update Event
        </h2>
        <br />
        <form onSubmit={handleEdit} className="space-y-6 sm:space-y-8">
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
                    className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={event.title || ""}
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={(e) =>
                      setEvent({ ...event, title: e.target.value })
                    }
                    required
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
                <select
                  id="topic"
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={event.topic || ""}
                  type="text"
                  name="topic"
                  placeholder="Subject"
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      topic: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Art">Art</option>
                  <option value="Business">Business</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Foreign Language">Foreign Language</option>
                  <option value="Literature">Literature</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                </select>
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
                  value={event.description || ""}
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={(e) =>
                    setEvent({ ...event, description: e.target.value })
                  }
                  required
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
              <input
                id="address"
                className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={event.address || ""}
                type="text"
                name="address"
                placeholder="Address"
                onChange={(e) =>
                  setEvent({
                    ...event,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  ZIP Code
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    id="location"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={event.location || ""}
                    type="text"
                    name="location"
                    placeholder="ZIP Code"
                    onChange={(e) =>
                      setEvent({
                        ...event,
                        location: e.target.value,
                      })
                    }
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Please input your event's 5-digit ZIP Code.
                  </p>
                </div>
              </div>

              <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                  <div
                    className="text-sm font-medium leading-6 text-gray-900"
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
                            className="h-4 w-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-600"
                            value={event.virtual}
                            type="checkbox"
                            name="virtual"
                            placeholder="Virtual"
                            onChange={(e) =>
                              setEvent({
                                ...event,
                                virtual: e.target.checked,
                              })
                            }
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="virtual_comment"
                            className="font-small text-gray-900"
                          >
                            Please check here if this is a virtual event
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {event.virtual && (
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Meeting Link
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <input
                        id="meeting_link"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={event.meeting_link || ""}
                        type="text"
                        name="meeting_link"
                        placeholder="Meeting Link"
                        onChange={(e) =>
                          setEvent({ ...event, meeting_link: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="datetime"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Date & Time
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"></div>
                      <input
                        id="datetime"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={event.datetime || ""}
                        type="datetime-local"
                        name="datetime"
                        placeholder="Date Time"
                        onChange={(e) =>
                          setEvent({ ...event, datetime: e.target.value })
                        }
                        required
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
                      value={event.timezone || ""}
                      type="text"
                      name="timezone"
                      placeholder="Time Zone"
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          timezone: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Time Zone</option>
                      <option value="HST">HST</option>
                      <option value="AKST">AKST</option>
                      <option value="PST">PST</option>
                      <option value="MST">MST</option>
                      <option value="CST">CST</option>
                      <option value="EST">EST</option>
                    </select>
                  </div>
                </div>
                <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="duration(mins)"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Duration (Mins)
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <input
                        id="duration"
                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={event.duration || ""}
                        type="number"
                        min="0"
                        step="5"
                        name="duration"
                        placeholder="Duration (Mins)"
                        onChange={(e) =>
                          setEvent({
                            ...event,
                            duration: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Event Preferences
          </h2>

          <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
              <div
                className="text-sm font-medium leading-6 text-gray-900"
                aria-hidden="true"
              >
                Is this a group event?
              </div>
              <div className="mt-4 sm:col-span-2 sm:mt-0">
                <div className="max-w-lg space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="group"
                        className="h-4 w-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-600"
                        value={event.group}
                        type="checkbox"
                        name="group"
                        placeholder="Group"
                        onChange={(e) =>
                          setEvent({
                            ...event,
                            group: e.target.checked,
                          })
                        }
                      />
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="group_comment"
                          className="font-small pl-3 text-gray-900"
                        >
                          Please check here if this is a group event
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Preferred Gender
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    id="gender"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={event.gender || ""}
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    onChange={(e) =>
                      setEvent({
                        ...event,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Preferred Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Comments
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="comments"
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={event.comments || ""}
                  type="text"
                  name="comments"
                  placeholder="Comments"
                  onChange={(e) =>
                    setEvent({
                      ...event,
                      comments: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="edit_event_submit">
        
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
