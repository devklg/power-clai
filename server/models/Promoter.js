const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PromoterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  promoterId: {
    type: String,
    required: true,
    unique: true
  },
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
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  package: {
    type: String,
    enum: ['starter', 'elite', 'pro'],
    required: true
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
    type: Number
  },
  leftTeam: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promoter'
  }],
  rightTeam: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promoter'
  }],
  leftTeamVolume: {
    type: Number,
    default: 0
  },
  rightTeamVolume: {
    type: Number,
    default: 0
  },
  personalReferrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promoter'
  }],
  totalEarnings: {
    type: Number,
    default: 0
  },
  rank: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', '1 Star', '2 Star', '3 Star', 'Diamond', 'Double Diamond', 'Triple Diamond', 'Diamond Elite', 'Blue Diamond'],
    default: 'Bronze'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Promoter', PromoterSchema);
