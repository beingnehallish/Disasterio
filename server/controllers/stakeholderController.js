import Stakeholder from '../models/Stakeholder.js';

export const getAllStakeholders = async (req, res) => {
  const data = await Stakeholder.find();
  res.json(data);
};

export const createStakeholder = async (req, res) => {
  const newStakeholder = new Stakeholder(req.body);
  await newStakeholder.save();
  res.status(201).json(newStakeholder);
};