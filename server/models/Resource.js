import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  unit: String,
  availabilityStatus: String,
  ownerStakeholderId: String,
  location: {
    lat: Number,
    lng: Number
  },
  lastUpdated: Date
});

export default mongoose.model('Resource', resourceSchema);