import { useState, useEffect } from "react";
import { getRatingsForUser } from "../fetching";
import { useParams } from "react-router";

export default function Rating() {
  const [ratings, setRatings] = useState(null);
  const { id } = useParams();

  let avg=0
    

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
  
  if (ratings.length>0){
    const totalStars=ratings.reduce((total,rating)=>total+rating.rating_star,0);
    avg=totalStars/ratings.length;
  }

  return (
    <div>
    <h1>Average Rating: {avg.toFixed(2)}</h1>
    {ratings.map((rating) => (
      <div key={rating.id}>
        <p>{rating.rating_content}</p>
        <p>Posted: {rating.posted_at}</p>
        <p>Rating Star: {rating.rating_star}</p>
        <hr />
      </div>
    ))}
  </div>
  );
}
