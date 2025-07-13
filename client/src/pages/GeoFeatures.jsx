import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import '../styles/geofeatures.css';
import { useNavigate } from 'react-router-dom';
const icons = {
  "Hospital": "🏥",
  "Police Station": "🚓",
  "Bunker": "🛡️",
  "High-Rise Building": "🏢",
  "Road": "🛣️",
  "Forest": "🌲",
  "Fire Station": "🚒",
  "Bridge": "🌉",
  "Power Line": "⚡",
  "River": "🌊",
  "School": "🏫",
  "Evacuation Point": "🚨",
  "Shelter": "⛺",
  "Water Tank": "🚰",
  "Communication Tower": "📡"
};

const GeoFeatures = () => {
   const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [features, setFeatures] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const initMap = async () => {
      const userLat = 12.9716, userLng = 77.5946; // Default to Bangalore
      const mapInstance = L.map('geo-map').setView([userLat, userLng], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
      setMap(mapInstance);

      const { data } = await axios.get('/api/geofeatures');
      setFeatures(data);

      data.forEach((f) => {
        const { lat, lng } = { lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0] };
        const icon = icons[f.featureType] || "📍";

        L.marker([lat, lng])
          .addTo(mapInstance)
          .bindPopup(`
            <b>${icon} ${f.name}</b><br/>
            <i>Type:</i> ${f.featureType}<br/>
            <i>Condition:</i> ${f.attributes.condition}<br/>
            <i>Owner:</i> ${f.attributes.owner}
          `);
      });
    };

    initMap();
  }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    features.filter(f => type === "All" || f.featureType === type).forEach(f => {
      const { lat, lng } = { lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0] };
      const icon = icons[f.featureType] || "📍";

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`
          <b>${icon} ${f.name}</b><br/>
          <i>Type:</i> ${f.featureType}<br/>
          <i>Condition:</i> ${f.attributes.condition}<br/>
          <i>Owner:</i> ${f.attributes.owner}
        `);
    });
  };

  return (
    <div className="geo-page">
       <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>
      <div className="legend">
        <label>Filter by Type:</label>
        <select onChange={handleTypeChange}>
          <option value="All">All</option>
          {Object.keys(icons).map((type, idx) => (
            <option key={idx} value={type}>{icons[type]} {type}</option>
          ))}
        </select>
      </div>
      <div id="geo-map"></div>
    </div>
  );
};

export default GeoFeatures;
