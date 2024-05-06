import React from 'react';
import './NavBar.css'; // Import your CSS file for styling
import logo from "../assets/logo.jpeg"
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className='title'>Tenki no ko </div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
