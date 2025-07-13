import express from 'express';
import { getAllAssessments, createAssessment } from '../controllers/assessmentController.js';

const router = express.Router();

router.get('/', getAllAssessments);
router.post('/', createAssessment);

export default router;