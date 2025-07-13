# 🌐 DisasterIO – Smart Disaster Response & Relief Platform

_DisasterIO is an intelligent, location-aware disaster response and management platform built with the MERN stack (MongoDB, Express, React, Node.js)._

It enables real-time tracking of incidents, resource management, stakeholder coordination, emergency planning, and state-wise assessments – all visualized on interactive maps with a modern UI.

---

## 🚀 Features

### 🧑‍🤝‍ Stakeholders
- View cards of municipal bodies, organizations, individuals & agencies
- Filter by state
- Contact information and geo-location

### 🏥 Resources
- Filter supplies by categories (e.g., healthcare, food, shelters)
- Detect user’s location and show resources in their state
- Display real-time resource availability

### 🔔 Alerts
- Latest disaster predictions and news
- Severity indicators and live links to trusted news sources
- Card-based UI for emergency notifications

### 📄 Emergency Plans
- Guidelines and SOPs issued by stakeholders
- Role-wise responsibilities, timelines, and plan status
- Long-card layout for better readability

### 🧯 Incident Management
- Show incidents within 10km radius of user's location
- Interactive map view with markers and heatmap
- Horizontal cards + popup descriptions on map click

### 🧮 Assessment Toolkit
- State-wise assessment cards
- Summary of affected population, damage, and urgent needs
- Circular state logos + data charts for visualization

### 🗺️ Geographical Features
- Full-screen Leaflet map showing roads, hospitals, shelters, high-rise buildings, etc.
- Custom markers and a dropdown legend with symbols
- Real-time geo-layer toggling

### 📊 Dashboard
- Overview of system goals and features
- Embedded videos and real-world disaster quotes
- Visual summary of incidents, stakeholders, resources, and alerts
  
---
LANDING PAGE

https://github.com/user-attachments/assets/d912fc81-a5e5-4ef7-a73b-69b0c014f597

HOME PAGE

https://github.com/user-attachments/assets/736baea5-64f6-4807-8e63-29b1b87eed53

STAKEHOLDERS

https://github.com/user-attachments/assets/fdde6694-6326-4a8c-9313-4ce43fad2bc7

RESOURCES

https://github.com/user-attachments/assets/87f160f4-f4ca-46cf-9573-a957b3e17676

ALERTS

https://github.com/user-attachments/assets/a1a31f50-978c-4c2d-8514-4f821f5b1a33

EMERGENCY PLANS

https://github.com/user-attachments/assets/e819b2d0-2f89-41eb-8601-81b7045f6b3d

INCIDENT MANAGEMENT

https://github.com/user-attachments/assets/3f1de84f-008d-4420-9c30-95b881d6c0e0

STATE-WISE ASSESSMENT TOOLKIT

https://github.com/user-attachments/assets/c0288cb5-2ca0-47a2-a581-37b5387e694f

GEOGRAPHICAL FEATURES

https://github.com/user-attachments/assets/bc8bf0ce-83d6-47b4-9b4d-533a05071970

DASHBOARD
<img width="1887" height="898" alt="image" src="https://github.com/user-attachments/assets/2241643b-b299-41dc-9209-3828f1852489" />


## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), CSS, Axios, Leaflet.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Visualization**: Leaflet.js, Leaflet.heat, GeoJSON

---

## 🗃 Folder Structure
DisasterIO/
├── client/ # React frontend
│ ├── pages/
│ ├── components/
│ ├── styles/
│ └── main.jsx
├── server/ # Node.js backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

### 📌 Prerequisites
- Node.js ≥ 16
- MongoDB instance (local or Atlas)
- Vite (recommended) or CRA

---

### 🖥️ Local Setup

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/DisasterIO.git
cd DisasterIO

