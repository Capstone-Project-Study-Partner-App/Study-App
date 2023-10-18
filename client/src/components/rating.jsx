import { useState, useEffect } from "react";
import { getRatingsForUser } from "../fetching";
import { useParams, Routes, Route, Link } from "react-router-dom";
import { getProfile } from "../fetching";
import DeleteRating from "./ratingdelete";
import StarRating from "./ratingstar";

export default function Rating({ userId }) {
  const [ratings, setRatings] = useState(null);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  console.log("ratings", ratings);
  console.log("user", currentUser);

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
    async function fetchData() {
      try {
        const response = await getProfile();
        setCurrentUser(response);
      } catch (err) {
        if (err instanceof AuthError) {
          navigate(LOGIN_ROUTE);
        } else {
          throw err;
        }
      }
    }
    fetchData();
  }, []);

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

  if (ratings && ratings.length > 0) {
    const totalStars = ratings.reduce(
      (total, rating) => total + rating.rating_star,
      0
    );
    avg = totalStars / ratings.length;
  }

  return (
    <div className="bg-white pb">
      <div className="mx-auto pt-24 lg:max-w-7xl lg:px-8 ">
        <div className="average-rating">
          <h2 className="text-3xl font-medium text-gray-900">
            Average Rating {" "}
            {avg === 0 ? null : (
              <div className="stars-center">
                <StarRating averageRating={avg} />
              </div>
            )}
          </h2>
          <h1 className="text-3xl font-medium text-gray-900">
            {avg === 0 ? "No Rating Available" : avg.toFixed(2)}
          </h1>
        </div>
        <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3"
            >
              <div className="flex items-center xl:col-span-1">
                <div className="flex items-center ">
                  <p style={{ paddingTop: "20px" }}>
                    {" "}
                    <StarRating averageRating={parseInt(rating.rating_star)} />
                  </p>
                </div>
              </div>
              <p className="font-medium text-gray-900">
                {rating.rating_content}
              </p>
              <p className="font-medium text-gray-500 italic">
                Posted: {formatDateTime(rating.posted_at)}
              </p>

              {currentUser.user_id === rating.creator_id && (
                <div className="mt-6 flex items-center justify-center gap-x-6 text-white">
               
                  <button className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <Link
                      to={`/ratings/${rating.rating_id}`}
                      style={{ color: "white" }}
                    >
                      <h2>Edit Rating</h2>
                    </Link>
                  </button>
                  <div>
                    <DeleteRating rating_id={rating.rating_id} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
