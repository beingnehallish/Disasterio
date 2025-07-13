import Incident from '../models/Incident.js';

export const getAllIncidents = async (req, res) => {
  const data = await Incident.find();
  res.json(data);
};

export const createIncident = async (req, res) => {
  const newIncident = new Incident(req.body);
  await newIncident.save();
  res.status(201).json(newIncident);
};
