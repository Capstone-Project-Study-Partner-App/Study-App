import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMessage } from "../fetching";


export default function NewMessage({sender, receiver, thread_id, updateMessages,}) {
    const [message_content, setMessageContent] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            let data;

            if (thread_id) {

                data = await createMessage(sender, receiver, message_content, thread_id)

                if (updateMessages) {
                    updateMessages(data); // Pass new message data to updateMessages
                  }
            } else {
                data = await createMessage(sender, receiver, message_content,)
            }
                console.log("Message sent:", data);
                setMessageContent("");
                // navigate(`/:id/messages`);
                   
        } catch (error) {
            console.error('error:', error)
        }
    };

    return (
        <div className="py-5 border-t p-2">
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full bg-gray-300 py-5 px-3 rounded-xl "
                    type="text"
                    placeholder="Message..."
                    value={message_content}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
                <br />
                <div>
                 
                </div>
            </form>
            <div>

            </div>
        </div>
    );
}