import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getExistingThread, getProfile, AuthError, createMessage } from "../fetching";
import NewMessage from "./NewMessage";



export default function PopUpThread({ sender, receiver, currentUser, selectedUser, closeChat}) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const { thread_id } = useParams();
  const chatContainerRef = useRef(null);
  const [message_content, setMessageContent] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);


  useEffect(() => {
    async function getChatThread() {
      try {
        if (sender && receiver) {
          const response = await getExistingThread(sender, receiver);
          
          if (response) {
            setMessages(response);
            console.log('Chat messages:', response)
            console.log('sender:', sender);
          console.log('receiver:', receiver);
          console.log('currentUser:', currentUser);
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          } else {
            setError('Failed to fetch messages');
          }
        }
      } catch (err) {
        console.error(err);
        setError('Error occurred fetching messages');
      }
    }
    getChatThread();
  }, [sender, receiver]);

  const updateMessages = (newMessage) => {
    // Update the state with the new message
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Scroll to the bottom of the chat container to show the new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      let data;

      if (thread_id) {

        data = await createMessage(sender, receiver, message_content, thread_id)


      } else {
        data = await createMessage(sender, receiver, message_content,)
      }
      console.log("Chat sent:", data);
      updateMessages(data);
      setMessageContent("");

    } catch (error) {
      console.error('error:', error)
    }
  };



  const handleClosePopUp = () => {
    setIsChatOpen(false);
    if (closeChat) {
      closeChat(); // Call the closeChat function from props
    }
  };


  // console.log("thread_id:", selectedMessage.thread_id);

  return isChatOpen ? (
    
<div class="w-80 h-96 flex flex-col border shadow-md bg-white">
  <div class="flex items-center justify-between border-b p-2">
    
    {/* <!-- user info --> */}
    <div class="flex items-center">
      <img class="rounded-full w-10 h-10"
        src={selectedUser.photo} />
      <div class="pl-2">
        <div class="font-semibold">
          <a class="hover:underline" href={`/users/${selectedUser.user_id}`}>{selectedUser.first_name}</a>
        </div>
       
      </div>
    </div>
    {/* <!-- end user info -->
    <!-- chat box action --> */}
    <div>
    

      <button
      onClick={handleClosePopUp}
       class="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  
    {/* <!-- end chat box action --> */}
  </div>
      {/* <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="flex items-center mb-4">
          {messages.map((message) => (
            <div
              key={message.message_id}
              className={`${message.sender === currentUser.user_id
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
                className={`${message.sender === currentUser.user_id
                    ? "mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 text-white"
                    : "ml-2 rounded-br-3xl rounded-tr-3xl rounded-tl-xl bg-gray-400 text-white"
                  } py-3 px-3`}
              >
                {message.message_content}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* <!-- chat box --> */}


      <div className="flex-1 px-4 py-4 overflow-y-auto" ref={chatContainerRef} style={{ maxHeight: '265px',  overflowY: 'auto' }}>
        {/* <!-- chat message --> */}

        <div className="flex items-center mb-4 ">
          <div className="flex-none flex flex-col items-center space-y-1 mr-4 ">
            {messages.map((message) => (
              <div
                key={message.message_id}
                className={`${message.sender === currentUser.user_id
                    ? "flex-row-reverse ml-6 "
                    : "flex-row"
                  } mb-4 flex`}
              >
                <img
                  src={message.sender_photo}
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
                <div
                  className={`${message.sender === currentUser.user_id
                      ? "mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 text-white text-sm"
                      : "ml-2 rounded-br-3xl rounded-tr-3xl rounded-tl-xl bg-gray-400 text-white text-sm"
                    } py-3 px-3 w-44`}
                >
                  {message.message_content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <!-- end chat message --> */}



        <div className="flex items-center border-t p-2  bg-white " style={{ position: "absolute", bottom: "0" }}>
          {/* <!-- chat input action --> */}
          <div>
            <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          {/* <!-- end chat input action --> */}

          <div className="w-full mx-2">
            <form onSubmit={handleSubmit}>
              <input className="w-full rounded-full border border-gray-200" type="text" value={message_content} onChange={(e) => setMessageContent(e.target.value)} placeholder="Aa" autofocus />

            </form>
          </div>

          {/* <!-- chat send action --> */}

          <div>
            <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {/* <!-- end chat send action --> */}
        </div>
      </div>
    </div>
    
                          
                        
    ) : null;
}