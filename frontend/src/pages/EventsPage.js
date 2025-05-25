import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/EventCards";
import "./EventsPage.css";

function EventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/events/get-events");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="events-page">
            <h1>Events</h1>
            <div className="events-grid">
                {events.map((event) => (
                    <Card
                        key={event._id}
                        title={event.name}
                        text={event.description}
                        image={event.image1}
                        link={`/event-booking/${event._id}`} // Pass the correct link here
                    />
                ))}
            </div>
        </div>
    );
}

export default EventsPage;
