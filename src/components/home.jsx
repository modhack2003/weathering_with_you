// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Weathering with you</h1>
      <p>Get real-time weather updates for your location or any city.</p>
      <Link to="/weather" className='home-button'>
        Get Started
      </Link>
    </div>
  );
};

export default Home;
