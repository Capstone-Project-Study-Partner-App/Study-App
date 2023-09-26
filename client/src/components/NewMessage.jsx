import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMessage } from "../fetching";


export default function NewMessage({sender, receiver, thread_id}) {
    // const [sender_id, setSenderId] = useState(null);
    // const [receiver_id, setReceiverId] = useState(null);
    // const [thread_id, setThreadId] = useState("");
    // const { thread_id } = useParams();
    const [message_content, setMessageContent] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            let data;

            if (thread_id) {

                data = await createMessage(message_content, sender, receiver, thread_id)
                window.location.reload();
            } else {
                data = await createMessage(message_content, sender, receiver)
            }
                console.log("message sent:", data);
                const newThreadId = data.thread_id;
                navigate(`/messages/thread/${newThreadId}`);
                   
        } catch (error) {
            console.error('error:', error)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message_content}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
                <br />
                <div>
                    <button type="submit">send</button>
                </div>
            </form>
            <div>

            </div>
        </div>
    );
}