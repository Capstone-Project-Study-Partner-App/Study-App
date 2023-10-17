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
        <button
          type="event_delete"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleDelete}>
            Delete Event
        </button>
    </div>
)

}