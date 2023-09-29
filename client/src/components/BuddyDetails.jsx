import { useState, useEffect } from "react";
import { getUserById } from "../fetching";
import { useParams } from "react-router-dom";
export default function User() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchUser() {
      const singleUser = await getUserById(id);
      setUser(singleUser);
    }
    fetchUser();
  }, [id]);
  return (
    <div>
      <img src={user.photo} alt={`${user.first_name} ${user.last_name}`} />
      <h1>{user.first_name} {user.last_name}</h1>
      <p><b>Age:</b> {user.age}</p>
      <p><b>Location Zip Code:</b> {user.location}</p>
      <p><b>About me:</b> {user.about_me}</p>
      <p><b>Current Education level:</b> {user.education_level}</p>
      <p><b>Work Title:</b> {user.work}</p>
      <p><b>Institution:</b> {user.education}</p>
      <p><b>Classes Taken:</b> {user.classes}</p>
      <p><b>Days Available:</b> {user.days_available}</p>
      <p><b>Times Available:</b> {user.times_available}</p>
      <p><b>Interests:</b> {user.interests}</p>
      <p><b>Languages:</b> {user.languages}</p>
      <p><b>Current Study Mode:</b> {user.study_habits}</p>
      <p><b>Major:</b> {user.major}</p>
      <p><b>Gender:</b> {user.gender}</p>

    </div>
  );
}

