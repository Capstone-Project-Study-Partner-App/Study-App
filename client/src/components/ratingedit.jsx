import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { updateRating, getRatingById } from "../fetching";
import { getProfile } from "../fetching";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

export default function EditRating() {
  const [rating, setRating] = useState({});
  const [error, setError] = useState(null);
  const [hover, setHover] = React.useState(-1);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const labels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Great",
    5: "Excellent",
  };
  function getLabelText(rating_star) {
    return `${rating_star} Star${rating_star !== 1 ? "s" : ""}, ${
      labels[rating_star]
    }`;
  }

  const { rating_id } = useParams();

  // function getCurrentDateTime() {
  //   const now = new Date().toISOString();
  //   // .slice(0, 16);
  //   return now;
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
    async function fetchRatingData() {
      try {
        const response = await getRatingById(rating_id);
        console.log("Fetched rating data:", response);
        setRating(response);
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    }
    fetchRatingData();
  }, [rating_id]);

  // useEffect(() => {
  //   setRating((prevRating) => ({
  //     ...prevRating,
  //     posted_at: getCurrentDateTime(),
  //   }));
  // }, []);

  async function handleEdit(e) {
    e.preventDefault();
    try {
      const updatedRatingData = {
        // user_id: rating.user_id,
        // creator_id:rating.creator_id,
        rating_content: rating.rating_content,
        // posted_at: rating.posted_at,
        rating_star: parseInt(rating.rating_star),
      };
      const response = await updateRating(rating.rating_id, updatedRatingData);
      console.log("rating updated", response);
      setRating(response);
      navigate(`/users/${rating.user_id}`);
    } catch (error) {
      console.error("oopsie rating updates a no-go", error);
      setError("failed to update rating");
    }
    // window.location.reload();
  }

  // console.log(updatedRatingData.creator_id)

  return (
    <div className="mx-auto pt-8 lg:max-w-7xl lg:px-8">
      
      <div>
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          
          <h2 className="text-3xl text-lg font-medium text-gray-900">
            Edit Buddy Rating
          </h2>
        </div>
        <form onSubmit={handleEdit}>
          {/* {error && <p>{error}</p>} */}

          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              id="rating_star"
              value={parseInt(rating.rating_star) || 0}
              getLabelText={getLabelText}
              precision={1}
              name="rating_star"
              placeholder="Rating Star"
              onChange={(event) =>
                setRating({ ...rating, rating_star: event.target.value })
              }
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              required
            />
            {rating.rating_star !== null && (
              <Box sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : rating.rating_star]}
              </Box>
            )}
          </Box>
          <div className="mt-5">
          <textarea
            id="rating_content"
            className="block w-full max-w-2xl rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
            value={rating.rating_content || ""}
            type="text"
            rows={3}
            name="rating_content"
            placeholder="Write your review"
            onChange={(e) =>
              setRating({ ...rating, rating_content: e.target.value })
            }
            required
          />
          {/* <input
            id="posted_at"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            value={rating.posted_at || getCurrentDateTime()}
            type="datetime-local"
            name="posted_at"
            placeholder="Review Posted"
            onChange={(e) =>
              setRating({ ...rating, posted_at: e.target.value })
            }
          /> */}
          </div>
          <div className="mt-5">
            
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
