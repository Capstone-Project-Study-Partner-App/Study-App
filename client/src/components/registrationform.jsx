import { useEffect, useState } from "react";
import { createUser } from "../fetching.js";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ImageUploading from "react-images-uploading";

// import { getEducation } from "../fetching.js";

// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/solid'

// const educationURL = `http://universities.hipolabs.com/search?country=United+States`;

//add email, password, photo, and about me fields
export default function RegistrationForm({ setLoggedIn }) {
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
  const [days_available, setDays_available] = useState([]);
  const [times_available, setTimes_available] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [interests, setInterests] = useState("");
  const [photo, setPhoto] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [study_habits, setStudy_habits] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");

  const [imageDataURL, setImageDataURL] = useState(null);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    if (imageList.length > 0) {
      setImageDataURL(imageList[0].data_url);
    } else {
      setImageDataURL(null);
    }
    setPhoto(imageList);
  };

  // const [selectedDayOptions, setSelectedDayOptions] = useState();
  const [selectedTimezoneOptions, setSelectedTimezoneOptions] = useState();

  // const [educationOptions, setEducationOptions] = useState([]);

  const navigate = useNavigate();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleEducationLevelChange = (e) => {
    setEducation_level(e.target.value);
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };

  function handleTimezoneSelect(data) {
    setSelectedTimezoneOptions(data);
  }

  const timezonesOptions = [
    { value: "HST", label: "HST" },
    { value: "AKST", label: "AKST" },
    { value: "PST", label: "PST" },
    { value: "MST", label: "MST" },
    { value: "CST", label: "CST" },
    { value: "EST", label: "EST" },
  ];

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleStudyHabitChange = (e) => {
    setStudy_habits(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguages(e.target.value);
  };

  const times = [
    { value: "Morning", label: "Morning" },
    { value: "Afternoon", label: "Afternoon" },
    { value: "Evening", label: "Evening" },
    { value: "Night", label: "Night" },
  ];

  const days = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const language_selection = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "French", label: "French" },
    { value: "Arabic", label: "Arabic" },
    { value: "Other", label: "Other" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createUser({
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
        days_available: days_available.map((day_option) => day_option.value),
        times_available: times_available.map(
          (time_option) => time_option.value
        ),
        timezone: timezone,
        interests: [interests],
        photo: imageDataURL,
        languages: languages.map((language_option) => language_option.value),
        study_habits: study_habits,
        major: major,
        age: age,
        work: work,
      });
      setLoggedIn(true);
      navigate("/users");
    } catch (error) {
      console.error("There was an error with the registration form", error);
    }
  }

  // useEffect(()=>{
  //   async function fetchData(){
  //     try{
  //       const response = await fetch (educationURL);
  //       const data = await response.json();
  //       const universityNames=data.map((university)=>university.name);
  //       setEducationOptions(universityNames)
  //     }catch (error){
  //       console.error(error)
  //     }
  //   }fetchData();
  // },[])

  // useEffect(() => {
  //   getEducation()
  //     .then((data) => {
  //       const options = data.map((item) => item.name);
  //       setEducationOptions(options);
  //     })
  //     .catch((error) => {
  //       console.error("There is an error with education selection", error);
  //     });
  // }, []);

  return (
    <div>
      <section className="registration_form">
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-4xl text-center">
          Registration
        </h2>
        <br />
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Email
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm pl-2 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="email"
                    value={email}
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Password
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    id="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={password}
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    First Name
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      id="first_name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={first_name}
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      onChange={(e) => setFirst_name(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={last_name}
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      onChange={(e) => setLast_name(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Gender
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <select
                      id="gender"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={gender}
                      type="text"
                      name="gender"
                      placeholder="Gender"
                      onChange={handleGenderChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  About Me
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about_me"
                    className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={about_me}
                    type="text"
                    rows={3}
                    name="about_me"
                    placeholder="About Me"
                    onChange={(e) => setAbout_me(e.target.value)}
                    required
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Use this space to describe who you are so buddies can get to
                    know you better!
                  </p>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="register_photo">
                    <ImageUploading
                      multiple
                      value={photo}
                      onChange={onChange}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <label
                            htmlFor="photo"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Photo
                          </label>
                          <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <button
                              style={isDragging ? { color: "red" } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Click or Drop here
                            </button>
                            &nbsp;
                            <button onClick={onImageRemoveAll}>
                              Remove all images
                            </button>
                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  width="100"
                                />
                                <div className="image-item__btn-wrapper">
                                  <button onClick={() => onImageUpdate(index)}>
                                    Update
                                  </button>
                                  <button onClick={() => onImageRemove(index)}>
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>

                  {/* <input
                    id="photo"
                    className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={photo}
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    onChange={(e) => setPhoto(e.target.value)}
                    required
                  /> */}

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Please input a image URL for your profile picture.
                  </p>
                </div>
              </div>
              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    ZIP Code
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      id="location"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={location}
                      type="text"
                      name="location"
                      placeholder="ZIP Code"
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Please input your 5-digit ZIP Code.
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Age
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    id="age"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={age}
                    type="text"
                    name="age"
                    placeholder="Age"
                    onChange={handleAgeChange}
                    required
                  >
                    <option value="">Select Age</option>
                    <option value="15-17">15-17</option>
                    <option value="18-24">18-24</option>
                    <option value="25-29">25-29</option>
                    <option value="30+">30+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Studying Preferences
          </h2>

          <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="education"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Education
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="education"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={education}
                  type="text"
                  name="education"
                  placeholder="Education"
                  // onChange={(selectedOption)=>setEducation(selectedOption)}
                  onChange={(e) => setEducation(e.target.value)}
                />

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  ex: Hillview University, The Grace Hopper Program at Full
                  Stack Academy
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="education_level"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Education Level
                </label>
                <select
                  id="education_level"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={education_level}
                  type="text"
                  name="education_level"
                  placeholder="Education Level"
                  onChange={handleEducationLevelChange}
                  required
                >
                  <option value="">Select Education Level</option>
                  <option value="High School">High School</option>
                  <option value="College Freshman">College Freshman</option>
                  <option value="College Sophomore">College Sophomore</option>
                  <option value="College Junior">College Junior</option>
                  <option value="College Senior">College Senior</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="major"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Major
                </label>
                <select
                  id="major"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={major}
                  type="text"
                  name="major"
                  placeholder="Major"
                  onChange={handleMajorChange}
                >
                  <option value="">Select Major</option>
                  <option value="Art">Art</option>
                  <option value="Business">Business</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Foreign Language">Foreign Language</option>
                  <option value="Literature">Literature</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                </select>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="classes"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Classes
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={classes}
                    type="text"
                    name="classes"
                    placeholder="Classes"
                    onChange={(e) => setClasses(e.target.value)}
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Classes taken or are currently taking.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="classes"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Study Habits
                </label>
                <select
                  id="study_habits"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset foc us:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={study_habits}
                  type="text"
                  name="study_habits"
                  placeholder="Study Habits"
                  onChange={handleStudyHabitChange}
                  required
                >
                  <option value="">Select Study Habit</option>
                  <option value="Chill">Chill</option>
                  <option value="Semi-Chill">Semi-Chill</option>
                  <option value="Semi-Grind">Semi-Grind</option>
                  <option value="Grind">Grind</option>
                </select>
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="days_available"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Days Available
                </label>
                <Select
                  id="days_available"
                  className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  options={days}
                  value={days_available}
                  isSearchable={true}
                  isMulti
                  type="text"
                  name="days_available"
                  placeholder="Select Days Available"
                  onChange={setDays_available}
                  required
                />
              </div>
            </div>

            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="times_available"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Times Available
                </label>
                <div className="times_available_box">
                  <Select
                    className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    options={times}
                    value={times_available}
                    type="text"
                    name="times_available"
                    isSearchable={true}
                    isMulti
                    placeholder="Select Times Available"
                    onChange={setTimes_available}
                    required
                  />
                  <p
                    className="mt-3 text-sm leading-6 text-gray-600"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    ex: Morning (5AM-12PM), Afternoon (12PM-5PM), Evening
                    (5PM-9PM), Night (9PM-5AM)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Time Zone
                </label>
                <Select
                  id="timezone"
                  className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  options={timezonesOptions}
                  value={selectedTimezoneOptions}
                  isSearchable={true}
                  type="text"
                  name="timezone"
                  placeholder="Select Time Zone"
                  onChange={handleTimezoneSelect}
                  required
                />
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="interests"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Interests
                </label>
                <input
                  id="interests"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={interests}
                  type="text"
                  name="interests"
                  placeholder="Interests"
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="languages"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Languages
                </label>
                <Select
                  id="languages"
                  className="block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  options={language_selection}
                  value={languages}
                  isMulti
                  isSearchable={true}
                  type="text"
                  name="languages"
                  placeholder="Languages"
                  onChange={setLanguages}
                />
              </div>
            </div>
            <div className="mt-10 space-y-6 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="work"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Work
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    id="work"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={work}
                    type="text"
                    name="work"
                    placeholder="Work"
                    onChange={(e) => setWork(e.target.value)}
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    If applicable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-indigo-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
