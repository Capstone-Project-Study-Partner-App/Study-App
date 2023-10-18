import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCheckIn, getCheckInByUserId } from "../fetching";

export default function CheckIn({ user_id }) {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [submittedEmotion, setSubmittedEmotion] = useState("");
  const submit_date = new Date();
  const navigate = useNavigate();

  // display last check in
  useEffect(() => {
    async function fetchLastCheckIn() {
      try {
        const lastCheckIn = await getCheckInByUserId(user_id);
        if (lastCheckIn) {
          setSubmittedEmotion(lastCheckIn.response);
        }
      } catch (error) {
        console.error("Error fetching last check-in data", error);
      }
    }
    fetchLastCheckIn();
  }, [user_id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const checkInData = await createCheckIn(user_id, selectedEmotion, submit_date);
      setSelectedEmotion(""); // Clear the selected emotion
      setSubmittedEmotion(selectedEmotion); // Update submitted emotion
    } catch (error) {
      console.error("There was an error submitting your check-in!", error);
    }
  }

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const getEmotionStyle = (emotion) => {
    if (selectedEmotion === emotion) {
      return "bg-orange-200"; // Selected option
    } else if (submittedEmotion === emotion) {
      return "bg-purple-200"; // Submitted option
    }
    return "";
  };
  

  return (
    <div className="flex mx-auto items-center justify-center max-w-lg">
      <form onSubmit={handleSubmit}>
        <ul className="grid grid-cols-2 gap-4 items-stretch mb-2">
          {/* Emotion 1 */}
          <li
          className={`border ${getEmotionStyle("Amazing")} border-purple-400 bg-orange-100 hover:bg-orange-200 rounded-lg flex items-center space-x-4`}
          onClick={() => handleEmotionSelect("Amazing")}
        >
                                  <label htmlFor="vue-checkbox" className="w-full text-xs font-medium text-gray-900">
                        <img
                          src="https://i.ibb.co/qnhwVB4/1-removebg-preview.png"
                          alt=" option 1"
                          className="w-24 h-24 rounded-full"
                        />
                      </label>
          </li>

          {/* Emotion 2 */}
          <li
          className={`border ${getEmotionStyle("Good")} bg-orange-100 hover:bg-orange-200  border-purple-400 rounded-lg flex items-center space-x-4`}
          onClick={() => handleEmotionSelect("Good")}
        >
                                  <label htmlFor="vue-checkbox" className="w-full text-xs font-medium text-gray-900">
                        <img
                          src="https://i.ibb.co/GVBc2fT/2-removebg-preview.png"
                          alt=" option 1"
                          className="w-24 h-24 rounded-full"
                        />
                      </label>
          </li>
                  {/* Emotion 3 */}
                  <li
          className={`border ${getEmotionStyle("Confused")} bg-orange-100 hover:bg-orange-200  border-purple-400 rounded-lg flex items-center space-x-4`}
          onClick={() => handleEmotionSelect("Confused")}
        >
                                  <label htmlFor="vue-checkbox" className="w-full text-xs font-medium text-gray-900">
                        <img
                          src="https://i.ibb.co/BTSBbJ2/3-removebg-preview.png"
                          alt=" option 1"
                          className="w-24 h-24 rounded-full"
                        />
                      </label>
          </li>
                            {/* Emotion 4 */}
                            <li
          className={`border ${getEmotionStyle("Frustrated")} bg-orange-100 hover:bg-orange-200  border-purple-400 rounded-lg flex items-center space-x-4`}
          onClick={() => handleEmotionSelect("Frustrated")}
        >
                                  <label htmlFor="vue-checkbox" className="w-full text-xs font-medium text-gray-900">
                        <img
                          src="https://i.ibb.co/3WPb1yg/4-removebg-preview-removebg-preview.png"
                          alt=" option 1"
                          className="w-24 h-24 rounded-full"
                        />
                      </label>
          </li>
        </ul>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex justify-center items-center bg-purple-400  hover:bg-purple-300 hover-bg-teal-400 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
          >
            Submit{" "}
            <img
              src="https://i.ibb.co/vVyRfG6/pngtree-pencil-icon-vector-png-educational-icons-with-trendy-and-modern-colors-png-image-5062809-rem.png"
              className="w-8 h-8"
            />
          </button>
        </div>
      </form>
    </div>
  );
}





