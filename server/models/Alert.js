import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  source: String,
  target: String,
  location: {
    lat: Number,
    lng: Number
  },
  timestamp: Date,
  severity: String
});

export default mongoose.model('Alert', alertSchema);