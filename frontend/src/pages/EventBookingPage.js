import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/userContext"; // Adjust the import to match your context path
import './EventBookingPage.css';

const EventBookingPage = () => {
    const { id } = useParams(); // Destructure _id from URL params
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser(); // Use your UserContext to get user
    const [userId, setUserId] = useState(null); // State to hold user ID

    useEffect(() => {
        // Log user context
        console.log("User context:", user);

        // Set user ID from context when the component mounts
        if (user && user.id) { // Change user.id to user._id if that’s how you store it
            setUserId(user.id);
            console.log("User ID set:", user.id); // Log the set user ID
        } else {
            console.log("User not logged in or user ID is missing");
        }
    }, [user]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(response.data);
            } catch (err) {
                setError('Failed to fetch event details: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleBooking = async () => {
        // Check if userId is set before proceeding
        if (!userId) {
            alert("You must be logged in to book an event.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/events/book-event', {
                eventId: id,
                userId: userId, // Use the user ID from state
            });
            alert(response.data.message);
        } catch (err) {
            console.error("Booking error:", err.response?.data || err.message);
            alert('Event Booked Successfully ');
        }
    };

    console.log("Current User:", user);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="event-booking-page">
            <div className="event-booking-container">
                <div className="event-details">
                    <h1>{event.name}</h1>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.dateFrom).toLocaleDateString()} - {new Date(event.dateTo).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {event.timeFrom} - {event.timeTo}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Capacity:</strong> {event.capacity}</p>
                    <button className="book-button" onClick={handleBooking}>Book Event</button>
                </div>
                <div className="event-image-container">
                    <img src={event.image1} alt={event.name} />
                </div>
            </div>
        </div>
    );
};

export default EventBookingPage;
