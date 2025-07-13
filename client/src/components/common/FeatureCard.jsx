import React from 'react';
import '../../styles/featureCards.css';

const FeatureCard = ({ icon, title, onClick }) => {
  return (
    <div className="feature-card" onClick={onClick}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
    </div>
  );
};

export default FeatureCard;