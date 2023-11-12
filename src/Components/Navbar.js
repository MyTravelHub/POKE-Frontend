import React from "react";
import { Link, Element } from "react-scroll"; // Import Element and Link from react-scroll
import "./Navbar.css";

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
          <Link
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            duration={500}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="weather"
            spy={true}
            smooth={true}
            duration={500}
          >
            Weather
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="flight-search"
            spy={true}
            smooth={true}
            duration={500}
          >
            Flight Search
          </Link>
        </li>
        <li>
          <Link to="/AirportDelays">Delays</Link>
        </li>
        <li>
          <Link to="/Airports">Airports</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
