import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  id: {
    type: BigInt,
    required: true,
    unique: true
  },
  project: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

export default Analytics;
