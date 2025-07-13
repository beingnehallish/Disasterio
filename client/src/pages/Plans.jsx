import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/feature.css';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get('/api/plans');
        setPlans(res.data);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="center-text">Loading Emergency Plans...</div>;
  }

  if (plans.length === 0) {
    return <div className="center-text">No Emergency Plans found.</div>;
  }

  return (
    <div className="feature-page">
  
      <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>

      <h2 className="page-title">Emergency Plans & Guidelines</h2>
      <div id="clock" className="current-time">{currentTime}</div>
    {/* Floating Info Box with PDF Links */}
<aside className="explore-box">
  <h4>Explore.<br></br> The more you know, the better.</h4><br></br>
  <ul>
    <li><a href="https://mohfw.gov.in/sites/default/files/Provider%20Course%20Manual%20for%20Paramedics.pdf" download target="_blank" rel="noopener noreferrer">📗 Paramedic Provider Course Manual</a></li><hr></hr>
    <li><a href="https://www.niti.gov.in/sites/default/files/2023-02/AIIMS_STUDY_2_0.pdf" download target="_blank" rel="noopener noreferrer">📗 AIIMS Emergency Response Study</a></li><hr></hr>
    <li><a href="https://nhsrcindia.org/sites/default/files/2021-07/Emergency%20OGs%20at%20HWC.pdf" download target="_blank" rel="noopener noreferrer">📗 Operational Guidelines for Emergency Care at HWCs</a></li><hr></hr>
    <li><a href="https://www.mha.gov.in/sites/default/files/2022-08/NERSGuideline_2100815%5B1%5D.pdf" download target="_blank" rel="noopener noreferrer">📗 National Emergency Response Guidelines (NERS)</a></li>
  </ul>
</aside>

      <aside className="grievance-box">
        📞 Call this number for any grievance or enquiry: <strong>112</strong>
      </aside>

      {plans.map((plan, index) => (
        <div className="plan-card" key={index}>
          <h3>{plan.title}</h3>
          <p><strong>Status:</strong> {plan.status}</p>
          <p><strong>Last Updated:</strong> {new Date(plan.lastUpdated).toLocaleDateString()}</p>
          <p><strong>Applicable Disasters:</strong> {plan.applicableDisaster.join(', ')}</p>

          <div className="sop-section">
            <h4>SOPs:</h4>
            {plan.SOPs && plan.SOPs.length > 0 ? (
              <ul>
                {plan.SOPs.map((sop, i) => (
                  <li key={i}>
                    <strong>Step {sop.stepNumber}:</strong> {sop.action}<br />
                    <strong>Responsible Stakeholder:</strong> {sop.responsibleStakeholderId}<br />
                    <strong>Timeline:</strong> {sop.timeline}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No SOPs provided.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plans;
