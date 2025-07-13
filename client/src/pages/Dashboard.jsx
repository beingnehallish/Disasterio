import React from 'react';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
   const navigate = useNavigate();
  const videoSnippets = [
    {
      title: 'Assam Floods - July 2025',
      videoUrl: 'https://www.youtube.com/embed/DworWMj4rEs?si=vrToPblnb-zWI9UN',
      quote: '"We lost everything, but we’re alive and together." – Kamal, Survivor',
    },
    {
      title: 'Uttarakhand Landslide',
      videoUrl: 'https://www.youtube.com/embed/pWAMurWl0Mc?si=IqAc-x7zE-lxpGyT',
      quote: '"Our rescue team worked day and night to save every life." – NDRF Officer',
    },
    {
      title: 'Chennai Cyclone Aftermath',
      videoUrl: 'https://www.youtube.com/embed/gpBuwWAvhSg?si=vErBTj2IZVeHgYAD',
      quote: '"Electricity, food and shelter were gone for days." – Local Resident',
    },
  ];

  return (
    <div className="dashboard-page">
       <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>
      <section className="about-section">
        <h2>About DisasterIO</h2>
        <p>
          DisasterIO is an intelligent disaster management system built to enhance preparedness,
          improve response times, and promote transparency across stakeholders. Our features include:
        </p>
        <ul>
          <li>📍 Real-time incident detection and geolocation</li>
          <li>🗃️ Centralized resource tracking and availability</li>
          <li>📣 Live alerts and disaster warnings</li>
          <li>📊 Assessment toolkits for post-disaster evaluation</li>
          <li>🧭 Emergency planning guidelines for authorities and citizens</li>
          <li>🗺️ Geographical visualization of critical infrastructure</li>
        </ul>
      </section>

      <section className="news-snippets-section">
        <h2>📺 Recent Disaster News</h2>
        <div className="videos-container">
          {videoSnippets.map((item, index) => (
            <div className="video-card" key={index}>
              <iframe
                src={item.videoUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="quote">🗨️ {item.quote}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
