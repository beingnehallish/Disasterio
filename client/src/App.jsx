import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Resources from './pages/Resources';
import Alerts from './pages/Alerts';
import Plans from './pages/Plans';
import Incidents from './pages/Incidents';
import Assessments from './pages/Assessments';
import GeoFeatures from './pages/GeoFeatures';
import Stakeholders from './pages/Stakeholders';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/stakeholders" element={<Stakeholders />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/emergency-plans" element={<Plans />} />
      <Route path="/incident-management" element={<Incidents />} />
      <Route path="/assessment-toolkit" element={<Assessments />} />
      <Route path="/geographical-features" element={<GeoFeatures />} />
      <Route path="/dashboards" element={<Dashboard />} />
      <Route
        path="*"
        element={
          <h2 style={{ color: 'white', textAlign: 'center' }}>
            404 - Page Not Found
          </h2>
        }
      />
    </Routes>
  );
}

export default App;
