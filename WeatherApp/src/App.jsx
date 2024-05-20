import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Weather_fetch from './components/Weather_fetch';
import NavBar from "./components/NavBar";
import About_us from './components/About_us';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes> 
        <Route path="/" element={<Weather_fetch />} />
        <Route path="/aboutus" element={<About_us />} />
      </Routes>
    </Router>
  );
}

export default App;