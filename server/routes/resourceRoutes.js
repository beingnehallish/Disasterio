import express from 'express';
import { getAllResources, createResource } from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', getAllResources);
router.post('/', createResource);

export default router;