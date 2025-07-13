import mongoose from 'mongoose';

const stakeholderSchema = new mongoose.Schema({
  name: String,
  type: String,
  email: String,
  phone: String,
  address: String,
  location: {
    lat: Number,
    lng: Number
  },
  role: String,
  description: String
});

export default mongoose.model('Stakeholder', stakeholderSchema);