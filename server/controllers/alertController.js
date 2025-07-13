import Alert from '../models/Alert.js';

export const getAllAlerts = async (req, res) => {
  const data = await Alert.find();
  res.json(data);
};

export const createAlert = async (req, res) => {
  const newAlert = new Alert(req.body);
  await newAlert.save();
  res.status(201).json(newAlert);
};
