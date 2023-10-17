// import { useNavigate,useLocation } from "react-router";
import { deleteEvent } from "../fetching";
import { useNavigate } from "react-router-dom";

export default function DeleteEvent({event_id}){

    const navigate=useNavigate();

    async function handleDelete(e){
        e.preventDefault();
        try{
            await deleteEvent(event_id);
            window.location.href='/events';


        }catch (error){
            console.error(error);
        }
        // useNavigate('/events');
    }

return(
    <div>
        <button onClick={handleDelete}>
            Delete Event
        </button>
    </div>
)

}