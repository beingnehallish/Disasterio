import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  title: String,
  applicableDisaster: [String],
  stakeholderIds: [String],
  SOPs: [
    {
      stepNumber: Number,
      action: String,
      responsibleStakeholderId: String,
      timeline: String
    }
  ],
  lastUpdated: Date,
  status: String
});

export default mongoose.model('Plan', planSchema);