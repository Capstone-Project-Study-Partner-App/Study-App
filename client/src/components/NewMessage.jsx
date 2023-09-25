import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMessage } from "../../fetching";


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
            const response = await createMessage(
                message_content,
                sender,
                receiver,
                thread_id
                
        
            );
            setMessageContent(response);

            if (response && response.thread_id === null) {
                navigate(`/messages/thread/${response.new_thread_id}`);

            } else {
                window.location.reload();
            }
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