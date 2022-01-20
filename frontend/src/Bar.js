import React from 'react'
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages';
import Profile from './pages/profile';
import Search from './pages/search';
import Stretch from './pages/stretch';
import LogOut from './pages/logout';

const Bar = () => {
  return (
   <Router>
    <NavBar/>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/stretch" element={<Stretch/>}/>
       <Route path="/logout" element={<LogOut/>}/>
    </Routes>
  </Router>
  )
}

export default Bar
