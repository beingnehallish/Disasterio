import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import stakeholderRoutes from './routes/stakeholderRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import planRoutes from './routes/planRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import geoRoutes from './routes/geoRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stakeholders', stakeholderRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/geofeatures', geoRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));