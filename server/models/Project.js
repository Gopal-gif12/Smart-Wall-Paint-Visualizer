const mongoose = require('mongoose');
const { isMongooseConnected, getFallbackStore, saveFallbackStore } = require('../config/db');

const ProjectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, default: 'Untitled Room Project' },
  roomType: { type: String, default: 'Living Room' },
  originalImage: { type: String, required: true },
  previewImage: { type: String },
  walls: [
    {
      name: { type: String, default: 'Wall 1' },
      polygon: [{ x: Number, y: Number }],
      color: {
        code: String,
        name: String,
        hex: String
      },
      pattern: { type: String },
      finish: { type: String, default: 'matte' },
      opacity: { type: Number, default: 0.85 }
    }
  ],
  dualTone: {
    enabled: { type: Boolean, default: false },
    secondaryColor: { type: String },
    orientation: { type: String, default: 'horizontal' },
    splitRatio: { type: Number, default: 0.5 }
  },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MongooseProject = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const ProjectRepository = {
  async findByUser(userId) {
    if (isMongooseConnected()) {
      return await MongooseProject.find({ userId }).sort({ updatedAt: -1 });
    }
    const store = getFallbackStore();
    return (store.projects || [])
      .filter(p => p.userId === userId)
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
  },

  async findById(id) {
    if (isMongooseConnected()) {
      return await MongooseProject.findById(id);
    }
    const store = getFallbackStore();
    return (store.projects || []).find(p => (p._id || p.id) === id) || null;
  },

  async create(data) {
    if (isMongooseConnected()) {
      const project = new MongooseProject(data);
      return await project.save();
    }
    const store = getFallbackStore();
    const newProject = {
      _id: 'prj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.projects.push(newProject);
    saveFallbackStore();
    return newProject;
  },

  async update(id, userId, data) {
    if (isMongooseConnected()) {
      return await MongooseProject.findOneAndUpdate(
        { _id: id, userId },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    const store = getFallbackStore();
    const idx = (store.projects || []).findIndex(p => (p._id || p.id) === id && p.userId === userId);
    if (idx === -1) return null;
    store.projects[idx] = {
      ...store.projects[idx],
      ...data,
      updatedAt: new Date().toISOString()
    };
    saveFallbackStore();
    return store.projects[idx];
  },

  async delete(id, userId) {
    if (isMongooseConnected()) {
      return await MongooseProject.findOneAndDelete({ _id: id, userId });
    }
    const store = getFallbackStore();
    const idx = (store.projects || []).findIndex(p => (p._id || p.id) === id && p.userId === userId);
    if (idx === -1) return null;
    const removed = store.projects.splice(idx, 1)[0];
    saveFallbackStore();
    return removed;
  },

  async findAllRecent(limit = 10) {
    if (isMongooseConnected()) {
      return await MongooseProject.find().sort({ updatedAt: -1 }).limit(limit);
    }
    const store = getFallbackStore();
    return [...(store.projects || [])]
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, limit);
  },

  async count() {
    if (isMongooseConnected()) {
      return await MongooseProject.countDocuments();
    }
    return (getFallbackStore().projects || []).length;
  }
};

module.exports = {
  MongooseProject,
  ProjectRepository
};
