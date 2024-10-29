import React, { useState, useEffect } from "react";
import Card from "./EventCards";
import './EventCardsCarousel.css';

const EventCardsCarousel = () => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);

  // Simulated database fetch - Replace this with an actual database call
  useEffect(() => {
    async function fetchData() {
      // Replace with actual fetch request
      const fetchedData = await fetchCardsFromDB();
      setCards(fetchedData);
    }
    fetchData();
  }, []);

  // Dummy fetch function to simulate a database call
  const fetchCardsFromDB = async () => {
    return Array.from({ length: 10 }, (_, i) => ({
      title: `Card Title ${i + 1}`,
      text: `This is the description for card ${i + 1}`,
      image: "https://via.placeholder.com/300x400", // Replace with actual image URL
    }));
  };

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
    <div className="carousel-wrapper">
      <div className="header">
        <h2>Live Events</h2>
        <a href="#" className="see-all">See All</a>
      </div>
      <div className="carousel">
        <button className="carousel-button prev" onClick={handlePrev}>&lt;</button>
        <div className="cards-container">
          {cards.slice(index, index + 5).map((card, idx) => (
            <Card
              key={idx}
              title={card.title}
              text={card.text}
              image={card.image}
            />
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default EventCardsCarousel;

