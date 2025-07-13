import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  incidentId: String,
  areaAssessed: String,
  timestamp: Date,
  affectedPopulation: {
    total: Number,
    injured: Number,
    displaced: Number
  },
  infrastructureDamages: [
    {
      type: String,
      severity: String,
      notes: String
    }
  ],
  urgentNeeds: [String],
  assessorId: String
});

export default mongoose.model('Assessment', assessmentSchema);