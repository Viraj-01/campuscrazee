// Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';
import DoubleSliderForm from './DoubleSliderForm';
import AddCollegeModal from './AddCollegeModal';
import AddCommitteeModal from './AddCommitteeModal';
import { useUser } from '../context/userContext';

const Navbar = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate(); // Initialize useNavigate
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAddCollegeModalOpen, setIsAddCollegeModalOpen] = useState(false);
    const [isAddCommitteeModalOpen, setIsAddCommitteeModalOpen] = useState(false);
    const menuRef = useRef(null);

    const handleToggleForm = () => {
        setIsFormVisible((prev) => !prev);
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.profile')) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const renderMenuOptions = () => {
        if (!user) return null;

        switch (user.role) {
            case 'main_admin':
                return (
                    <>
                        <li>
                            <a href="#add-college" onClick={() => setIsAddCollegeModalOpen(true)}>Add College</a>
                        </li>
                        <li><a href="#manage-users" onClick={() => setIsAddCommitteeModalOpen(true)}>Manage Users</a></li>
                        <li><a href="#settings" onClick={toggleMenu}>Settings</a></li>
                    </>
                );
            case 'college_head':
                return (
                    <>
                        <li><a href="#add-committee" onClick={() => setIsAddCommitteeModalOpen(true)}>Add Committee</a></li>
                        <li><a href="#inbox" onClick={toggleMenu}>Inbox</a></li>
                        <li><a href="#events" onClick={toggleMenu}>Events</a></li>
                    </>
                );
            case 'committee_head':
                return (
                    <>
                        <li><a href="#create-event" onClick={() => navigate('/create-event')}>Create Event</a></li> {/* Navigate to event creation */}
                        <li><a href="#inbox" onClick={toggleMenu}>Inbox</a></li>
                        <li><a href="#manage-classes" onClick={toggleMenu}>Manage Classes</a></li>
                    </>
                );
            case 'normal_user':
                return (
                    <>
                        <li><a href="#profile" onClick={toggleMenu}>Profile</a></li>
                        <li><a href="#inbox" onClick={toggleMenu}>Inbox</a></li>
                        <li><a href="#manage-classes" onClick={toggleMenu}>Manage Classes</a></li>
                    </>
                );
            default:
                return null;
        }
    };

    // Function to handle adding a college
    const handleAddCollege = async (collegeData) => {
        console.log('Adding College:', collegeData);
        setIsAddCollegeModalOpen(false);
    };

    // Function to handle adding a committee
    const handleAddCommittee = async (committeeData) => {
        console.log('Committee added:', committeeData);
        setIsAddCommitteeModalOpen(false); // Close the modal after adding the committee
    };

    return (
        <>
            <nav className="navbar overflow-hidden">
                <div className="logo">
                    <a href="#home">CampusCraze</a>
                </div>

                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/events" onClick={() => navigate('/events')}>Events</a>
                    <a href="#services">Gallery</a>
                    <a href="#contact">About Us</a>
                </div>

                {user ? (
                    <div className="profile" onClick={toggleMenu} ref={menuRef}>
                        <div className="user">
                            <h3>{user.username}</h3>
                            <p>{user.email}</p>
                        </div>
                        <div className="img-box">
                            <img src="/userplaceholder.jpg" alt="User" className="profile-icon" />
                        </div>
                    </div>
                ) : (
                    <div className="profile" onClick={handleToggleForm}>
                        <img src="/userplaceholder.jpg" alt="Profile Icon" className="profile-icon" />
                        <p>Sign In / Sign Up</p>
                    </div>
                )}
            </nav>

            {menuOpen && (
                <div className={`menu ${menuOpen ? 'active' : ''}`} ref={menuRef} onClick={(e) => e.stopPropagation()}>
                    <ul>
                        {renderMenuOptions()}
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            )}

            {isAddCollegeModalOpen && (
                <AddCollegeModal
                    onClose={() => setIsAddCollegeModalOpen(false)}
                    onAddCollege={handleAddCollege}
                />
            )}

            {isAddCommitteeModalOpen && (
                <AddCommitteeModal
                    onClose={() => setIsAddCommitteeModalOpen(false)}
                    onAddCommittee={handleAddCommittee} // Pass the handler
                />
            )}

            {isFormVisible && (
                <div className="modal-overlay" onClick={handleToggleForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <DoubleSliderForm onSuccess={() => setIsFormVisible(false)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
