import express from 'express';
import { getAllStakeholders, createStakeholder } from '../controllers/stakeholderController.js';

const router = express.Router();

router.get('/', getAllStakeholders);
router.post('/', createStakeholder);

export default router;