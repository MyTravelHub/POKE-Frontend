import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./CSS/FlightSearch.css";

const FlightSearch = () => {
  const [flightData, setFlightData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFlightSearch = async () => {
    try {
      setError(null);
      setLoading(true);

      const [airlineIATA, flightNumber] = searchInput.split(" ");
      const flightIATA = airlineIATA + flightNumber;

      const apiKey = process.env.REACT_APP_AIRLABS_API_KEY;
      const apiUrl = `https://airlabs.co/api/v9/flight?flight_iata=${flightIATA}&api_key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Flight information not found");
      }

      const data = await response.json();

      setFlightData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      setFlightData(null);
      setLoading(false);
    }
  };

  return (
    <div className="flight-search">
      <div className="search-bar1">
        <h2>Flight Search</h2>
        <TextField
          fullWidth
          label="Search Airline Name & Flight No (ex: UA 1010)"
          id="fullWidth"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFlightSearch();
            }
          }}
          disabled={loading}
          InputProps={{
            style: {
              backgroundColor: "white", // Set the background color to white
            },
          }}
        />

        {error && <p className="error">{error}</p>}
      </div>

      {flightData && (
        <div className="result">
          <h2>Flight Information</h2>
          <p>Flight ICAO: {flightData.response.airline_icao || "N/A"}</p>
          <p>Departure City: {flightData.response.dep_city || "N/A"}</p>
          <p>Departure Gate: {flightData.response.dep_gate || "N/A"}</p>
          <p>Arrival City: {flightData.response.arr_city || "N/A"}</p>
          <p>Arrival Gate: {flightData.response.arr_gate || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
