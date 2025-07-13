import mongoose from 'mongoose';

const geoFeatureSchema = new mongoose.Schema({
  name: String,
  featureType: String,
  geometry: Object,
  attributes: {
    owner: String,
    condition: String,
    populationDensity: Number,
    criticalInfrastructure: Boolean
  }
});

export default mongoose.model('GeoFeature', geoFeatureSchema);
