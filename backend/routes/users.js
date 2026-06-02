const express = require('express');
const User = require('../models/User');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Get profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('enrolledCourses.courseId', 'title thumbnail')
      .populate('purchasedCourses.courseId', 'title thumbnail');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// Update profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phone, bio, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, lastName, phone, bio, profileImage, updatedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
});

// Dashboard
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({
      totalEnrollments: user.enrolledCourses.length,
      totalPurchases: user.purchasedCourses.length,
      totalSpent: user.purchasedCourses.reduce((sum, p) => sum + p.amount, 0),
      recentCourses: user.enrolledCourses.slice(-5)
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// All users (Admin)
router.get('/admin/all-users', authorizeAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    let filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const users = await User.find(filter).skip(skip).limit(Number(limit)).select('-password');
    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// Enrolled courses
router.get('/courses/enrolled', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('enrolledCourses.courseId');
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// Purchased courses
router.get('/courses/purchased', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('purchasedCourses.courseId');
    res.json(user.purchasedCourses);
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// Deactivate user (Admin)
router.put('/:userId/deactivate', authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isActive: false }, { new: true });
    res.json({ message: 'User deactivated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// Activate user (Admin)
router.put('/:userId/activate', authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isActive: true }, { new: true });
    res.json({ message: 'User activated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

module.exports = router;
