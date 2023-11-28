import React from "react";
import "./CSS/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <a href="/">
          <span className="logo-text">POKE</span>
        </a>
      </div>
      <ul className="nav-links">
        <li>
          {/* Replace the Link with an anchor tag */}
          <a href="/#home">Home</a>
        </li>
        <li>
          <a href="/#weather">Weather</a>
        </li>
        <li>
          <a href="/#flight-search">Flight Search</a>
        </li>
        <li>
          {/* Open a new page for Airport Delays */}
          <a href="/AirportDelays" target="_blank" rel="noopener noreferrer">
            Delays
          </a>
        </li>
        <li>
          {/* Open a new page for Airports */}
          <a href="/Airports" target="_blank" rel="noopener noreferrer">
            Airports
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
