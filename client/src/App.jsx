import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Buddies from './components/buddies';
import Events from './components/events';
import Messages from './components/messages';
import Profile from './components/profile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='nav-bar-container'>
        <Navbar/> 
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/users' element={<Buddies/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/:id/messages' element={<Messages/>}/>
          <Route path='/users/:id' element={<Profile/>}/>
        </Routes>
      </div>

    </>
  )
}

export default App
