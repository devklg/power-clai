const mongoose = require('mongoose');

const PreEnrolleeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  preferredPackage: {
    type: String,
    enum: ['undecided', 'starter', 'elite', 'pro'],
    default: 'undecided'
  },
  enrollerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promoter'
  },
  enrollerIdNumber: {
    type: String,
    required: true
  },
  positionNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'converted', 'declined'],
    default: 'active'
  },
  decisionDeadline: {
    type: Date,
    required: true,
    default: function() {
      const now = new Date();
      return new Date(now.setDate(now.getDate() + 7));
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PreEnrollee', PreEnrolleeSchema);
