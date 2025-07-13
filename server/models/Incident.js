import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  title: String,
  type: String,
  reportedBy: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: String,
  impactSummary: String,
  assessments: [String],
  resourcesAssigned: [String],
  stakeholderInvolved: [String],
  timestamp: Date
});

export default mongoose.model('Incident', incidentSchema);