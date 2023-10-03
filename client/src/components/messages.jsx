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
      : mostRecentMessages


  return (




<div className="container mx-auto shadow-lg rounded-lg">
        {/* <!-- headaer --> */}
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="font-semibold text-2xl  text-gray-500">Messages:</div>

      <div
        className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
      >
        RA
      </div>
    </div>
    {/* <!-- end header -->
    <!-- Chatting --> */}
    <div className="flex flex-row justify-between bg-white">
      {/* <!-- chat list --> */}
      <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto  h-[500px]">
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
          className="flex flex-col py-4 px-2 overflow-y-auto justify-center items-center border-b-2"
        >
            {error && <p>{error}</p>}

            {messages.map((message) => (
          <><div className="w-1/4" 
          key={message.message_id}
          onClick={() => handleMessageClick(message)}>
            <img
              src={message.sender_photo}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full"
          onClick={() => handleMessageClick(message)}>
            <div className="text-lg font-semibold text-gray-500">{message.sender_first_name}:</div>
            <span className="text-gray-500">{message.message_content}</span>
          </div>
          </>
          ))}
        </div>
      
        {/* <!-- end user list --> */}
      </div>
      {/* <!-- end chat list -->
      <!-- message thread--> */}
      <div className="w-full px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5">
          <div className="flex justify-end mb-4">
            <div
              className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
            >
              blah blah blah !
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div>
          <div className="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
              xoxo 
            </div>
          </div>
        </div>
{/* ---------new message compoent--------- */}
        <div className="py-5">
          <input
            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
          />
        </div>
      </div>
      {/* <!-- end message -->
    profile info */}
      <div className="w-2/5 border-l-2 px-5">
        <div className="flex flex-col">
          <div className="font-semibold text-xl py-4 text-gray-500">profile</div>
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