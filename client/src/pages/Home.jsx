import React from 'react';
import { features } from '../data/features.jsx';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Our features solely aim to aid you.</h1><hr></hr>
      <div className="features-grid">
        {features.map((feature, index) => (
          <a key={index} href={feature.path} className="feature-card">
            {feature.icon}
            <span>{feature.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
