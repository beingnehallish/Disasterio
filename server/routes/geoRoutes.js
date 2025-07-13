import express from 'express';
import { getAllGeoFeatures, createGeoFeature } from '../controllers/geoController.js';

const router = express.Router();

router.get('/', getAllGeoFeatures);
router.post('/', createGeoFeature);

export default router;
