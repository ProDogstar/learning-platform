const express = require('express');
const Progress = require('../models/Progress');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Track progress
router.post('/track', authenticate, async (req, res) => {
  try {
    const { courseId, videoId, duration, currentTime } = req.body;
    const userId = req.user.userId;

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({
        userId, courseId, watchedVideos: [],
        totalVideos: 0, videosWatched: 0
      });
    }

    const watchedVideoIndex = progress.watchedVideos.findIndex(v => v.videoId === videoId);

    if (watchedVideoIndex >= 0) {
      progress.watchedVideos[watchedVideoIndex] = {
        videoId, watchedAt: new Date(), duration, currentTime
      };
    } else {
      progress.watchedVideos.push({
        videoId, watchedAt: new Date(), duration, currentTime
      });
      progress.videosWatched += 1;
    }

    if (progress.totalVideos > 0) {
      progress.completionPercentage = Math.round((progress.videosWatched / progress.totalVideos) * 100);
    }

    if (progress.videosWatched === progress.totalVideos && progress.totalVideos > 0) {
      progress.isCompleted = true;
      progress.status = 'completed';
      progress.completionDate = new Date();
    } else if (progress.videosWatched > 0) {
      progress.status = 'in_progress';
    }

    progress.lastAccessedAt = new Date();
    await progress.save();

    res.json({ message: 'Progress tracked', progress });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// Get progress
router.get('/:courseId', authenticate, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user.userId, courseId: req.params.courseId
    });

    if (!progress) {
      return res.json({ videosWatched: 0, completionPercentage: 0, status: 'not_started', watchedVideos: [] });
    }

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// All progress
router.get('/', authenticate, async (req, res) => {
  try {
    const progressData = await Progress.find({ userId: req.user.userId })
      .populate('courseId', 'title thumbnail').sort({ lastAccessedAt: -1 });
    res.json(progressData);
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

// Mark complete
router.put('/:courseId/complete', authenticate, async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.userId, courseId: req.params.courseId },
      { isCompleted: true, status: 'completed', completionDate: new Date() },
      { new: true }
    );
    res.json({ message: 'Course complete', progress });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
});

module.exports = router;
