import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../fetching";

export default function NewComment({ user_id, event_id }) {
  const [comment_content, setCommentContent] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!comment_content) {

      return;
    }

    try {

      const commentData = await createComment(user_id, event_id, comment_content);
      console.log("Comment sent:", commentData);
      setCommentContent("");

      const eventId = commentData.event_id;
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("There was an error sending your comment!", error);
    }
  }

  return (
    <div className="py-5">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="Type your comment here"
          value={comment_content}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}