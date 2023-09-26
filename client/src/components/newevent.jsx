import { useState } from "react";
import { createEvent } from "../fetching.js";
import { useNavigate } from "react-router-dom";

export default function NewEventForm() {
  const [event_id, setEvent_id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState("");
  //   const [days_available, setDays_available] = useState("");
  //   const [times_available, setTimes_available] = useState("");
  const [virtual, setVirtual] = useState(false);
  const [comments, setComments] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [gender, setGender] = useState("");
  const [group, setGroup] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createEvent(
        event_id,
        title,
        description,
        location,
        datetime,
        // days_available,
        // times_available,
        virtual,
        comments,
        created_at,
        topic,
        duration,
        gender,
        group
      );
    //   window.location.reload();
      navigate("/events");
    } catch (error) {
      alert("There was an error creating a new event");
    }
  }

  return (
    <div>
      <section className="new_event_form">
        <h3>Add a new event!</h3>
        <form onSubmit={handleSubmit}>
          <input
            id="title"
            className="newEventForm_title"
            value={title}
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            id="descripton"
            className="newEventForm_description"
            value={description}
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            id="location"
            className="newEventForm_location"
            value={location}
            type="text"
            name="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            id="datetime"
            className="newEventForm_datetime"
            value={datetime}
            type="text"
            name="datetime"
            placeholder="Date Time"
            onChange={(e) => setDatetime(e.target.value)}
          />
          {/* <input
            id="days_available"
            className="newEventForm_days_available"
            value={days_available}
            type="text"
            name="days_available"
            placeholder="Days Available"
            onChange={(e) => setDays_available(e.target.value)}
          />
          <input
            id="times_available"
            className="newEventForm_times_available"
            value={times_available}
            type="text"
            name="times_available"
            placeholder="Times Available"
            onChange={(e) => setTimes_available(e.target.value)}
          /> */}
          <input
            id="created_at"
            className="newEventForm_created_at"
            value={created_at}
            type="text"
            name="created_at"
            placeholder="Created At"
            onChange={(e) => setCreated_at(e.target.value)}
          />
          <h5>Virtual?</h5>
          <input
            id="virtual"
            className="newEventForm_virtual"
            value={virtual}
            type="checkbox"
            name="virtual"
            placeholder="Virtual"
            onChange={(e) => setVirtual(e.target.checked)}
          />
          <input
            id="comments"
            className="newEventForm_comments"
            value={comments}
            type="text"
            name="comments"
            placeholder="Comments"
            onChange={(e) => setComments(e.target.value)}
          />
          <input
            id="topic"
            className="newEventForm_topic"
            value={topic}
            type="text"
            name="topic"
            placeholder="Topic"
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            id="duration"
            className="newEventForm_duration"
            value={duration}
            type="integer"
            name="duration"
            placeholder="Duration"
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            id="gender"
            className="newEventForm_gender"
            value={gender}
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />
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
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
