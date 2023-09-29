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
  
async function handleSubmit (e){
  e.preventDefault();

      let eventData={
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

      try{
        await createEvent(eventData);
        console.log(eventData)
        navigate ("/events");
      } catch (error){
        console.error ("There was a error creating an event!", error);
      }
    }


  
  return (
    <div>
      <section className="new_event_form">
        <h1>Add a new event!</h1>
        <form onSubmit={handleSubmit}>
          <h5>Title</h5>
          <input
            id="title"
            className="newEventForm_title"
            value={title}
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            />
          <h5>Description</h5>
          <input
            id="descripton"
            className="newEventForm_description"
            value={description}
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            />
          <h5>Location</h5>
          <input
            id="location"
            className="newEventForm_location"
            value={location}
            type="text"
            name="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            />
          <h5>Address</h5>
          <input
            id="address"
            className="newEventForm_address"
            value={address}
            type="text"
            name="address"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            />
          <h5>Date & Time</h5>
          <input
            id="datetime"
            className="newEventForm_datetime"
            value={datetime}
            type="datetime-local"
            name="datetime"
            placeholder="Date Time"
            onChange={(e) => setDatetime(e.target.value)}
            />
          <h5>Timezone</h5>
          <input
            id="timezone"
            className="newEventForm_timezone"
            value={timezone}
            type="text"
            name="timezone"
            placeholder="Timezone"
            onChange={(e) => setTimezone(e.target.value)}
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
          <h5>Topic</h5>
          <input
            id="topic"
            className="newEventForm_topic"
            value={topic}
            type="text"
            name="topic"
            placeholder="Topic"
            onChange={(e) => setTopic(e.target.value)}
            />
          <h5>Duration (mins)</h5>
          <input
            id="duration"
            className="newEventForm_duration"
            value={duration}
            type="integer"
            name="duration"
            placeholder="Duration"
            onChange={(e) => setDuration(e.target.value)}
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
