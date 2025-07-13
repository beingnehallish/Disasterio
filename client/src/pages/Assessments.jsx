import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../styles/assessments.css';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const Assessments = () => {
   const navigate = useNavigate();
  const [assessments, setAssessments] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedStates, setExpandedStates] = useState({});

  const [popChartData, setPopChartData] = useState(null);
  const [needsChartData, setNeedsChartData] = useState(null);
  const [infraChartData, setInfraChartData] = useState(null);

  const toggleState = useCallback((stateName) => {
    setExpandedStates((prev) => ({
      ...prev,
      [stateName]: !prev[stateName]
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/assessments');
        const grouped = {};

        const statePop = {};
        const needsCount = {};
        const infraSeverity = { Low: 0, Moderate: 0, High: 0 };

        res.data.forEach((a) => {
          const state = a.areaAssessed?.split(',').pop().trim() || 'Unknown';
          if (!grouped[state]) grouped[state] = [];
          grouped[state].push(a);

          const total = a.affectedPopulation?.total || 0;
          statePop[state] = (statePop[state] || 0) + total;

          (a.urgentNeeds || []).forEach((need) => {
            needsCount[need] = (needsCount[need] || 0) + 1;
          });

          (a.infrastructureDamages || []).forEach((d) => {
            const sev = d.severity || 'Unknown';
            infraSeverity[sev] = (infraSeverity[sev] || 0) + 1;
          });
        });

        setAssessments(grouped);
        setLoading(false);

        setPopChartData({
          labels: Object.keys(statePop),
          datasets: [{
            label: 'Affected Population',
            data: Object.values(statePop),
            backgroundColor: '#72A0C1'
          }]
        });

        setNeedsChartData({
          labels: Object.keys(needsCount),
          datasets: [{
            label: 'Urgent Needs',
            data: Object.values(needsCount),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ]
          }]
        });

        setInfraChartData({
          labels: Object.keys(infraSeverity),
          datasets: [{
            label: 'Infrastructure Damage Severity',
            data: Object.values(infraSeverity),
            backgroundColor: ['#34A853', '#FBBC05', '#EA4335']
          }]
        });

      } catch (err) {
        console.error('Error fetching assessments:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="assessment-page">
       <button className="back-button" onClick={() => navigate('/home')}>
        ← Back
      </button>
      <h2>State-wise Assessment Toolkit</h2>
      {loading && <div className="loading">Loading Assessments...</div>}

      {!loading && (
        <>
          <div className="charts-container">
            <div className="chart-box">
              <h3>Affected Population by State</h3>
              {popChartData && <Bar data={popChartData} />}
            </div>

            <div className="chart-box">
              <h3>Urgent Needs Distribution</h3>
              {needsChartData && <Pie data={needsChartData} />}
            </div>

            <div className="chart-box">
              <h3>Infrastructure Damage Severity</h3>
              {infraChartData && <Doughnut data={infraChartData} />}
            </div>
          </div>

          {Object.keys(assessments).map((state, idx) => (
            <div key={idx} className="state-section">
              <div className="state-header" onClick={() => toggleState(state)}>
                <div className="state-info">
                  <img
                    src={`/assets/states/${state.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={state}
                    className="state-logo"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <h3>{state}</h3>
                </div>
                <span className="dropdown-arrow">
                  {expandedStates[state] ? '▲' : '▼'}
                </span>
              </div>

              {expandedStates[state] && (
                <div className="assessment-cards">
                  {assessments[state].map((a, index) => (
                    <div key={index} className="assessment-card">
                      <p><strong>Area:</strong> {a.areaAssessed || 'N/A'}</p>
                      <p><strong>Date:</strong> {a.timestamp ? new Date(a.timestamp).toLocaleDateString() : 'Unknown'}</p>
                      <p><strong>Affected:</strong> {a.affectedPopulation?.total ?? 'N/A'} |
                        Injured: {a.affectedPopulation?.injured ?? 'N/A'} |
                        Displaced: {a.affectedPopulation?.displaced ?? 'N/A'}</p>
                      <p><strong>Urgent Needs:</strong> {Array.isArray(a.urgentNeeds) && a.urgentNeeds.length > 0 ? a.urgentNeeds.join(', ') : 'None'}</p>
                      <p><strong>Infrastructure Damage:</strong></p>
                      <ul>
                        {Array.isArray(a.infrastructureDamages) && a.infrastructureDamages.length > 0
                          ? a.infrastructureDamages.map((d, i) => (
                            <li key={i}><strong>{d.type}</strong> - {d.severity} ({d.notes})</li>
                          ))
                          : <li>No damages reported</li>}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Assessments;
