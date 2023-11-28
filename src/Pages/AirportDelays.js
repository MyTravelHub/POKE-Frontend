import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/AirportDelays.css'; // Import your Delays component styles
import Navbar from '../Components/Navbar';
import DelayCard from '../Components/AirportDelays/DelayCard'; // Import the DelayCard component

const apiKey = process.env.REACT_APP_AIRLABS_API_KEY;
const airlinesApiUrl = 'https://airlabs.co/api/v9/airlines?api_key=' + apiKey;

const AirportDelays = () => {
  const { searchQuery } = useParams();
  const [delayData, setDelayData] = useState([]);
  const [airlines, setAirlines] = useState({});
  const [selectedAirline, setSelectedAirline] = useState('');
  const [selectedAirportName, setSelectedAirportName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  useEffect(() => {
    setCurrentSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchAirlines() {
      try {
        const responseAirlines = await fetch(airlinesApiUrl);
        if (responseAirlines.ok) {
          const data = await responseAirlines.json();
          const airlinesMap = {};
          data.response.forEach((airline) => {
            airlinesMap[airline.iata_code] = airline.name;
          });
          setAirlines(airlinesMap);
        }
      } catch (error) {
        console.error('Error fetching airlines data:', error);
      }
    }

    fetchAirlines();
  }, []);

  useEffect(() => {
    async function fetchDelays() {
      if (currentSearchQuery) {
        try {
          const delaysApiUrl = `https://airlabs.co/api/v9/delays?delay=60&type=departures&dep_iata=${currentSearchQuery}&api_key=${apiKey}`;
          const responseDelays = await fetch(delaysApiUrl);
          if (responseDelays.ok) {
            const delays = await responseDelays.json();
            setDelayData(delays.response);
            setSelectedAirportName(delays.request.params.dep_iata);
          } else {
            setDelayData([]);
            setSelectedAirportName('No Data Found');
          }
        } catch (error) {
          console.error('Error fetching delay data:', error);
        }
      } else {
        setDelayData([]);
        setSelectedAirportName('Please Enter an Airport Code');
      }
    }

    fetchDelays();
  }, [currentSearchQuery]);

  const filteredDelays = delayData.filter(
    (delay) => !selectedAirline || delay.airline_iata === selectedAirline
  );

  const handleChange = (event) => {
    setSelectedAirline(event.target.value);
  };

  return (
    <div className="main-container">
      <Navbar className="transparent-navbar" />
      <div className="background-section">
        <h1 className="title">{`${selectedAirportName} Airport Delays`}</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter airport name (JFK, LAX, etc.)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={() => setCurrentSearchQuery(searchInput)}>Search</button>
        </div>
      </div>
      <div className="airline-filter">
        <label htmlFor="airlineSelect">Filter by Airline:</label>
        <select id="airlineSelect" value={selectedAirline} onChange={handleChange}>
          <option value="">All Airlines</option>
          {Object.entries(airlines).map(([iataCode, airlineName]) => (
            <option key={iataCode} value={iataCode}>
              {airlineName}
            </option>
          ))}
        </select>
      </div>
      <div className="delay-cards">
        {filteredDelays.map((delay, index) => (
          <DelayCard
            key={index}
            airlineName={airlines[delay.airline_iata]}
            flightNumber={delay.flight_number}
            delay={delay.delayed}
          />
        ))}
      </div>
    </div>
  );
};

export default AirportDelays;
