// src/pages/Alerts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/alerts.css';
import { useNavigate } from 'react-router-dom';

const Alerts = () => {
    const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [filterState, setFilterState] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('/api/alerts');
        setAlerts(response.data);
      } catch (err) {
        console.error('Error fetching alerts:', err);
      }
    };

    fetchAlerts();
  }, []);

  const severityMap = {
    low: 1,
    medium: 2,
    high: 3,
  };

  const filteredAlerts = alerts
   .filter(alert => {
  if (!filterState) return true;
  return alert.target?.toLowerCase() === filterState.toLowerCase();
})

    .sort((a, b) => {
      if (!sortOrder) return 0;
      const sevA = severityMap[a.severity?.toLowerCase()] || 0;
      const sevB = severityMap[b.severity?.toLowerCase()] || 0;
      return sortOrder === 'asc' ? sevA - sevB : sevB - sevA;
    });

  return (
    <div className="alerts-container">
        <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>
      <h2>Disaster Alerts & Natural Calamity Predictions</h2>

      <div className="filter-sort-controls">
        <label htmlFor="stateFilter">
          Filter by State:&nbsp;
          <select
            id="stateFilter"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            
  <option value="">All</option>
  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Odisha">Odisha</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="West Bengal">West Bengal</option>
  <option value="Delhi">Delhi</option>
  <option value="Puducherry">Puducherry</option>
  <option value="Jammu & Kashmir">Jammu & Kashmir</option>
  <option value="Ladakh">Ladakh</option>
          </select>
        </label>

        <label htmlFor="sortSeverity" style={{ marginLeft: '16px' }}>
          Sort by Severity:&nbsp;
          <select
            id="sortSeverity"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </label>
      </div>

      <div className="alerts-grid">
        {filteredAlerts.length === 0 ? (
          <p>No alerts found.</p>
        ) : (
          filteredAlerts.map((alert, index) => (
            <div key={index} className={`alert-card ${alert.severity?.toLowerCase()}`}>
              <h3>{alert.title}</h3>
              <p><strong>Type:</strong> {alert.type}</p>
              <p><strong>Severity:</strong> {alert.severity}</p>
              <p><strong>State:</strong> {alert.target || 'N/A'}</p>
              <p><strong>Location:</strong> {alert.location?.lat?.toFixed(2)}, {alert.location?.lng?.toFixed(2)}</p>
              <p>{alert.description}</p>
              <a href={alert.source} target="_blank" rel="noreferrer">Read more &gt;&gt;&gt;</a>
              <small>Issued on: {new Date(alert.timestamp).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;
