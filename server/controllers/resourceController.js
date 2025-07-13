import Resource from '../models/Resource.js';

export const getAllResources = async (req, res) => {
  const data = await Resource.find();
  res.json(data);
};

export const createResource = async (req, res) => {
  const newResource = new Resource(req.body);
  await newResource.save();
  res.status(201).json(newResource);
};
