import Plan from '../models/Plan.js';

export const getAllPlans = async (req, res) => {
  const data = await Plan.find();
  res.json(data);
};

export const createPlan = async (req, res) => {
  const newPlan = new Plan(req.body);
  await newPlan.save();
  res.status(201).json(newPlan);
};
