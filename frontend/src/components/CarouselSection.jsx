import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './CarouselSection.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import axios from 'axios'; // Import axios to make API calls

export default function CarouselSection() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [events, setEvents] = useState([]); // State to hold the events data

  useEffect(() => {
    // Fetch events data from the server
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/get-events'); // Adjust the API endpoint as needed
        setEvents(response.data); // Set the events data to state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="carousel-container"
      style={{
        backgroundImage: events.length > 0 ? `url("${events[activeIndex].image2}")` : 'none', // Use image 2 from the active event
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        transition: 'background-image 0.5s ease',
      }}
    >
      {/* Main content overlay */}
      {events.length > 0 && (
        <div className="content-overlay">
          <h1 className="main-title">{events[activeIndex].name}</h1>
          <p className="description">{events[activeIndex].description}</p>
          <button className="cta-button">SEE MORE</button>
        </div>
      )}

      {/* Main Swiper */}
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {events.map((event, index) => (
          <SwiperSlide key={event._id}>
            {/* You can leave this empty or add some content if needed */}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event._id}>
            <img src={event.image2} alt={event.name} />
            <div className="slide-content">
              <p className="slide-name">{event.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
