// src/data/features.js or features.jsx
import { FaUsers, FaBoxOpen, FaBell, FaFileAlt, FaFire, FaTools, FaMapMarkedAlt } from 'react-icons/fa';

export const features = [
  { title: 'Stakeholders', icon: <FaUsers size={32} />, path: '/stakeholders' },
  { title: 'Resources', icon: <FaBoxOpen size={32} />, path: '/resources' },
  { title: 'Alerts', icon: <FaBell size={32} />, path: '/alerts' },
  { title: 'Emergency Plans', icon: <FaFileAlt size={32} />, path: '/emergency-plans' },
  { title: 'Incident Management', icon: <FaFire size={32} />, path: '/incident-management' },
  { title: 'Assessment Toolkit', icon: <FaTools size={32} />, path: '/assessment-toolkit' },
  { title: 'Geographical Features', icon: <FaMapMarkedAlt size={32} />, path: '/geographical-features' },
  { title: 'Dashboards', icon: <FaFileAlt size={32} />, path: '/dashboards' }
];
