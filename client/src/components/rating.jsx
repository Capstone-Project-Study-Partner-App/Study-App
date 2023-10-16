import { useState, useEffect } from "react";
import { getRatingsForUser } from "../fetching";
import { useParams, Routes, Route, Link } from "react-router-dom";
import DeleteRating from "./ratingdelete";

export default function Rating() {
  const [ratings, setRatings] = useState(null);
  const { id } = useParams();

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate.replace(",", "");
  };


  
  useEffect(() => {
    async function fetchRating() {
      const singleUserRating = await getRatingsForUser(id);
      setRatings(singleUserRating);
    }
    fetchRating();
  }, [id]);
  if (ratings === null) {
    return null;
  }

  let avg = 0;

  if (ratings.length > 0) {
    const totalStars = ratings.reduce(
      (total, rating) => total + rating.rating_star,
      0
    );
    avg = totalStars / ratings.length;
  }

  return (
    <div>
      <h1>Average Rating: {avg.toFixed(2)}</h1>
      {ratings.map((rating, index) => (
        <div key={index}>
          <p>{rating.rating_content}</p>
          <p>Posted: {formatDateTime(rating.posted_at)}</p>
          <p>Rating Star: {parseInt(rating.rating_star)}</p>
          <button>
          <Link to={`/ratings/${rating.rating_id}`}>
            <h2>Edit Rating</h2>
            </Link>
      </button>

      <DeleteRating rating_id={rating.rating_id}/>
        </div>
      ))}

    </div>
  );
}
