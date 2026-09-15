const express = require('express');
const { ProjectRepository } = require('../models/Project');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { sampleRooms } = require('../seed/seedData');
const { getFallbackStore, saveFallbackStore } = require('../config/db');

const router = express.Router();

// Get sample rooms for instant preview
router.get('/samples/rooms', (req, res) => {
  res.json(sampleRooms);
});

// Get user projects
router.get('/', requireAuth, async (req, res) => {
  try {
    const projects = await ProjectRepository.findByUser(req.user.id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user projects' });
  }
});

// Get single project
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const project = await ProjectRepository.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving project' });
  }
});

// Save new project
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, roomType, originalImage, previewImage, walls, dualTone, notes } = req.body;
    if (!originalImage) {
      return res.status(400).json({ message: 'Original room image is required' });
    }

    const project = await ProjectRepository.create({
      userId: req.user.id,
      title: title || 'My Wall Design',
      roomType: roomType || 'Living Room',
      originalImage,
      previewImage: previewImage || originalImage,
      walls: walls || [],
      dualTone: dualTone || { enabled: false },
      notes: notes || ''
    });

    // Increment global preview count stat
    const store = getFallbackStore();
    if (store.stats) {
      store.stats.totalPreviewsGenerated = (store.stats.totalPreviewsGenerated || 0) + 1;
      saveFallbackStore();
    }

    res.status(201).json({ message: 'Project saved successfully', project });
  } catch (err) {
    console.error('Save project error:', err);
    res.status(500).json({ message: 'Error saving room project' });
  }
});

// Update project
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await ProjectRepository.update(req.params.id, req.user.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }
    res.json({ message: 'Project updated successfully', project: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

// Delete project
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const removed = await ProjectRepository.delete(req.params.id, req.user.id);
    if (!removed) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

module.exports = router;
