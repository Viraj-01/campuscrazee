import React, { useState, useEffect } from "react";
import Card from "./EventCards";
import './EventCardsCarousel.css';
import axios from 'axios'; // Import axios to make API calls

const EventCardsCarousel = () => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch data from the database
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/events/get-events'); // Replace with your actual endpoint
        setCards(response.data); // Assuming the response data is an array of events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchData();
  }, []);

  const handleNext = () => {
    if (index + 5 < cards.length) {
      setIndex(index + 5);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 5);
    }
  };

  return (
    <div className="carousel-wrapper overflow-hidden">
      <div className="header">
        <h2>Live Events</h2>
        <a href="/events" className="see-all">See All</a>
      </div>
      <div className="carousel">
        <button className="carousel-button prev" onClick={handlePrev}>&lt;</button>
        <div className="cards-container">
          {cards.slice(index, index + 5).map((card, idx) => (
            <Card
              key={card._id} // Use a unique identifier for the key
              title={card.name} // Assuming the event schema has a 'name' field
              text={card.description} // Assuming the event schema has a 'description' field
              image={card.image1} // Use image1 from the event object
            />
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default EventCardsCarousel;
