import Assessment from '../models/Assessment.js';

export const getAllAssessments = async (req, res) => {
  const data = await Assessment.find();
  res.json(data);
};

export const createAssessment = async (req, res) => {
  const newAssessment = new Assessment(req.body);
  await newAssessment.save();
  res.status(201).json(newAssessment);
};
