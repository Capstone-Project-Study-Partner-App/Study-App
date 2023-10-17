import { useState, useEffect } from "react";
import { getRatingsForUser } from "../fetching";
import { useParams, Routes, Route, Link } from "react-router-dom";
import DeleteRating from "./ratingdelete";
import StarRating from "./ratingstar";

export default function Rating({userId, currentUser}) {
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

//   const fullStars=Math.floor(starAverage);
//   const starArr=[]
// for (leti=1;i<=fullStars;i++){
//   starArr.push(1);
// }
// if (starAverage<5){
//   const partialStar=starAverage-fullStars;
//   starArr.push(partialStar);  

// for (let i=1; i<=emptyStars;i++){
//   starArr.push(0);
// }
// }

  
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

  if (ratings&&ratings.length > 0) {
    const totalStars = ratings.reduce(
      (total, rating) => total + rating.rating_star,
      0
    );
    avg = totalStars / ratings.length;
  }

  

  return (
<div>
  <div>
    <h1>Average Rating</h1>
    {avg === 0 ? null : <StarRating averageRating={avg} />}
    <h1>{avg === 0 ? 'No Rating Available' : avg.toFixed(2)}</h1>
  </div>
  {ratings.map((rating, index) => (
    <div key={index}>
      <p>{rating.rating_content}</p>
      <p>Posted: {formatDateTime(rating.posted_at)}</p>
      <p>Rating Star: <StarRating averageRating={parseInt(rating.rating_star)} /></p>
      
      {/* {currentUser && currentUser.id === rating.creator_id && ( */}
        <div className="event_edit_button">
          <button>
            <Link to={`/ratings/${rating.rating_id}`}>
              <h2>Edit Rating</h2>
            </Link>
          </button>
          <DeleteRating rating_id={rating.rating_id} />
        </div>
      {/* )} */}
    </div>
  ))}
</div>
)
      }