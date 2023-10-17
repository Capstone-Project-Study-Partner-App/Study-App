import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommentsByEventId, getProfile, AuthError } from "../fetching";
import NewComment from "./NewComment";


export default function EventComments({event_id}) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
 
  
    useEffect(() => {
      async function getAllComments() {
        try {
          const response = await getCommentsByEventId(event_id);
          setComments(response);
          console.log('Event comments:', response)
          
        } catch (error) {
          setError(error);
        }
      }
      getAllComments();
    }, [event_id]);
  //Get current user 
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await getProfile();
        setCurrentUser(response);
        console.log("Current User:", response);
      } catch (err) {
        if (err instanceof AuthError) {
          navigate(LOGIN_ROUTE);
        } else {
          throw err;
        }
      }
    }
    getCurrentUser();
  }, []);

  const handleNewComment = (commentData) => {
    setComments([...comments, commentData]);
  };

    return (

        <div class="antialiased mx-auto max-w-screen-sm shadow-lg px-10 mb-10">
  <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
          {comments.map((comment) => ( 

  <div class="space-y-4 " key={comment.comment_id}>

    <div class="flex mb-6">
      <div class="flex-shrink-0 mr-3">
      <Link to={`/users/${comment.user_id}`}>
        <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={comment.user_photo} />
        </Link>
      </div>
      <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed ">
        <Link to={`/users/${comment.user_id}`}>
        <strong>{comment.user_first_name}</strong> </Link>
        <span class="text-xs text-gray-400">
          {new Date(comment.created_at).toLocaleString()}{" "}
          </span>
        <p class="text-sm">
        {comment.comment_content}
        </p>
      </div>
    </div>
            </div>
            ))}
                {currentUser ? (
    <NewComment 
    user_id={currentUser.user_id} 
    event_id={event_id} 
    newComment={handleNewComment}
    />
    ) : (
      <p>Please log in to leave a comment.</p>
      )}
          </div>
      )};
    
    
    