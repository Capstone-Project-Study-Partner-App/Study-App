import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMessagesByThread } from "../fetching";
import NewMessage from "./NewMessage";



export default function MessageThread() {
  const { thread_id } = useParams();
  // console.log("thread_id extracted from URL:", thread_id);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState(null);



  useEffect(() => {
    async function getMessageThread() {
      try {
        // if (!thread_id) {
        
        //   return;
        // }
        const response = await getMessagesByThread(17);
        if (response) {
          setMessages(response);

          const lastMessage = response[response.length - 1];
          if (lastMessage) {
            setSender(lastMessage.sender);
            setReceiver(lastMessage.receiver);
          }

        } else {
          setError("Failed to fetch messages");
        }
      } catch (err) {
        console.error(err);
        setError("Error occurred fetching messages");
      } 
    }
    getMessageThread();
  }, []);


  if (messages.length === 0) {
    return <p>No messages found.</p>;
  }
  // console.log("thread_id:", thread_id);

  return (
    <div className="thread-container">
      <div className="thread">
        {error && <p>{error}</p>}

        <h3>message thread:</h3>

        {/* <Link to="/messages/new">Send a message</Link> */}

        {messages.map((message) => (

          <div key={message.message_id}>
            {console.log('chat with: ', message.sender_first_name)}
            <p>
              <Link to={`/users/${message.sender}`}>
                <img src={message.sender_photo} id="chat-profile-pic" style={{width: '100px'}} />
              </Link>
            </p>
            <b>{message.sender_first_name}:</b> {message.message_content}

          </div>
        ))}
<NewMessage
      
      sender={11} 
      thread_id={17} 
      receiver={receiver} 
/>
      </div>


      {/* <ReplyMessage 
      thread_id={thread_id} 
      sender={user_id} 
      receiver={receiver} 
      token={token} /> */}

    </div>
  );
}