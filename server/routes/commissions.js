const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Promoter = require('../models/Promoter');

// Define a Commission schema if not already defined
const mongoose = require('mongoose');
const CommissionSchema = new mongoose.Schema({
  promoterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promoter',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Fast Start Bonus', 'Team Commission', 'Mega Matching Bonus', 'Rank Advancement Bonus', 'Leadership Pool'],
    required: true
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Commission = mongoose.model('Commission', CommissionSchema);

// @route   POST api/commissions
// @desc    Create a manual commission entry
// @access  Private (Admin only)
router.post('/', [
  auth,
  [
    check('promoterId', 'Promoter ID is required').not().isEmpty(),
    check('amount', 'Amount is required').isNumeric(),
    check('type', 'Commission type is required').isIn([
      'Fast Start Bonus', 
      'Team Commission', 
      'Mega Matching Bonus', 
      'Rank Advancement Bonus', 
      'Leadership Pool'
    ])
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if user is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    const { promoterId, amount, type, notes } = req.body;

    // Check if promoter exists
    const promoter = await Promoter.findById(promoterId);
    if (!promoter) {
      return res.status(404).json({ msg: 'Promoter not found' });
    }

    // Create new commission entry
    const newCommission = new Commission({
      promoterId,
      amount,
      type,
      notes
    });

    // Save commission
    const commission = await newCommission.save();

    // Update promoter's total earnings
    await Promoter.findByIdAndUpdate(promoterId, {
      $inc: { totalEarnings: amount }
    });

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.emit('commission_update', {
        promoterId,
        amount,
        type,
        timestamp: new Date()
      });

      // Also send private notification to the promoter
      io.to(promoter.userId.toString()).emit('new_commission', {
        amount,
        type,
        timestamp: new Date()
      });
    }

    res.json(commission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/commissions
// @desc    Get all commissions (admin) or user's commissions
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let commissions;
    
    if (req.user.role === 'admin') {
      // Admins can see all commissions
      commissions = await Commission.find()
        .sort({ date: -1 })
        .populate('promoterId', 'firstName lastName promoterId');
    } else {
      // Regular users can only see their own commissions
      const promoter = await Promoter.findOne({ userId: req.user.id });
      
      if (!promoter) {
        return res.status(404).json({ msg: 'Promoter not found' });
      }
      
      commissions = await Commission.find({ promoterId: promoter._id })
        .sort({ date: -1 });
    }
    
    res.json(commissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/commissions/stats
// @desc    Get commission statistics for a promoter
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // Find the promoter
    const promoter = await Promoter.findOne({ userId: req.user.id });
    
    if (!promoter) {
      return res.status(404).json({ msg: 'Promoter not found' });
    }
    
    // Get all commissions for this promoter
    const commissions = await Commission.find({ promoterId: promoter._id });
    
    // Calculate stats
    const stats = {
      totalEarnings: promoter.totalEarnings,
      thisWeek: 0,
      thisMonth: 0,
      byType: {
        'Fast Start Bonus': 0,
        'Team Commission': 0,
        'Mega Matching Bonus': 0,
        'Rank Advancement Bonus': 0,
        'Leadership Pool': 0
      }
    };
    
    // Get current date info
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);
    
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Calculate stats from commissions
    commissions.forEach(commission => {
      const commissionDate = new Date(commission.date);
      
      // This week
      if (commissionDate >= startOfWeek) {
        stats.thisWeek += commission.amount;
      }
      
      // This month
      if (commissionDate >= startOfMonth) {
        stats.thisMonth += commission.amount;
      }
      
      // By type
      stats.byType[commission.type] += commission.amount;
    });
    
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/commissions/:id
// @desc    Get commission by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id)
      .populate('promoterId', 'firstName lastName promoterId');
    
    if (!commission) {
      return res.status(404).json({ msg: 'Commission not found' });
    }
    
    // Check if user is admin or the commission belongs to them
    const isAdmin = req.user.role === 'admin';
    const promoter = await Promoter.findOne({ userId: req.user.id });
    const isOwner = promoter && commission.promoterId.equals(promoter._id);
    
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    res.json(commission);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Commission not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;