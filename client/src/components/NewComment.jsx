import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment} from "../fetching";

export default function NewComment({ user_id, event_id, newComment }) {
  const [comment_content, setCommentContent] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (!comment_content) {
      return;
    }
  
    try {
      const commentData = await createComment(user_id, event_id, comment_content);
      console.log("Comment sent:", commentData);
  
      // comments update without refreshing browser
      newComment(commentData)
  
      setCommentContent("");
      // const eventId = commentData.event_id;
      // navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("There was an error sending your comment!", error);
    }
  }

  return (
<div class="flex mx-auto items-center justify-center shadow-lg  max-w-lg ">
   <form onSubmit={handleSubmit} class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
      <div class="flex flex-wrap  mb-5">
         <h2 class="px-4 pt-3 pb-2 text-lg font-semibold text-gray-900">Add a new comment</h2>
         <div class="w-full md:w-full px-3 mb-2 mt-2">
            <input class="bg-gray-50 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 text-sm placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required value={comment_content}
          onChange={(e) => setCommentContent(e.target.value)}/>
         </div>
         <div class="w-full md:w-full flex items-start px-3">
            <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">              
            </div>
            <div class="-mr-1">
               <button type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment'>Post Comment </button>
            </div>
         </div>
   </div>
      </form>
   </div>

  );
}


