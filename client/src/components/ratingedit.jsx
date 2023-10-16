import { useState, useEffect } from "react";
import { useParams} from "react-router";
import { updateRating, getRatingById } from "../fetching";

export default function EditRating() {
  // const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState({});
  const [error,setError]=useState(null);

  const {rating_id} = useParams();


    function getCurrentDateTime() {
    const now = new Date().toISOString()
    // .slice(0, 16);
    return now;
  }
  

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

  useEffect(() => {
    setRating((prevRating) => ({
      ...prevRating,
      posted_at: getCurrentDateTime(),
    }));
  }, []);

  async function handleEdit(e) {
    e.preventDefault();
    try{
    const updatedRatingData = {
      user_id:rating.user_id,
      rating_content: rating.rating_content,
      posted_at: rating.posted_at,
      rating_star: parseInt(rating.rating_star),
    };
      const response = await updateRating(rating.rating_id, updatedRatingData);
      console.log("rating updated", response);
      setRating(response);
    } catch (error) {
      console.error("oopsie rating updates a no-go", error);
      setError("failed to update rating");
    }
    // window.location.reload();
  }

  return (
    <div>
        <div>
          <h2>Edit Rating</h2>
          <form onSubmit={handleEdit}>
            {/* {error && <p>{error}</p>} */}
            <textarea
              id="rating_content"
              className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            <input
              id="posted_at"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={rating.posted_at ||  getCurrentDateTime()}
              type="datetime-local"
              name="posted_at"
              placeholder="Review Posted"
              onChange={(e) =>
                setRating({ ...rating, posted_at: e.target.value })
              }
              read
            />
            <input
              id="rating_star"
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={rating.rating_star ||""}
              type="number"
              min="1"
              max="5"
              step="1"
              name="rating_star"
              placeholder="Rating Star"
              onChange={(e) =>
                setRating({ ...rating, rating_star: e.target.value })
              }
              required
            />
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
    
    </div>
  );
}

