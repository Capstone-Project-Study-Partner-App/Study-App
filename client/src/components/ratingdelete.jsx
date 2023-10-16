// import { useNavigate,useLocation } from "react-router";
import { deleteRating } from "../fetching";

export default function DeleteRating({rating_id}){
    // const loc=useLocation();

    // const navigate=useNavigate();

    async function handleDelete(e){
        e.preventDefault();
        try{
            await deleteRating(rating_id);
        }catch (error){
            console.error(error);
        }
    }

return(
    <div>
        <button onClick={handleDelete}>
            Delete Rating
        </button>
    </div>
)

}