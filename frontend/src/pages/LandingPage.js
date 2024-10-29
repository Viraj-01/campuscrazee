import React from 'react';
// import HeroSection from '../components/HeroSection';
import CarouselSection from '../components/CarouselSection';
import Navbar from '../components/Navbar';
// import EventLandingPage from '../components/EventLandingPage';
import EventCardsCarousel from '../components/EventCardsCarousel';

const LandingPage = () => {
  return (
    <div className="landing-page overflow-x-hidden overflow-y-auto">
      {/* <HeroSection /> */}
      <Navbar/>
      <CarouselSection />
      {/* <EventLandingPage/> */}
      <EventCardsCarousel/>
    </div>
  );
};

export default LandingPage;
