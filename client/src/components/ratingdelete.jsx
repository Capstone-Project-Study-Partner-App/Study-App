// import { useNavigate,useLocation } from "react-router";
import { deleteRating } from "../fetching";
import { useNavigate } from "react-router";

export default function DeleteRating({rating_id}){

    const navigate=useNavigate();

    async function handleDelete(e){
        e.preventDefault();
        try{
            await deleteRating(rating_id);
            window.location.reload();

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