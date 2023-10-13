import { useState } from "react";
import { createRating } from "../fetching";

export default function RatingCreate({userId}) {
  const [ratingAddShow, setRatingAddShow] = useState(false);
  const [rating_content, setRating_content] = useState("");
  const [posted_at, setPosted_at] = useState(getCurrentDateTime);
  const [rating_star, setRating_star] = useState("");

  function getCurrentDateTime() {
    const now = new Date().toISOString().slice(0, 16);
    return now;
  }
  

  async function handleSubmit(e) {
    e.preventDefault();
    let ratingData = {
      user_id: userId,
      rating_content: rating_content,
      posted_at: posted_at,
      rating_star: rating_star,
    };
    try {
      await createRating(ratingData);
      window.location.reload()
    } catch (error) {
      console.error("There was an error creating a new rating!", error);
    }
  }



  return (
    <div>
      <button onClick={() => setRatingAddShow(!ratingAddShow)}>
        Rate This Buddy!
      </button>
      {ratingAddShow ? (
        <form onSubmit={handleSubmit}>
          <textarea
            id="rating_content"
            className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={rating_content}
            type="text"
            rows={3}
            name="rating_content"
            placeholder="Write your review"
            onChange={(e) => setRating_content(e.target.value)}
            required
          />
          <input
            id="posted_at"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            value={posted_at}
            type="datetime-local"
            name="posted_at"
            placeholder="Review Posted"
            onChange={(e) => setPosted_at(e.target.value)}
            required
          />
          <input
            id="rating_star"
            className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            value={rating_star}
            type="number"
            min="0"
            max="5"
            step="1"
            name="rating_star"
            placeholder="Rating Star"
            onChange={(e) => setRating_star(e.target.value)}
            required
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : null}
    </div>
  );
}