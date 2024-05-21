import React, { useState } from 'react';
import './NavBar.css'; 
import logo from "../assets/logo.jpeg";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from 'react-icons/io';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleOpen = () => {
    setMenuOpen(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className='title'>weathering with you</div>
      <div className='sub'>Tenki no ko </div>
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <div className='close' onClick={handleClose}>
          <IoMdClose className='icon-close'/>
        </div>
        <Link to="/Home" onClick={handleClose}>Home</Link>
        <Link to="/aboutus" onClick={handleClose}>About Us</Link>
        <Link to="/contact" onClick={handleClose}>Contact Us</Link>
      </ul>
      <ul className="navbar-links">
        <li className='mobile-hide'><Link to="/Home">Home</Link></li>
        <li className='mobile-hide'><Link to="/aboutus">About Us</Link></li>
        <li className='mobile-hide'><Link to="/contactUs">Contact Us</Link></li>
        <div className='menu-icon' onClick={handleOpen}>
          <IoMdMenu className='icon'/>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
