import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserMessages } from "../fetching";


export default function AllMessages() {
    const [messages, setMessages] = useState([]);
    const [searchParam, setSearchParam] = useState("");
  
    useEffect(() => {
      async function getAllMessages() {
        try {
          const response = await getUserMessages(11);
          setMessages(response);
          
        } catch (error) {
          setError(error.message);
        }
      }
      getAllMessages();
    }, []);
  
    //show only the most recent message of each thread
    const getMostRecentMessages = () => {
      const messageMap = new Map();
  
      for (const message of messages) {
        if (!messageMap.has(message.thread_id)) {
          messageMap.set(message.thread_id, message);
        } else {
          const existingMessage = messageMap.get(message.thread_id);
          if (message.date_sent > existingMessage.date_sent) {
            messageMap.set(message.thread_id, message);
          }
        }
      }
  
      return Array.from(messageMap.values());
    };
  
    const mostRecentMessages = getMostRecentMessages();
  
    const messagesToDisplay = searchParam
      ? mostRecentMessages.filter((message) =>
          message.receiver_first_name.toLowerCase().includes(searchParam)
        )
      : mostRecentMessages;



    return (
      <div className="inbox-container">
        <div className="inbox">
          <h3>message inbox:</h3>
            {messagesToDisplay.map((message) => (
            <div key={message.message_id}>
              <h4>{message.receiver_first_name}</h4>
              <p>
                <Link to={`/thread/${message.thread_id}`}>
                  <img src={message.receiver_photo} id="user-profile-image" style={{width: '100px'}} />
                </Link>
              </p>
              <p>
                <b>{message.receiver_first_name}:</b> {message.message_content}
              </p>
              {/* <DeleteMessage message_id={message.message_id} /> */}
              <hr className="rounded" />
            </div>
          ))}
        </div>
        <label>
            
            <input
              type="text"
              placeholder="search by user"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
            />
          </label>
      </div>
    );
  }