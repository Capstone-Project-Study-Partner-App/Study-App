import { useState, useEffect } from "react";
import { AuthError, getProfile } from "../fetching";
import { useNavigate } from "react-router-dom"; // Import Link
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
    <div className="flex">
      {user.email}
      {user.first_name}
      {user.last_name}
    </div>
  );
}
