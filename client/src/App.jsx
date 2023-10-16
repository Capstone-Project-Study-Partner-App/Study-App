import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <div id="nav-bar-container">
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path="/users" element={<Buddies />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/events/new_event_form" element={<NewEventForm />} />
          <Route path="/:id/messages" element={<Messages />} />
          <Route path="/thread/:id" element={<MessageThread />} />
          <Route path="/chat/:sender/:receiver" element={<PopUpThread />} />
          <Route path="/users/:id" element={<User />} />
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<UserDashboard />}/>
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
