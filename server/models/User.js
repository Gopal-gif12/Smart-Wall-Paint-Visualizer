const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isMongooseConnected, getFallbackStore, saveFallbackStore } = require('../config/db');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favoriteColors: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const MongooseUser = mongoose.models.User || mongoose.model('User', UserSchema);

// Unified Repository Adapter
const UserRepository = {
  async findByEmail(email) {
    const cleanEmail = email.toLowerCase().trim();
    if (isMongooseConnected()) {
      return await MongooseUser.findOne({ email: cleanEmail });
    }
    const store = getFallbackStore();
    return store.users.find(u => u.email.toLowerCase() === cleanEmail) || null;
  },

  async findById(id) {
    if (isMongooseConnected()) {
      return await MongooseUser.findById(id).select('-password');
    }
    const store = getFallbackStore();
    const user = store.users.find(u => (u._id || u.id) === id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },

  async create({ name, email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const cleanEmail = email.toLowerCase().trim();

    if (isMongooseConnected()) {
      const user = new MongooseUser({
        name,
        email: cleanEmail,
        password: hashedPassword,
        role
      });
      await user.save();
      return user;
    }

    const store = getFallbackStore();
    const newUser = {
      _id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name,
      email: cleanEmail,
      password: hashedPassword,
      role,
      favoriteColors: [],
      createdAt: new Date().toISOString()
    };
    store.users.push(newUser);
    saveFallbackStore();
    return newUser;
  },

  async toggleFavorite(userId, colorCode) {
    if (isMongooseConnected()) {
      const user = await MongooseUser.findById(userId);
      if (!user) return null;
      const index = user.favoriteColors.indexOf(colorCode);
      if (index > -1) user.favoriteColors.splice(index, 1);
      else user.favoriteColors.push(colorCode);
      await user.save();
      return user.favoriteColors;
    }

    const store = getFallbackStore();
    const user = store.users.find(u => (u._id || u.id) === userId);
    if (!user) return null;
    user.favoriteColors = user.favoriteColors || [];
    const idx = user.favoriteColors.indexOf(colorCode);
    if (idx > -1) user.favoriteColors.splice(idx, 1);
    else user.favoriteColors.push(colorCode);
    saveFallbackStore();
    return user.favoriteColors;
  },

  async count() {
    if (isMongooseConnected()) {
      return await MongooseUser.countDocuments();
    }
    return getFallbackStore().users.length;
  }
};

module.exports = {
  MongooseUser,
  UserRepository
};
