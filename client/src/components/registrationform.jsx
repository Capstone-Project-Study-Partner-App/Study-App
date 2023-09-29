import { useState } from "react";
import { createUser } from "../fetching.js";
import { useNavigate } from "react-router-dom";

//add email, password, photo, and about me fields
export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [about_me, setAbout_me] = useState("");
  const [education, setEducation] = useState("");
  const [education_level, setEducation_level] = useState("");
  const [classes, setClasses] = useState("");
  const [days_available, setDays_available] = useState("");
  const [times_available, setTimes_available] = useState("");
  const [timezone, setTimezone] = useState("");
  const [interests, setInterests] = useState("");
  const [photo, setPhoto] = useState("");
  const [languages, setLanguages] = useState("");
  const [study_habits, setStudy_habits] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      location: location,
      about_me: about_me,
      education: education,
      education_level: education_level,
      classes: [classes],
      days_available: [days_available],
      times_available: [times_available],
      timezone: timezone,
      interests: [interests],
      photo: photo,
      languages: [languages],
      study_habits: study_habits,
      major: major,
      age: age,
      work: work,
    };
    console.log("I am from line 45", userData);
    try {
      await createUser(userData);

      //   navigate(0);
    } catch (error) {
      console.error("There was an error with the registration form", error);
    }
  }

  return (
    <div>
      <section className="registration_form">
        <h1>Registration Questionnaire</h1>
        <form onSubmit={handleSubmit}>
          <h5>Email</h5>
          <input
            id="email"
            className="registration_email"
            value={email}
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
                  <h5>Password</h5>
          <input
            id="password"
            className="registration_password"
            value={password}
            type="text"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
                  <h5>First Name</h5>
          <input
            id="first_name"
            className="registration_first_name"
            value={first_name}
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <h5>Last Name</h5>
          <input
            id="last_name"
            className="registration_last_name"
            value={last_name}
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={(e) => setLast_name(e.target.value)}
          />
          <h5>Gender</h5>
          <input
            id="gender"
            className="registration_gender"
            value={gender}
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />
          <h5>Location</h5>
          <input
            id="location"
            className="registration_location"
            value={location}
            type="text"
            name="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
                    <h5>About Me</h5>
          <input
            id="about_me"
            className="registration_about_me"
            value={about_me}
            type="text"
            name="about_me"
            placeholder="About Me"
            onChange={(e) => setAbout_me(e.target.value)}
          />
          <h5>Education</h5>
          <input
            id="education"
            className="registration_education"
            value={education}
            type="text"
            name="education"
            placeholder="Education"
            onChange={(e) => setEducation(e.target.value)}
          />
          <h5>Education Level</h5>
          <input
            id="education_level"
            className="registration_education_level"
            value={education_level}
            type="text"
            name="education_level"
            placeholder="Education Level"
            onChange={(e) => setEducation_level(e.target.value)}
          />
          <h5>Classes</h5>
          <input
            id="classes"
            className="registration_classes"
            value={classes}
            type="text"
            name="classes"
            placeholder="Classes"
            onChange={(e) => setClasses(e.target.value)}
          />
          <h5>Days Available</h5>
          <input
            id="days_available"
            className="registration_days_available"
            value={days_available}
            type="text"
            name="days_available"
            placeholder="Days Available"
            onChange={(e) => setDays_available(e.target.value)}
          />
          <h5>Times Available</h5>
          <input
            id="times_available"
            className="registration_times_available"
            value={times_available}
            type="text"
            name="times_available"
            placeholder="Times Available"
            onChange={(e) => setTimes_available(e.target.value)}
          />
          <h5>Time Zone</h5>
          <input
            id="timezone"
            className="registration_timezone"
            value={timezone}
            type="text"
            name="timezone"
            placeholder="Time Zone"
            onChange={(e) => setTimezone(e.target.value)}
          />
          <h5>Interests</h5>
          <input
            id="interests"
            className="registration_interests"
            value={interests}
            type="text"
            name="interests"
            placeholder="Interests"
            onChange={(e) => setInterests(e.target.value)}
          />
          <h5>Photo</h5>
          <input
            id="photo"
            className="registration_photo"
            value={photo}
            type="text"
            name="photo"
            placeholder="photo"
            onChange={(e) => setPhoto(e.target.value)}
          />
          <h5>Languages</h5>
          <input
            id="languages"
            className="registration_languages"
            value={languages}
            type="text"
            name="languages"
            placeholder="Languages"
            onChange={(e) => setLanguages(e.target.value)}
          />
          <h5>Study Habits</h5>
          <input
            id="study_habits"
            className="registration_study_habits"
            value={study_habits}
            type="text"
            name="study_habits"
            placeholder="Study Habits"
            onChange={(e) => setStudy_habits(e.target.value)}
          />
          <h5>Major</h5>
          <input
            id="major"
            className="registration_major"
            value={major}
            type="text"
            name="major"
            placeholder="Major"
            onChange={(e) => setMajor(e.target.value)}
          />
          <h5>Age</h5>
          <input
            id="age"
            className="registration_age"
            value={age}
            type="text"
            name="age"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <h5>Work</h5>
          <input
            id="work"
            className="registration_work"
            value={work}
            type="text"
            name="work"
            placeholder="Work"
            onChange={(e) => setWork(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
// async function handleSubmit(e){
//     e.preventDefault();
//     const APIData=await createUser(
//         first_name,
//         last_name,
//         gender,
//         dob,
//         education_level,
//         location,
//         classes,
//         education,
//         major,
//         work,
//         interests,
//         skills,
//         languages,
//         availibility,
//         study_habits,
//     );
//     if (APIData.success){
//         console.log ("New User: ", APIData.data.newUser);
//         const newUserList = [...useResolvedPath, APIData.data.newUser];
//         setUser(newUserList);

//         setFirst_name ("");
//         setLast_name ("");
//         setLocation ("");
//         setEducation_level ("");
//         setWork ("");
//         setEducation ("");
//         education ("");
//         setClasses ("");
//         skills ("");
//         availibility("");
//         interests("");
//         languages("");
//         study_habits("");
//         major("");
//         gender ("");
//     }
// }
