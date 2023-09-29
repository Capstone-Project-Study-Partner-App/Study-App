import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserMessages } from "../fetching";


export default function AllMessages() {
    const [messages, setMessages] = useState([]);
    const [searchParam, setSearchParam] = useState("");
    const [error, setError] = useState("");
  
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
      : mostRecentMessages;



  //   return (
  //     <div className="inbox-container">
  //       <div className="inbox">
  //         <h3>message inbox:</h3>
  //           {messagesToDisplay.map((message) => (
  //           <div key={message.message_id}>
  //             <h4>{message.receiver_first_name}</h4>
  //             <p>
  //               <Link to={`/thread/${message.thread_id}`}>
  //                 <img src={message.receiver_photo} id="user-profile-image" style={{width: '100px'}} />
  //               </Link>
  //             </p>
  //             <p>
  //               <b>{message.receiver_first_name}:</b> {message.message_content}
  //             </p>
  //             {/* <DeleteMessage message_id={message.message_id} /> */}
  //             <hr className="rounded" />
  //           </div>
  //         ))}
  //       </div>
  //       <label>
            
  //           <input
  //             type="text"
  //             placeholder="search by user"
  //             value={searchParam}
  //             onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
  //           />
  //         </label>
  //     </div>
  //   );
  // }


  return (


//     <main className="flex w-full h-full shadow-lg rounded-3xl">
//         <section className="flex flex-col w-2/12 bg-white rounded-l-3xl">
//             <div className="w-16 mx-auto mt-12 mb-20 p-4 bg-indigo-600 rounded-2xl text-white">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                         d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
//                 </svg>
//             </div>
//             <nav className="relative flex flex-col py-4 items-center">
//                 <a href="#" className="relative w-16 p-4 bg-purple-100 text-purple-900 rounded-2xl mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                             d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
//                     </svg>
//                     <span
//                         className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 p-2 flex justify-center items-center text-white rounded-full">3</span>
//                 </a>
//                 <a href="#" className="w-16 p-4 border text-gray-700 rounded-2xl mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                             d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                     </svg>
//                 </a>
//                 <a href="#" className="w-16 p-4 border text-gray-700 rounded-2xl mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                 </a>
//                 <a href="#" className="w-16 p-4 border text-gray-700 rounded-2xl mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                             d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
//                     </svg>
//                 </a>
//                 <a href="#" className="w-16 p-4 border text-gray-700 rounded-2xl mb-24">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                 </a>
//                 <a href="#" className="w-16 p-4 border text-gray-700 rounded-2xl">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                             d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                 </a>
//             </nav>
//         </section>
//         {/* message inbox */}
//         <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll">
//             <label className="px-3">
//                 <input className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
//                     placeholder="Search..."
//                     value={searchParam}
//                     onChange={(e) => setSearchParam(e.target.value.toLowerCase())} />
//             </label>

//             <ul className="mt-6">
//             {messagesToDisplay.map((message) => (
//             <><li className="py-5 border-b px-3 transition hover:bg-indigo-100" key={message.messaged_id}>
//                   <a href="#" className="flex justify-between items-center">
//                       <Link to={`/thread/${message.thread_id}`}>
//                           <h3 className="text-lg font-semibold">{message.receiver_first_name}</h3>
//                       </Link>
//                       <p className="text-md text-gray-400">23m ago</p>
//                   </a>
//                   <div className="text-md italic text-gray-400">{message.receiver_first_name}: {message.message_content}</div>
//               </li>
//     </>
//               ))}
//             </ul>
//         </section>
//         <section className="w-6/12 px-4 flex flex-col bg-white rounded-r-3xl">
//             <div className="flex justify-between items-center h-48 border-b-2 mb-8">
//                 <div className="flex space-x-4 items-center">
//                     <div className="h-12 w-12 rounded-full overflow-hidden">
//                         <img src="https://bit.ly/2KfKgdy" loading="lazy" className="h-full w-full object-cover" />
//                     </div>
//                     <div className="flex flex-col">
//                         <h3 className="font-semibold text-lg">Drusie</h3>
//                         <p className="text-light text-gray-400">Drusie</p>
//                     </div>
//                 </div>
//                 <div>
//                     <ul className="flex text-gray-400 space-x-4">
//                         <li className="w-6 h-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                     d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
//                             </svg>
//                         </li>
//                         <li className="w-6 h-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                     d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </li>

//                         <li className="w-6 h-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                     d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                             </svg>
//                         </li>
//                         <li className="w-6 h-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                         </li>
//                         <li className="w-6 h-6">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                     d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                             </svg>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//              {/* message thread */}
//             <section>
//                 <h1 className="font-bold text-2xl">We need UI/UX designer</h1>
//                 <article className="mt-8 text-gray-500 leading-7 tracking-wider">
//                 {messages.map((message) => (

// <div key={message.message_id}>
//   {console.log('chat with: ', message.sender_first_name)}
//   <p>
//     <Link to={`/users/${message.sender}`}>
//       <img src={message.sender_photo} id="chat-profile-pic" style={{ width: '100px' }} />
//     </Link>
//   </p>
//   <b>{message.sender_first_name}:</b> {message.message_content}

// </div>
// ))}
//                 </article>
//                 <ul className="flex space-x-4 mt-12">
//                     <li
//                         className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-indigo-600 hover:bg-blue-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                                 d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//                         </svg>
//                     </li>
//                     <li
//                         className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-blue-800 hover:bg-blue-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                                 d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
//                         </svg>
//                     </li>
//                     <li
//                         className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-pink-400 hover:bg-blue-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                                 d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
//                         </svg>
//                     </li>
//                     <li
//                         className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-yellow-500 hover:bg-blue-100">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
//                                 d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                 d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
//                         </svg>
//                     </li>
//                 </ul>
//             </section>
//             <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
//                 <textarea className="w-full bg-gray-50 p-2 rounded-xl" placeholder="Type your reply here..." rows="3"></textarea>
//                 <div className="flex items-center justify-between p-2">
//                     <button className="h-6 w-6 text-gray-400">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                 d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                         </svg>
//                     </button>
//                     <button className="bg-purple-600 text-white px-6 py-2 rounded-xl">Reply</button>
//                 </div>
//             </section>
//         </section>
//     </main>




<div className="container mx-auto shadow-lg rounded-lg">
        {/* <!-- headaer --> */}
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="font-semibold text-2xl  text-gray-500">Messages:</div>
      <div className="w-1/2">
        <input
          type="text"
          name=""
          id=""
          placeholder="search IRL"
          className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
        />
      </div>
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
      <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto  h-[400px]">
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
          <><div className="w-1/4" key={message.message_id}>
            <Link to={`/thread/${message.thread_id}`}>
            <img
              src={message.sender_photo}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
            </Link>
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold text-gray-500">{message.sender_first_name}:</div>
            <span className="text-gray-500">{message.message_content}</span>
          </div>
          </>
          ))}
        </div>
        {/* <div className="flex flex-row py-4 px-2 items-center border-b-2">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/otT2199XwI8/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Everest Trip 2021</div>
            <span className="text-gray-500">Hi Sam, Welcome</span>
          </div>
        </div>
        <div
          className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
        >
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">MERN Stack</div>
            <span className="text-gray-500">Lusi : Thanks Everyone</span>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2 items-center border-b-2">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Javascript Indonesia</div>
            <span className="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2 items-center border-b-2">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Javascript Indonesia</div>
            <span className="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>

        <div className="flex flex-row py-4 px-2 items-center border-b-2">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Javascript Indonesia</div>
            <span className="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div> */}
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