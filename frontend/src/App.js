// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import EventCreationPage from './pages/EventCreationPage'; // Import EventCreationPage
import EventBookingPage from './pages/EventBookingPage';
import './components/Navbar.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include Navbar here */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event-booking/:id" element={<EventBookingPage />} />
          <Route path="/create-event" element={<EventCreationPage />} /> {/* New route for event creation */}
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
