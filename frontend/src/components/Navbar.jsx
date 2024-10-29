import React, { useState } from 'react';
import './Navbar.css'; // Ensure the CSS is imported correctly
import DoubleSliderForm from './DoubleSliderForm'; // Import the DoubleSliderForm

const Navbar = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <>
            <nav className="navbar">
                {/* Left: Brand Name */}
                <div className="logo">
                    <a href="#home">CampusCraze</a>
                </div>

                {/* Center: Navigation Links */}
                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#about">Events</a>
                    <a href="#services">Gallery</a>
                    <a href="#contact">About Us</a>
                </div>

                <div className="profile" onClick={toggleMenu}>
                    <div className="user">
                        <h3>Katherine Cooper</h3>
                        <p>@probablykat66</p>
                    </div>
                    <div className="img-box">
                        <img src="https://i.postimg.cc/BvNYhMHS/user-img.jpg" alt="User" className="profile-icon" />
                    </div>
                </div>

                <div className={`menu ${menuOpen ? 'active' : ''}`}>
                    <ul>
                        <li><a href="#" onClick={handleToggleForm}>Sign in / Sign Up</a></li>
                        <li><a href="#" onClick={toggleMenu}>Profile</a></li>
                        <li><a href="#" onClick={toggleMenu}>Inbox</a></li>
                        <li><a href="#" onClick={toggleMenu}>Settings</a></li>
                        <li><a href="#" onClick={toggleMenu}>Help</a></li>
                    </ul>
                </div>
            </nav>

            {/* Render DoubleSliderForm as a modal */}
            {isFormVisible && (
                <div className="modal-overlay" onClick={handleToggleForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <DoubleSliderForm />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
