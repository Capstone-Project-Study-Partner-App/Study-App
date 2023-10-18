// import { useNavigate,useLocation } from "react-router";
import { deleteRating } from "../fetching";
import { useNavigate } from "react-router";

export default function DeleteRating({ rating_id }) {
  const navigate = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await deleteRating(rating_id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        className="inline-flex justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleDelete}
      >
        Delete Rating
      </button>
    </div>
  );
}
