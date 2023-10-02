import { useState, useEffect } from "react";
import { AuthError, getProfile, logOutUser } from "../fetching";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { LOGIN_ROUTE } from "./login";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const { current_user } = await getProfile();
        setUser(current_user);
      } catch (err) {
        if (err instanceof AuthError) {
          navigate(LOGIN_ROUTE);
        } else {
          throw err;
        }
      }
    }
    fetchData();
  }, []);

  if (user === null) {
    // it's loading
    return <></>;
  }

  return (
    <div>
      <div className="flex">
        {user.email}
        {user.first_name}
        {user.last_name}
      </div>
      <div>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={async () => {
          await logOutUser();
          navigate(LOGIN_ROUTE);
        }}
      >
        Logout
      </button>
      </div>
    </div>
  );
}
