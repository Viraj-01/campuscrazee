import React from "react";
import { Link } from "react-router-dom";
import './EventCards.css';

const Card = ({ title, text, image, link }) => {
  return (
    <div className="card">
      <div className="card__image-container">
        <img src={image} alt={title} className="card__image" />
      </div>
      <div className="card__content">
        <p className="card__title">{title}</p>
        <p className="card__text">{text}</p>
        <Link className="card__button" to={link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;

