// src/pages/LandingPage.jsx
import React from 'react';
import { useUser } from '../context/userContext'; // Import useUser context
import Navbar from '../components/Navbar';
import CarouselSection from '../components/CarouselSection';
import EventCardsCarousel from '../components/EventCardsCarousel';
import './LandingPage.css';

const LandingPage = () => {
    const { user, logout } = useUser(); // Access user context
    const loggedIn = !!user; // Determine if the user is logged in

    return (
        <div className="landing-page">
            <Navbar user={user} loggedIn={loggedIn} logout={logout} />
            <CarouselSection />
            <EventCardsCarousel />
            {loggedIn && user && (
                <div>
                    <h2>Welcome, {user.username}!</h2>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
