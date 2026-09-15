const express = require('express');
const { PatternRepository } = require('../models/Pattern');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all patterns (optionally filtered by category)
router.get('/', async (req, res) => {
  try {
    const patterns = await PatternRepository.findAll(req.query.category);
    res.json(patterns);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patterns' });
  }
});

// Get single pattern
router.get('/:id', async (req, res) => {
  try {
    const pattern = await PatternRepository.findById(req.params.id);
    if (!pattern) {
      return res.status(404).json({ message: 'Pattern not found' });
    }
    res.json(pattern);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving pattern' });
  }
});

// Admin: Add new pattern
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { code, name, category, style, description, type, scale, blendMode, svgPattern } = req.body;
    if (!name || !category || !svgPattern) {
      return res.status(400).json({ message: 'Name, category, and svgPattern are required' });
    }

    const newCode = code || 'PAT-' + Math.floor(100 + Math.random() * 900);
    const pattern = await PatternRepository.create({
      code: newCode,
      name,
      category,
      style: style || 'Modern',
      description: description || '',
      type: type || 'geometric',
      scale: scale || 30,
      blendMode: blendMode || 'multiply',
      svgPattern
    });

    res.status(201).json({ message: 'Pattern created successfully', pattern });
  } catch (err) {
    res.status(500).json({ message: 'Error creating pattern' });
  }
});

// Admin: Delete pattern
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const removed = await PatternRepository.delete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: 'Pattern not found' });
    }
    res.json({ message: 'Pattern deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting pattern' });
  }
});

module.exports = router;
