import GeoFeature from '../models/GeoFeature.js';

export const getAllGeoFeatures = async (req, res) => {
  const data = await GeoFeature.find();
  res.json(data);
};

export const createGeoFeature = async (req, res) => {
  const newFeature = new GeoFeature(req.body);
  await newFeature.save();
  res.status(201).json(newFeature);
};

