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
    <div>
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
    </div>
  );
}
