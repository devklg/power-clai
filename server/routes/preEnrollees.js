const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const PreEnrollee = require('../models/PreEnrollee');
const Promoter = require('../models/Promoter');

// @route   POST api/pre-enrollees
// @desc    Create a new pre-enrollee
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('enrollerIdNumber', 'Enroller ID is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if email already exists
      const existingUser = await PreEnrollee.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ msg: 'Email already registered' });
      }

      // Find the enroller
      const enroller = await Promoter.findOne({ promoterId: req.body.enrollerIdNumber });
      if (!enroller) {
        return res.status(404).json({ msg: 'Enroller not found' });
      }

      // Get position number (would be sequential in production)
      const count = await PreEnrollee.countDocuments();
      const positionNumber = 1000 + count;

      const newPreEnrollee = new PreEnrollee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        preferredPackage: req.body.preferredPackage || 'undecided',
        enrollerId: enroller._id,
        enrollerIdNumber: req.body.enrollerIdNumber,
        positionNumber
      });

      const preEnrollee = await newPreEnrollee.save();
      res.json(preEnrollee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/pre-enrollees
// @desc    Get all pre-enrollees
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    const preEnrollees = await PreEnrollee.find().sort({ createdAt: -1 });
    res.json(preEnrollees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/pre-enrollees/me
// @desc    Get current user's pre-enrollee status
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Find pre-enrollee by user ID (requires linking user to pre-enrollee)
    const preEnrollee = await PreEnrollee.findOne({ email: req.user.email });
    
    if (!preEnrollee) {
      return res.status(404).json({ msg: 'Pre-enrollee record not found' });
    }

    res.json(preEnrollee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/pre-enrollees/:id
// @desc    Get pre-enrollee by ID
// @access  Private (Admin or Enroller)
router.get('/:id', auth, async (req, res) => {
  try {
    const preEnrollee = await PreEnrollee.findById(req.params.id);
    
    if (!preEnrollee) {
      return res.status(404).json({ msg: 'Pre-enrollee not found' });
    }

    // Check if user is admin or the enroller
    const promoter = await Promoter.findOne({ userId: req.user.id });
    if (req.user.role !== 'admin' && (!promoter || preEnrollee.enrollerId.toString() !== promoter._id.toString())) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    res.json(preEnrollee);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pre-enrollee not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/pre-enrollees/recent
// @desc    Get recent pre-enrollees
// @access  Public
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const preEnrollees = await PreEnrollee.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('firstName lastName preferredPackage createdAt');
    
    res.json(preEnrollees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/pre-enrollees/count
// @desc    Get total count of pre-enrollees
// @access  Public
router.get('/count', async (req, res) => {
  try {
    const count = await PreEnrollee.countDocuments({ status: 'active' });
    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/pre-enrollees/:id/convert
// @desc    Convert pre-enrollee to promoter
// @access  Private
router.put('/:id/convert', auth, async (req, res) => {
  try {
    const preEnrollee = await PreEnrollee.findById(req.params.id);
    
    if (!preEnrollee) {
      return res.status(404).json({ msg: 'Pre-enrollee not found' });
    }

    // Verify this is the user's own pre-enrollee record or admin
    if (req.user.role !== 'admin' && preEnrollee.email !== req.user.email) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    // Validate required fields for conversion
    const { package, address } = req.body;
    if (!package || !address) {
      return res.status(400).json({ msg: 'Package and address are required' });
    }

    // Update pre-enrollee status
    preEnrollee.status = 'converted';
    await preEnrollee.save();

    // Logic to create a new promoter would go here
    // This would include creating a promoter record and updating user role

    res.json({ msg: 'Pre-enrollee converted to promoter' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
