import { useState, useEffect } from "react";
import { getCommentsByEventId } from "../fetching";




export default function EventComments({event_id}) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
 
    

    useEffect(() => {
      async function getAllComments() {
        try {
          const response = await getCommentsByEventId(1);
          setComments(response);
          
        } catch (error) {
          setError(error);
        }
      }
      getAllComments();
    }, []);

    return (
        <div>
          {comments.map((comment) => ( 
            <div key={comment.comment_id}> 
              <img src={comment.user_photo} alt={`${comment.user_first_name}'s Profile`} id="user-profile-image" />
              <p>user:{comment.user_first_name}</p>
              <p>comment: {comment.comment_content}</p>
            </div>
          ))}
        </div>
      )};
    
    
    