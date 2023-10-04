import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserMessages } from "../fetching";
import MessageThread from "./Thread";



export default function AllMessages() {
    const [messages, setMessages] = useState([]);
    const [searchParam, setSearchParam] = useState("");
    const [error, setError] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null)
    
    const handleMessageClick = (message) => {
    
      setSelectedMessage(message);
    };
    useEffect(() => {
      async function getAllMessages() {
        try {
          const response = await getUserMessages(1);
          setMessages(response);
          
        } catch (error) {
          setError(error.message);
        }
      }
      getAllMessages();
    }, []);
    if (messages.length === 0) {
      return <p>No messages found.</p>;
    }
    //show only the most recent message of each thread
    const getMostRecentMessages = () => {
      const messageMap = new Map();
  
      for (const message of messages) {
        if (!messageMap.has(message.thread_id)) {
          messageMap.set(message.thread_id, message);
        } else {
          const existingMessage = messageMap.get(message.thread_id);
          if (message.created_at > existingMessage.created_at) {
            messageMap.set(message.thread_id, message);
          }
        }
      }
  
      return Array.from(messageMap.values());

    };
  
    const mostRecentMessages = getMostRecentMessages();
  
    // const messagesToDisplay = searchParam
    //   ? mostRecentMessages.filter((message) =>
    //       message.sender_first_name.toLowerCase().includes(searchParam)
    //     )
    //   : mostRecentMessages;

  return (

<div className="shadow-lg rounded-lg">
        {/* <!-- headaer --> */}
    <div className="px-5 py-5 flex justify-between items-center bg-indigo-600 border-b-2">
      <div className="font-semibold text-2xl  text-white">Messages:</div>

      <div
        className="h-12  p-2 rounded-full text-white font-semibold flex items-center justify-center"
      >
                            <img
                      className="object-cover h-10 w-12"
                      src="https://cdn-icons-png.flaticon.com/512/8080/8080565.png"
                      alt=""
                    />
      </div>
    </div>
    {/* <!-- end header -->
    <!-- Chatting --> */}
    <div className="flex flex-row justify-between bg-white">
      {/* <!-- chat list --> */}
      <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto  h-[550px]">
        {/* <!-- search compt --> */}
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </div>
        {/* <!-- end search compt -->
        <!-- user list / messages.jsx--> */}
        <div
          className="flex flex-col py-4 px-2 overflow-y-auto justify-center items-center border-b-2 h-full"
        >
            {error && <p>{error}</p>}
            
            {messages.map((message) => (
  <div
    key={message.message_id}
    className="w-full  odd:bg-white even:bg-slate-50 flex items-center space-x-2 cursor-pointer"
    onClick={() => handleMessageClick(message)}
  >
    <div className="w-1/4 flex items-center space-x-2 cursor-pointer">
      <img
        src={message.sender_photo}
        className="object-cover h-12 w-12 rounded-full"
        alt=""
      />
    </div>
    <div className="text-md font-semibold text-gray-500">
      {message.sender_first_name}:
    </div>
    <span className="truncate ... text-sm text-gray-500">{message.message_content}</span>
  </div>
))}

        </div>
        {/* <!-- end user list --> */}
      </div>
      {/* <!-- end chat list -->
      <!-- message thread--> */}
      <div className="w-full px-5 flex flex-col justify-between ">
      {selectedMessage && (
            <MessageThread 
            selectedMessage={selectedMessage}
             />
          )}
      </div>
      {/* <!-- end message -->
    profile info */}
      <div className="w-2/5 border-l-2 px-5">
        <div className="flex flex-col">
          <div className="font-semibold text-xl py-4 text-gray-500">user first name</div>
          <img
            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
            className="object-cover rounded-xl h-64"
            alt=""
          />
          <div className="font-semibold py-4 text-gray-500">user info</div>
          <div className="font-light text-gray-500">
            potentially more user info
          </div>
          </div>
        </div>
      </div>
    </div>

        );
          }