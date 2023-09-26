import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Buddies from './components/buddies';
import Events from './components/events';
import Messages from './components/messages';
import Profile from './components/profile';
import NewEventForm from './components/newevent';
import MessageThread from "./components/Thread";
import RegistrationForm from './components/registrationform';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="nav-bar-container">
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/users' element={<Buddies/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/events/new_event_form' element={<NewEventForm/>}/>
          <Route path='/:id/messages' element={<Messages/>}/>
          <Route path="/thread/:id" element={<MessageThread />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path='/registration_questionnaire' element={<RegistrationForm/>}/>
        </Routes>
      </div>
      {/* <h1 className="text-3xl font-bold text-red-500 underline text-center">
        Hello world!
      </h1> */}
    </>
  );
}

export default App;
