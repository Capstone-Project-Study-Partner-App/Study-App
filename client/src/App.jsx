import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Login, { LOGIN_ROUTE } from "./components/login";
import Buddies from "./components/buddies";
import Events from "./components/events";
import Event from "./components/eventDetails";
import Messages from "./components/messages";
import User from "./components/BuddyDetails";
import NewEventForm from "./components/newevent";
import MessageThread from "./components/Thread";
import RegistrationForm from "./components/registrationform";
import Profile from "./components/profile";
import Home from "./components/home";
import UserDashboard from "./components/dashboard";
import PopUpThread from "./components/PopUpThread";
import EditRating from "./components/ratingedit";
import EventEdit from "./components/eventedit";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <div id="nav-bar-container">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
      <div>
        <Routes>
          <Route
            path={LOGIN_ROUTE}
            element={<Login setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/users"
            element={<Buddies setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/events"
            element={<Events setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/events/:id"
            element={<Event setLoggedIn={setLoggedIn} />}
          />
          <Route path="/edit_event/:id" element={<EventEdit />} />
          <Route path="/events/new_event_form" element={<NewEventForm />} />
          <Route
            path="/:id/messages"
            element={<Messages setLoggedIn={setLoggedIn} />}
          />
          <Route path="/thread/:id" element={<MessageThread />} />
          <Route path="/chat/:sender/:receiver" element={<PopUpThread />} />
          <Route
            path="/users/:id"
            element={<User setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/register"
            element={<RegistrationForm setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/profile"
            element={<Profile setLoggedIn={setLoggedIn} />}
          />
          <Route path="/ratings/:rating_id" element={<EditRating />} />
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route
            path="/dashboard"
            element={<UserDashboard setLoggedIn={setLoggedIn} />}
          />
          {/* <Route path="/users/:id" element={<Profile />} /> */}
        </Routes>
      </div>
      {/* <h1 className="text-3xl font-bold text-red-500 underline text-center">
        Hello world!
      </h1> */}
    </>
  );
}

export default App;
