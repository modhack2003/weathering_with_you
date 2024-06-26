import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Weather_fetch from './components/Weather_fetch';
import NavBar from "./components/NavBar";
import About_us from './components/About_us';
import ContactUs from '../src/components/ContactUs';
import Home from './components/home'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path = "/Home" element={<Home/>}/>
        <Route path="/weather" element={<Weather_fetch />} />
        <Route path="/aboutus" element={<About_us />} />
        <Route path= "/ContactUs" element={<ContactUs/>}/>
      </Routes>
      <footer className="glass-footer">
           <p> Made with love |
            &copy; 2024 BIKRAM DEY</p>
      </footer>

    </Router>
  );
}

export default App;