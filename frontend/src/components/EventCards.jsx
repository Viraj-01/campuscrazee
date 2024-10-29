import React from "react";
import './EventCards.css';

const Card = ({ title, text, image }) => {
  return (
    <div className="card">
      <div className="card__image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="card__content">
        <p className="card__title">{title}</p>
        <p className="card__text">{text}</p>
        <a className="card__button" href="#">
          Read More
        </a>
      </div>
    </div>
  );
};

export default Card;

