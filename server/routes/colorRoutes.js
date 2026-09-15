const express = require('express');
const { ColorRepository } = require('../models/Color');
const { requireAdmin } = require('../middleware/auth');
const { colors: defaultColors } = require('../seed/seedData');

const router = express.Router();

// Get all colors (supports query params: category, brand, popular, search)
router.get('/', async (req, res) => {
  try {
    const colors = await ColorRepository.findAll(req.query);
    res.json(colors);
  } catch (err) {
    console.error('Error fetching colors:', err);
    res.status(500).json({ message: 'Error retrieving colors' });
  }
});

// Get color metadata: available categories & brands
router.get('/meta/categories', async (req, res) => {
  try {
    const colors = await ColorRepository.findAll();
    const categories = Array.from(new Set(colors.map(c => c.category))).sort();
    const brands = Array.from(new Set(colors.map(c => c.brand))).sort();
    res.json({ categories, brands });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving categories' });
  }
});

// Get single color by ID or code
router.get('/:id', async (req, res) => {
  try {
    const color = await ColorRepository.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json(color);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving color' });
  }
});

// Admin: Add new paint color
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { code, name, hex, rgb, brand, category, finishOptions, popular, tags } = req.body;
    if (!name || !hex || !brand || !category) {
      return res.status(400).json({ message: 'Name, hex, brand, and category are required' });
    }

    const newCode = code || 'CLR-' + Math.floor(100 + Math.random() * 900);
    const color = await ColorRepository.create({
      code: newCode,
      name,
      hex: hex.startsWith('#') ? hex : '#' + hex,
      rgb: rgb || '0, 0, 0',
      brand,
      category,
      finishOptions: finishOptions || ['matte', 'satin'],
      popular: !!popular,
      tags: tags || []
    });

    res.status(201).json({ message: 'Color shade added successfully', color });
  } catch (err) {
    console.error('Add color error:', err);
    res.status(500).json({ message: 'Error adding color shade' });
  }
});

// Admin: Update existing paint color
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updated = await ColorRepository.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json({ message: 'Color updated successfully', color: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating color' });
  }
});

// Admin: Delete paint color
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const removed = await ColorRepository.delete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json({ message: 'Color deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting color' });
  }
});

// Reset / reload seed shades
router.post('/admin/reset-seed', requireAdmin, async (req, res) => {
  try {
    for (const item of defaultColors) {
      const exists = await ColorRepository.findById(item.code);
      if (!exists) {
        await ColorRepository.create(item);
      }
    }
    res.json({ message: 'Color catalog refreshed with default shades' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting seed' });
  }
});

module.exports = router;
