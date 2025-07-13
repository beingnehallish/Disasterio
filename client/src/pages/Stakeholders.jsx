import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/stakeholders.css';
import { useNavigate } from 'react-router-dom';
const Stakeholders = () => {
     const navigate = useNavigate();
  const [stakeholders, setStakeholders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedState, setSelectedState] = useState('All');

  useEffect(() => {
    axios.get('/api/stakeholders')
      .then((res) => {
        setStakeholders(res.data);
        setFiltered(res.data);
      });
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    if (state === 'All') setFiltered(stakeholders);
    else setFiltered(stakeholders.filter(s => s.state === state));
  };

  const uniqueStates = ['All', ...new Set(stakeholders.map(s => s.state))];

  return (
    <div className="stakeholders-container">
        <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>
    <h2>STAKEHOLDERS</h2>


      <div className="filter-container">
        <label>Filter by State:</label>
        <select value={selectedState} onChange={handleStateChange}>
          {uniqueStates.map((state, i) => (
            <option key={i} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="card-grid">
        {filtered.length > 0 ? (
          filtered.map((s, i) => (
            <div className="stakeholder-card" key={i}>
              <h3>{s.name}</h3>
              <p><strong>Type:</strong> {s.type}</p>
              <p><strong>Email:</strong> {s.email}</p>
              <p><strong>Phone:</strong> {s.phone}</p>
              <p><strong>Address:</strong> {s.address}</p>
              <p><strong>State:</strong> {s.state}</p>
              <p><strong>Role:</strong> {s.role}</p>
              <p className="description">{s.description}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No stakeholders found.</p>
        )}
      </div>
    </div>
  );
};

export default Stakeholders;
