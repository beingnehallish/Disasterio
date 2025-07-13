import express from 'express';
import { getAllIncidents, createIncident } from '../controllers/incidentController.js';

const router = express.Router();

router.get('/', getAllIncidents);
router.post('/', createIncident);

export default router;

