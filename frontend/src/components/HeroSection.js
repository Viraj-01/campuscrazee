import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="hero-section bg-center relative flex items-center justify-start text-white"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" /> {/* Dark overlay */}
      
      <div className="relative z-20 px-10 max-w-4xl">
        <h1 className="text-6xl font-bold">DESIGN SLIDER</h1>
        <h2 className="text-4xl text-orange-500 mt-4">ANIMAL</h2>
        <p className="mt-4 text-lg max-w-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sequni, rem magnam nescunt minima.
        </p>
        <div className="mt-8 space-x-4">
          <button className="bg-white text-black py-2 px-6 rounded-lg">See More</button>
          <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
