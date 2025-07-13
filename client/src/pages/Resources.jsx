import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/resources.css';
import { useNavigate } from 'react-router-dom';
const categories = [
  "Healthcare", "Rations", "Rescue Equipment", "Medical Kits", "Blankets", "Water", "Food", "Power Backup",
  "Emergency Shelters", "Communication Devices", "Lighting Equipment", "Transport Vehicles", "First Aid",
  "Sanitation Kits", "Infant Care", "Elderly Supplies", "Animal Supplies", "Protective Gear",
  "Fuel", "Construction Tools", "Clothing"
];

const Resources = () => {
   const navigate = useNavigate();
  const [locationState, setLocationState] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    // Get user geolocation
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Reverse geocode (using Nominatim)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const state = data.address.state || '';
          setLocationState(state);
        } catch (err) {
          console.error('Reverse geocoding error:', err);
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLoadingLocation(false);
      }
    );
  }, []);

  const fetchResources = async (category) => {
    setActiveCategory(category);
    try {
      const res = await axios.get('/api/resources');
      const filtered = res.data.filter(
        (r) => r.category === category && r.state === locationState
      );
      setResources(filtered);
    } catch (err) {
      console.error('Error fetching resources:', err);
    }
  };

  return (
    <div className="resources-container">
        <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>
      <h2>RELIEF RESOURCES</h2>
      {loadingLocation ? (
        <div className="loader">Detecting your location...</div>
      ) : (
        <>
          <p className="location-info">Showing results for: <strong>{locationState || "Unknown State"}</strong></p>
          <div className="category-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => fetchResources(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="resource-grid">
            {resources.length === 0 ? (
              <p className="no-data">No resources found for selected category.</p>
            ) : (
              resources.map((r, i) => (
                <div className="resource-card" key={i}>
                  <h3>{r.name}</h3>
                  <p><strong>Category:</strong> {r.category}</p>
                  <p><strong>Quantity:</strong> {r.quantity} {r.unit}</p>
                  <p><strong>Status:</strong> {r.availabilityStatus}</p>
                  <p><strong>Owner ID:</strong> {r.ownerStakeholderId}</p>
                  <p><strong>Location:</strong> ({r.location.lat}, {r.location.lng})</p>
                  <p className="updated">Last Updated: {new Date(r.lastUpdated).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Resources;
