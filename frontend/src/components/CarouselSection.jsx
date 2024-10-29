import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './CarouselSection.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const bgImages = [
    'url("/img11.jpg")',
    'url("/img22.jpg")',
    'url("/img33.jpg")',
    'url("/img44.jpg")',
  ];

  return (
    <div
      className="carousel-container"
      style={{
        backgroundImage: bgImages[activeIndex],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        transition: 'background-image 0.5s ease',
      }}
    >
      {/* Main content overlay */}
      <div className="content-overlay">
        <h1 className="main-title">EVENT NAME</h1>
        <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, corporis. Reiciendis, beatae earum. Dolorum quidem maiores laborum fugit quae cumque.</p>
        <button className="cta-button">SEE MORE</button>
      </div>

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
        {/* Background images are applied directly through the bgImages array, no need for image tags */}
        <SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>
        </SwiperSlide>
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
        <SwiperSlide>
          <img src="/img11.jpg" alt="Thumbnail 1" />
            <div className="slide-content">
              <p className="slide-name">Slider 1</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img22.jpg" alt="Thumbnail 2" />
            <div className="slide-content">
              <p className="slide-name">Slider 2</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img33.jpg" alt="Thumbnail 3" />
            <div className="slide-content">
              <p className="slide-name">Slider 3</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img44.jpg" alt="Thumbnail 4" />
            <div className="slide-content">
              <p className="slide-name">Slider 4</p>
            </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* <div className="swiper-button-prev custom-arrow">←</div>
      <div className="swiper-button-next custom-arrow">→</div> */}
    </div>
  );
}
