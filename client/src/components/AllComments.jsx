import { useState, useEffect } from "react";
import { getCommentsByEventId } from "../fetching";



export default function EventComments({event_id}) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
 
  
    useEffect(() => {
      async function getAllComments() {
        try {
          const response = await getCommentsByEventId(event_id);
          setComments(response);
          
        } catch (error) {
          setError(error);
        }
      }
      getAllComments();
    }, [event_id]);

    return (
        // <div>
        //   {comments.map((comment) => ( 
        //     <div key={comment.comment_id}> 
        //       <img src={comment.user_photo} alt={`${comment.user_first_name}'s Profile`} id="user-profile-image" />
        //       <p>user:{comment.user_first_name}</p>
        //       <p>comment: {comment.comment_content}</p>
        //     </div>
        //   ))}
        // </div>
        <div class="antialiased mx-auto max-w-screen-sm">
  <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
          {comments.map((comment) => ( 

  <div class="space-y-4" key={comment.comment_id}>

    <div class="flex">
      <div class="flex-shrink-0 mr-3">
        <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={comment.user_photo} alt=""/>
      </div>
      <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{comment.user_first_name}</strong> <span class="text-xs text-gray-400">3:34 PM</span>
        <p class="text-sm">
        {comment.comment_content}
        </p>
      </div>
    </div>
            </div>
            ))}
          </div>
      )};
    
    
    