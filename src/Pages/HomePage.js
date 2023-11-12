import React, { useEffect } from "react";
// import { Element } from "react-scroll";
import Navbar from "../Components/Navbar";
import SearchPage from "../Components/HomePage/SearchPage";
import WeatherDisplay from "../Components/HomePage/WeatherDisplay.js";
import FlightSearch from "../Components/HomePage/FlightSearch";
import ScrollReveal from "scrollreveal";
import "../CSS/HomePage.css";

const HomePage = () => {
  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal(".your-section", {
      origin: "right",
      distance: "300px",
      easing: "ease-in-out",
      duration: 800,
    });
    sr.reveal(".your-section2", {
      origin: "left",
      distance: "300px",
      easing: "ease-in-out",
      duration: 800,
    });
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      {/* <Element name="home">  */}
        <div className="search-page section your-section" id="home">
          <SearchPage />
        </div>
      {/* </Element> */}
      {/* <Element name="weather"> */}
        <div className="weather-display section your-section2" id="weather">
          <WeatherDisplay />
        </div>
      {/* </Element> */}
      {/* <Element name="flight-search"> */}
        <div className="flight-search section your-section" id="flight-search">
          <FlightSearch />
        </div>
      {/* </Element> */}
    </div>
  );
};

export default HomePage;
