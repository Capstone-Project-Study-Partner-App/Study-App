import { useState,useEffect } from "react";
import { createRating } from "../fetching";
import * as React from "react";
import { useNavigate } from "react-router";
import { getProfile } from "../fetching";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

export default function RatingCreate({ userId }) {
  const [ratingAddShow, setRatingAddShow] = useState(false);
  const [rating_content, setRating_content] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  // const [posted_at, setPosted_at] = useState(getCurrentDateTime());
  // const [posted_at, setPosted_at] = useState("");
  const [rating_star, setRating_star] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  const navigate=useNavigate();




  // function getCurrentDateTime() {
  //   const now = new Date().toISOString().slice(0, 16);
  //   return now;
  // }

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


  async function handleSubmit(e) {
    e.preventDefault();
    let ratingData = {
      user_id: userId,
      creator_id:currentUser.user_id,
      rating_content: rating_content,
      posted_at: new Date().toISOString(),
      rating_star: rating_star,
    };
    try {
      await createRating(ratingData);
console.log(ratingData)
      navigate(0);
      // window.location.reload();
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
          {/* <input
            id="posted_at"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            value={posted_at}
            type="datetime-local"
            name="posted_at"
            placeholder="Review Posted"
            onChange={(e) => setPosted_at(e.target.value)}
            required
          /> */}
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="hover-feedback"
              value={rating_star}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setRating_star(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              required
            />
            {rating_star !== null && (
              <Box sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : rating_star]}
              </Box>
            )}
          </Box>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
