import express from 'express';
import { getAllPlans, createPlan } from '../controllers/planController.js';

const router = express.Router();

router.get('/', getAllPlans);
router.post('/', createPlan);

export default router;

