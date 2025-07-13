import React from 'react';
import ImageSlider from '../components/ImageSlider';
import '../styles/landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Disasterio</h1>
      <p className="landing-tagline">Collaboration for Resilient Disaster Management</p>

      <ImageSlider />

      <div className="get-started-btn-wrapper">
        <a href="/home">
          <button className="get-started-btn">Get Started</button>
        </a>
      </div>
    </div>
  );
};

export default Landing;
