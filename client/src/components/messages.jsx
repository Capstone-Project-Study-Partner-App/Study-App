import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserMessages, getProfile } from "../fetching";
import MessageThread from "./Thread";

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  

  const handleMessageClick = (message) => {
    setSelectedMessage({
      ...message,
      receiver_first_name:
        currentUser.user_id === message.sender
          ? message.receiver_first_name
          : message.sender_first_name,
      receiver_photo:
        currentUser.user_id === message.sender
          ? message.receiver_photo
          : message.sender_photo,
      receiver_age:
        currentUser.user_id === message.sender
          ? message.receiver_age
          : message.sender_age,
    });
  };

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

  useEffect(() => {
    async function getAllMessages() {
      try {
        const response = await getUserMessages(currentUser.user_id);
        setMessages(response);
        console.log("All Messages:", response);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllMessages();
  }, [currentUser]);
  // if (messages.length === 0) {
  //   return <p>No messages found.</p>;
  // }


  // Display most recent message in each thread
  const threadMessages = {};

  for (const message of messages) {
    const threadId = message.thread_id;

    if (!threadMessages[threadId] || message.created_at > threadMessages[threadId].created_at) {
      threadMessages[threadId] = message;
    }
  }

  // Filter by user name
  const messagesToDisplay = searchParam
    ? Object.values(threadMessages).filter((message) => {
        const senderName = message.sender_first_name.toLowerCase();
        const receiverName = message.receiver_first_name.toLowerCase();

        return (
          (message.sender !== currentUser.user_id &&
            message.receiver === currentUser.user_id &&
            (senderName.includes(searchParam.toLowerCase()) ||
              receiverName.includes(searchParam.toLowerCase()))) ||
          (message.sender === currentUser.user_id &&
            message.receiver !== currentUser.user_id &&
            (senderName.includes(searchParam.toLowerCase()) ||
              receiverName.includes(searchParam.toLowerCase())))
        );
      })
    : Object.values(threadMessages);

  return (
    <div className="shadow-lg rounded-lg">
      {/* Header */}
      <div className="px-5 py-5 flex justify-between items-center bg-indigo-600 border-b-2">
        <div className="font-semibold text-2xl text-white">Messages:</div>
        <div className="h-12 p-2 rounded-full text-white font-semibold flex items-center justify-center">
          <img
            className="object-cover h-10 w-12"
            src="https://cdn-icons-png.flaticon.com/512/8080/8080565.png"
            alt=""
          />
        </div>
      </div>
      {/* Chatting */}
      <div className="flex flex-row justify-between bg-white">
        {/* Chat list */}
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto h-[550px]">
          {/* Search component */}
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
            />
          </div>
          {/* User list / messages.jsx */}
          <div className="flex flex-col px-2 overflow-y-auto">
            {error && <p>{error}</p>}
            {messagesToDisplay.map((message) => (
              <div
                key={message.message_id}
                className="w-full odd:bg-white even:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                onClick={() => handleMessageClick(message)}
              >
                <div className="w-1/4 flex items-center space-x-2 cursor-pointer py-5 px-4">
                  <img
                    src={
                      currentUser.user_id === message.sender
                        ? message.receiver_photo
                        : message.sender_photo
                    }
                    className="object-cover rounded-full w-40 max-w-[50px] h-40 max-h-[50px]"
                    alt=""
                  />
                </div>
                <div className="h-35 text-md font-semibold text-gray-500">
                  {currentUser.user_id === message.sender
                    ? message.receiver_first_name
                    : message.sender_first_name}
                  :
                </div>
                <span className="truncate ... text-sm text-gray-500">{message.message_content}</span>
              </div>
            ))}
          </div>
          {/* End user list */}
        </div>
        {/* End chat list */}
        {/* Message thread */}
        <div className="w-full px-5 flex flex-col justify-between">
          {selectedMessage &&
            <MessageThread
              selectedMessage={selectedMessage}
              currentUser={currentUser}
              className="absolute inset-x-0 bottom-0 h-16 ..."
            />}
        </div>
        {/* End message thread */}
        {/* Profile info */}
        <div className="w-2/5 border-l-2 px-5 flex flex-col justify-center items-center">
        {selectedMessage && (
  <div className="flex flex-col">
    <div className="font-semibold text-xl py-4 text-gray-500">
      {selectedMessage.receiver_first_name}
    </div>
    <Link to={`/users/${selectedMessage.receiver}`}>
    <img
      src={selectedMessage.receiver_photo}
      className="object-cover rounded-xl h-45"
      alt={`${selectedMessage.receiver_first_name}'s photo`}
    />
    </Link>
    <div className="font-semibold py-4 text-gray-500">
      Age: {selectedMessage.receiver_age}
    </div>
    <div className="font-light text-gray-500">
    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {selectedMessage.receiver_education_level}
                      </span>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}






