import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getMessagesByThread, markMessageAsRead } from "../fetching";
import NewMessage from "./NewMessage";

export default function MessageThread({ selectedMessage, currentUser }) {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    async function getMessageThread() {
      try {
        if (selectedMessage) {
          const response = await getMessagesByThread(selectedMessage.thread_id);
          if (response) {
            setMessages(response);
            console.log("Thread messages:", response);
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
            }
            // Mark messages as read
            response.forEach(async (message) => {
              if (
                message.receiver === currentUser.user_id &&
                !message.is_read
              ) {
                await markMessageAsRead(
                  currentUser.user_id,
                  message.message_id
                );
              }
              // Update the unread status in the local state of this component
              setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                  msg.message_id === message.message_id
                    ? { ...msg, is_read: true }
                    : msg
                )
              );
            });
          } else {
            setError("Failed to fetch messages");
          }
        }
      } catch (err) {
        if (err instanceof AuthError) {
          navigate(LOGIN_ROUTE);
        } else {
          throw err;
        }
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

  //make other user the receiver
  const selectedUser =
    messages[0].sender === currentUser.user_id
      ? messages[0].receiver
      : messages[0].sender;

  return (
    <div className="w-full px-5 flex flex-col justify-between h-full">
      <div
        className="flex flex-col flex-grow mt-5"
        ref={chatContainerRef}
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {messages.map((message) => (
          <div
            key={message.message_id}
            className={`${
              message.sender === currentUser.user_id
                ? "flex-row-reverse"
                : "flex-row"
            } mb-4 flex`}
          >
            <img
              src={message.sender_photo}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
            <div
              className={`${
                message.sender === currentUser.user_id
                  ? "mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 text-white"
                  : "ml-2 rounded-br-3xl rounded-tr-3xl rounded-tl-xl bg-gray-400 text-white"
              } py-3 px-3`}
            >
              {message.message_content}
            </div>
          </div>
        ))}
      </div>
      <div className="inset-x-0 bottom-0 ">
        <NewMessage
          sender={currentUser.user_id}
          thread_id={selectedMessage.thread_id}
          receiver={selectedUser}
          updateMessages={updateMessages}
        />
      </div>
    </div>
  );
}
