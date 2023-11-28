import React from 'react';
import './CSS/DelayCard.css';

const DelayCard = ({ airlineName, flightNumber, delay }) => {
  return (
    <div className="delay-card">
      <p className="info airline">{airlineName}</p>
      <p className="info flight-number">Flight No.: {flightNumber}</p>
      <p className="info delay">Delay: {delay > 60 ? `${Math.floor(delay / 60)} hr ${delay % 60} min` : `${delay} min`}</p>
      <button className="placeholder-button">Button</button>
    </div>
  );
};

export default DelayCard;
