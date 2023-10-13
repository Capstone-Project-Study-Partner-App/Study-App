import { useState, useEffect } from "react";
import { getRatingsForUser } from "../fetching";
import { useParams } from "react-router";
import EditRating from "./ratingedit";

export default function Rating() {
  const [ratings, setRatings] = useState(null);
  const { id } = useParams();

  const formatDateTime=(date)=>{
    const options={
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      hour12:true,
    };
    const formattedDate=new Date (date).toLocaleDateString(undefined, options)
    return formattedDate.replace (",","")
  }


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
  
  let avg=0

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
        <p>Posted: {formatDateTime(rating.posted_at)}</p>
        <p>Rating Star: {rating.rating_star}</p>
        <EditRating user_id={rating.user_id} rating_id={rating.id}/>
        <hr />
      </div>
    ))}
  </div>
  );
}
