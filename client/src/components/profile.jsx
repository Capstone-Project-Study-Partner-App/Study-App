import { useState, useEffect } from "react";
import { getProfile, updateUser } from "../fetching";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile({ user_id }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { current_user } = await getProfile();
        console.log("Fetched user data:", current_user);
        setUser((prevUser) => ({ ...prevUser, ...current_user }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedUserData = {
        photo: user.photo,
        about_me: user.about_me,
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        age: user.age,
        location: user.location,
        days_available: user.days_available,
        times_available: user.times_available,
        timezone: user.timezone,
        education: user.education,
        education_level: user.education_level,
        major: user.major,
        classes: user.classes,
        study_habits: user.study_habits,
        interests: user.interests,
        languages: user.languages,
        work: user.work,
      };
      const response = await updateUser(user_id, updatedUserData);
      console.log("prof updated", response);
      window.location.reload();
    } catch (error) {
      console.error("oopsie prof updates a no-go", error);
      setError("failed to update profile");
    }
  }

  return (
    <div className="container">
      <div className="update-card">
        {user && (
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <img
              src={user.photo}
              alt={`${user.first_name}'s Profile`}
              id="user-profile-image"
            />
            <p className="card__name">
              Update your profile, {user && user.first_name}
            </p>
            <p>Email:</p>
            <input
              value={user.email || ""}
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <p>First Name:</p>
            <input
              value={user.first_name || ""}
              type="text"
              name="first name"
              placeholder="first name"
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <p>Last Name:</p>
            <input
              value={user.last_name || ""}
              type="text"
              name="last name"
              placeholder="last name"
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
            <p>Gender:</p>
            <input
              value={user.gender || ""}
              type="text"
              name="gender"
              placeholder="Select Gender"
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            />
            <p>Age:</p>
            <input
              value={user.age || ""}
              type="text"
              name="age"
              placeholder="age"
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />
            <p>Location:</p>
            <input
              value={user.location || ""}
              type="text"
              name="location"
              placeholder="location"
              onChange={(e) => setUser({ ...user, location: e.target.value })}
            />
            <p>Days Available:</p>
            <input
              value={user.days_available || ""}
              type="text"
              name="days available"
              placeholder="days available"
              onChange={(e) =>
                setUser({ ...user, days_available: e.target.value })
              }
            />
            <p>Times Available:</p>
            <input
              value={user.times_available || ""}
              type="text"
              name="times available"
              placeholder="times available"
              onChange={(e) =>
                setUser({ ...user, times_available: e.target.value })
              }
            />
            <p>Timezone:</p>
            <input
              value={user.timezone || ""}
              type="text"
              name="timezone"
              placeholder="timezone"
              onChange={(e) => setUser({ ...user, timezone: e.target.value })}
            />
            <p>Education:</p>
            <input
              value={user.education || ""}
              type="text"
              name="education"
              placeholder="education"
              onChange={(e) => setUser({ ...user, education: e.target.value })}
            />
            <p>Education Level:</p>
            <input
              value={user.education_level || ""}
              type="text"
              name="education level"
              placeholder="education level"
              onChange={(e) =>
                setUser({ ...user, education_level: e.target.value })
              }
            />
            <p>Major:</p>
            <input
              value={user.photos || ""}
              type="text"
              name="major"
              placeholder="major"
              onChange={(e) => setUser({ ...user, major: e.target.value })}
            />
            <p>Classes:</p>
            <input
              value={user.classes || ""}
              type="text"
              name="classes"
              placeholder="classes"
              onChange={(e) => setUser({ ...user, classes: e.target.value })}
            />
            <p>Study Habits:</p>
            <input
              value={user.study_habits || ""}
              type="text"
              name="study habits"
              placeholder="study habits"
              onChange={(e) =>
                setUser({ ...user, study_habits: e.target.value })
              }
            />
            <p>Interests:</p>
            <input
              value={user.interests || ""}
              type="text"
              name="interests"
              placeholder="interests"
              onChange={(e) => setUser({ ...user, interests: e.target.value })}
            />
            <p>Languages:</p>
            <input
              value={user.languages || ""}
              type="text"
              name="languages"
              placeholder="languages"
              onChange={(e) => setUser({ ...user, languages: e.target.value })}
            />
            <p>Work:</p>
            <input
              value={user.work || ""}
              type="text"
              name="work"
              placeholder="work"
              onChange={(e) => setUser({ ...user, work: e.target.value })}
            />
            <button type="submit" className="btn draw-border">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
