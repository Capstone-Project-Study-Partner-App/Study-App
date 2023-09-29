import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home, { LOGIN_ROUTE } from "./components/home";
import Buddies from "./components/buddies";
import Events from "./components/events";
import Event from "./components/eventDetails";
import Messages from "./components/messages";
import User from "./components/BuddyDetails";
import NewEventForm from "./components/newevent";
import MessageThread from "./components/Thread";
import RegistrationForm from './components/registrationform';
import Profile from "./components/profile";


function App() {
  return (
    <>
      <div id="nav-bar-container">
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Home />} />
          <Route path="/users" element={<Buddies />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/events/new_event_form" element={<NewEventForm />} />
          <Route path="/:id/messages" element={<Messages />} />
          <Route path="/thread/:id" element={<MessageThread />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/profile" element={<Profile />} />
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
