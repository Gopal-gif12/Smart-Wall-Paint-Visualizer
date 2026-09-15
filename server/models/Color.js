const mongoose = require('mongoose');
const { isMongooseConnected, getFallbackStore, saveFallbackStore } = require('../config/db');
const { colors: defaultColors } = require('../seed/seedData');

const ColorSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hex: { type: String, required: true },
  rgb: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  finishOptions: [{ type: String }],
  popular: { type: Boolean, default: false },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const MongooseColor = mongoose.models.Color || mongoose.model('Color', ColorSchema);

const ColorRepository = {
  async initSeed() {
    if (isMongooseConnected()) {
      const count = await MongooseColor.countDocuments();
      if (count === 0) {
        console.log('[Seed] Seeding default paint colors into MongoDB...');
        await MongooseColor.insertMany(defaultColors);
      }
    } else {
      const store = getFallbackStore();
      if (!store.colors || store.colors.length === 0) {
        console.log('[Seed] Seeding default paint colors into Fallback Store...');
        store.colors = defaultColors.map((c, i) => ({
          _id: 'col_' + (i + 1).toString().padStart(4, '0'),
          ...c,
          createdAt: new Date().toISOString()
        }));
        saveFallbackStore();
      }
    }
  },

  async findAll(query = {}) {
    const { category, brand, search, popular } = query;

    if (isMongooseConnected()) {
      const filter = {};
      if (category && category !== 'All') filter.category = category;
      if (brand && brand !== 'All') filter.brand = brand;
      if (popular === 'true' || popular === true) filter.popular = true;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
          { hex: { $regex: search, $options: 'i' } }
        ];
      }
      return await MongooseColor.find(filter).sort({ popular: -1, name: 1 });
    }

    const store = getFallbackStore();
    let list = [...(store.colors || [])];

    if (category && category !== 'All') {
      list = list.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    if (brand && brand !== 'All') {
      list = list.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
    }
    if (popular === 'true' || popular === true) {
      list = list.filter(c => c.popular);
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(s) ||
        c.code.toLowerCase().includes(s) ||
        c.hex.toLowerCase().includes(s)
      );
    }

    return list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  },

  async findById(id) {
    if (isMongooseConnected()) {
      return await MongooseColor.findById(id);
    }
    const store = getFallbackStore();
    return store.colors.find(c => (c._id || c.id) === id || c.code === id) || null;
  },

  async create(data) {
    if (isMongooseConnected()) {
      const color = new MongooseColor(data);
      return await color.save();
    }
    const store = getFallbackStore();
    const newColor = {
      _id: 'col_' + Date.now(),
      ...data,
      popular: !!data.popular,
      createdAt: new Date().toISOString()
    };
    store.colors.push(newColor);
    saveFallbackStore();
    return newColor;
  },

  async update(id, data) {
    if (isMongooseConnected()) {
      return await MongooseColor.findByIdAndUpdate(id, data, { new: true });
    }
    const store = getFallbackStore();
    const idx = store.colors.findIndex(c => (c._id || c.id) === id || c.code === id);
    if (idx === -1) return null;
    store.colors[idx] = { ...store.colors[idx], ...data };
    saveFallbackStore();
    return store.colors[idx];
  },

  async delete(id) {
    if (isMongooseConnected()) {
      return await MongooseColor.findByIdAndDelete(id);
    }
    const store = getFallbackStore();
    const idx = store.colors.findIndex(c => (c._id || c.id) === id || c.code === id);
    if (idx === -1) return null;
    const removed = store.colors.splice(idx, 1)[0];
    saveFallbackStore();
    return removed;
  },

  async count() {
    if (isMongooseConnected()) {
      return await MongooseColor.countDocuments();
    }
    return (getFallbackStore().colors || []).length;
  }
};

module.exports = {
  MongooseColor,
  ColorRepository
};
