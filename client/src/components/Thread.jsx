import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMessagesByThread } from "../fetching";
import NewMessage from "./NewMessage";



export default function MessageThread({selectedMessage, loggedInUserId}) {
  const { id } = useParams();
  // console.log("thread_id extracted from URL:", thread_id);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState(null);



  useEffect(() => {
    async function getMessageThread() {
      try {
        if (selectedMessage) {
        const response = await getMessagesByThread(selectedMessage.thread_id);
        if (response) {
          setMessages(response);
        }

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
  }, [selectedMessage]);


  if (messages.length === 0) {
    return <p>No messages found.</p>;
  }
  // console.log("thread_id:", id);

  return (
    // <div className="thread-container">
    //   <div className="thread">
    //     {error && <p>{error}</p>}

    //     <h3>message thread:</h3>

    //     {/* <Link to="/messages/new">Send a message</Link> */}

    //     {messages.map((message) => (

    //       <div key={message.message_id}>
    //         {console.log('chat with: ', message.sender_first_name)}
    //         <p>
    //           <Link to={`/users/${message.sender}`}>
    //             <img src={message.sender_photo} id="chat-profile-pic" style={{ width: '100px' }} />
    //           </Link>
    //         </p>
    //         <b>{message.sender_first_name}:</b> {message.message_content}

    //       </div>
    //     ))}
    //     <NewMessage
    //       sender={11}
    //       thread_id={id}
    //       receiver={receiver}
    //     />
    //   </div>

    // </div>
    <div className="w-full px-5 flex flex-col justify-between ">
    <div className="flex flex-col mt-5">
      {messages.map((message) => (
        <div
          key={message.message_id}
          className={`${
            message.sender === loggedInUserId
              ? "flex-row-reverse"
              : "flex-row"
          } mb-4 flex`}
        >
          <img
            src={message.sender_photo}
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div
            className={`${
              message.sender === loggedInUserId
                ? "ml-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-gray-400 text-white"
                : "mr-2 rounded-br-3xl rounded-tr-3xl rounded-tl-xl bg-blue-400 text-white"
            } py-3 px-4`}
          >
            {message.message_content}
          </div>
        </div>
      ))}

      <div className="py-5">
           <NewMessage
          sender={loggedInUserId}
          thread_id={selectedMessage.thread_id}
          receiver={receiver}
        />
      </div>
    </div>
  </div>
  
  );
}