import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMessagesByThread } from "../fetching";
import NewMessage from "./NewMessage";



export default function MessageThread({selectedMessage}) {
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

  const updateMessages = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  if (messages.length === 0) {
    return <p>No messages found.</p>;
  }
  console.log("thread_id:", selectedMessage.thread_id);

  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="flex flex-col mt-5">
        {messages.map((message) => (
          <div
            key={message.message_id}
            className={`${
              message.sender === sender
                ? "justify-end"
                : "justify-start"
            } mb-4 flex`}
          >
            <img
              src={message.sender_photo}
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              className={`${
                message.sender === sender
                  ? "mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 text-white"
                  : "ml-2 rounded-br-3xl rounded-tr-3xl rounded-tl-xl bg-gray-400 text-white"
              } py-3 px-4`}
            >
              {message.message_content}
            </div>
          </div>
        ))}

<div className="py-5">
           <NewMessage
          sender={1}
          thread_id={selectedMessage.thread_id}
          receiver={receiver}
          updateMessages={updateMessages}
        />
      </div>
      </div>
    </div>
  );
}