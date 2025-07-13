import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import '../styles/incidents.css';
import { useNavigate } from 'react-router-dom';
const Incidents = () => {
      const navigate = useNavigate();
  const [allIncidents, setAllIncidents] = useState([]);
  const [nearbyIncidents, setNearbyIncidents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndIncidents = async () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });

          const { data } = await axios.get('/api/incidents');
          setAllIncidents(data);

          // Filter incidents within 10 km
          const nearby = data.filter((i) => {
            const dist = getDistance(userLat, userLng, i.location.lat, i.location.lng);
            return dist <= 10;
          });
          setNearbyIncidents(nearby);
          setLoading(false);

          // Leaflet map
          const map = L.map('map').setView([userLat, userLng], 12);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

          // Marker for user location
          L.marker([userLat, userLng])
            .addTo(map)
            .bindPopup('Your Location')
            .openPopup();

          // Circle of 10 km radius
          L.circle([userLat, userLng], { radius: 10000, color: 'blue' }).addTo(map);

          const heatPoints = [];

          data.forEach((incident) => {
            const { lat, lng } = incident.location;

            // Dot marker for all incidents
            L.circleMarker([lat, lng], {
              radius: 6,
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.6,
            })
              .addTo(map)
              .bindPopup(
                `<b>${incident.title}</b><br>${incident.type}<br>${incident.status}<br><i>${incident.impactSummary}</i>`
              );

            heatPoints.push([lat, lng, 0.5]);
          });

          // Heatmap
          L.heatLayer(heatPoints, { radius: 25 }).addTo(map);
        },
        (err) => {
          alert('Location access denied');
          setLoading(false);
        }
      );
    };

    fetchLocationAndIncidents();
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => (deg * Math.PI) / 180;

  return (
    <div className="incidents-page">
        <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>
      <h2>Nearby Reported Incidents (radius of 10 km)</h2>
      {loading && <div className="loading">Fetching location...</div>}

      <div id="map"></div>

      <div className="incident-list">
        {nearbyIncidents.map((incident, idx) => (
          <div className="incident-card" key={idx}>
            <h3>{incident.title}</h3>
            <p><strong>Type:</strong> {incident.type}</p>
            <p><strong>Status:</strong> {incident.status}</p>
            <p><strong>Impact:</strong> {incident.impactSummary}</p>
            <p><strong>Reported:</strong> {new Date(incident.timestamp).toLocaleString()}</p>
          </div>
        ))}
        {!loading && nearbyIncidents.length === 0 && (
          <p style={{ color: '#ccc', textAlign: 'center' }}>No incidents within 10 km</p>
        )}
      </div>
    </div>
  );
};

export default Incidents;
