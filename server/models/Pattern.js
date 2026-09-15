const mongoose = require('mongoose');
const { isMongooseConnected, getFallbackStore, saveFallbackStore } = require('../config/db');
const { patterns: defaultPatterns } = require('../seed/seedData');

const PatternSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  style: { type: String, default: 'Modern' },
  description: { type: String },
  type: { type: String, default: 'geometric' },
  scale: { type: Number, default: 30 },
  blendMode: { type: String, default: 'multiply' },
  svgPattern: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const MongoosePattern = mongoose.models.Pattern || mongoose.model('Pattern', PatternSchema);

const PatternRepository = {
  async initSeed() {
    if (isMongooseConnected()) {
      const count = await MongoosePattern.countDocuments();
      if (count === 0) {
        console.log('[Seed] Seeding default patterns into MongoDB...');
        await MongoosePattern.insertMany(defaultPatterns);
      }
    } else {
      const store = getFallbackStore();
      if (!store.patterns || store.patterns.length === 0) {
        console.log('[Seed] Seeding default patterns into Fallback Store...');
        store.patterns = defaultPatterns.map((p, i) => ({
          _id: 'pat_' + (i + 1).toString().padStart(4, '0'),
          ...p,
          createdAt: new Date().toISOString()
        }));
        saveFallbackStore();
      }
    }
  },

  async findAll(category) {
    if (isMongooseConnected()) {
      const filter = category && category !== 'All' ? { category } : {};
      return await MongoosePattern.find(filter);
    }
    const store = getFallbackStore();
    let list = [...(store.patterns || [])];
    if (category && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  },

  async findById(id) {
    if (isMongooseConnected()) {
      return await MongoosePattern.findById(id);
    }
    const store = getFallbackStore();
    return store.patterns.find(p => (p._id || p.id) === id || p.code === id) || null;
  },

  async create(data) {
    if (isMongooseConnected()) {
      const pattern = new MongoosePattern(data);
      return await pattern.save();
    }
    const store = getFallbackStore();
    const newPattern = {
      _id: 'pat_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    store.patterns.push(newPattern);
    saveFallbackStore();
    return newPattern;
  },

  async delete(id) {
    if (isMongooseConnected()) {
      return await MongoosePattern.findByIdAndDelete(id);
    }
    const store = getFallbackStore();
    const idx = store.patterns.findIndex(p => (p._id || p.id) === id || p.code === id);
    if (idx === -1) return null;
    const removed = store.patterns.splice(idx, 1)[0];
    saveFallbackStore();
    return removed;
  },

  async count() {
    if (isMongooseConnected()) {
      return await MongoosePattern.countDocuments();
    }
    return (getFallbackStore().patterns || []).length;
  }
};

module.exports = {
  MongoosePattern,
  PatternRepository
};
