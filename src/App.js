import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AirportDelays from './Pages/AirportDelays';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AirportDelays" element={<AirportDelays />} />
          <Route path="/AirportDelays/:searchQuery" element={<AirportDelays />} />
          {/* <Route path="Airports" element={<AirportMaps />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
