import React from 'react';
import './NavBar.css'; 
import logo from "../assets/logo.jpeg";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from 'react-icons/io';


const NavBar = () => {
  const handleClose = ()=>{
    const menu = document.querySelector('.menu')
    menu.style.display = "none"
  }
  const handleOpen = ()=>{
    const menu = document.querySelector('.menu')
    menu.style.display = "flex"
  }
    
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className='title'>weathering with you</div>
      <div className='sub'>Tenki no ko </div>
      <ul className="menu">
        <div className='close' onClick={handleClose}> <IoMdClose className='icon-close'/></div>
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </ul>
      <ul className="navbar-links">
        <li className='mobile-hide'><Link to="/">Home</Link></li>
        <li className='mobile-hide'><Link to="/aboutus">About Us</Link></li>
        <li className='mobile-hide'><Link to="/contact">Contact Us</Link></li>
        <div className='menu-icon' onClick={handleOpen}><IoMdMenu className='icon'/></div>
      </ul>
    </nav>
  );
}

export default NavBar;
