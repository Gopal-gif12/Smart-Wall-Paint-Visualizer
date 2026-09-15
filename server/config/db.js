const fs = require('fs');
const path = require('path');
const net = require('net');
const mongoose = require('mongoose');

let isMongooseConnected = false;
const dataDir = path.join(__dirname, '..', 'data');
const storeFilePath = path.join(dataDir, 'store.json');

// Ensure data dir exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Memory / File fallback state
let fallbackStore = {
  users: [],
  colors: [],
  patterns: [],
  projects: [],
  stats: {
    totalUploads: 42,
    totalPreviewsGenerated: 185
  }
};

function loadFallbackStore() {
  try {
    if (fs.existsSync(storeFilePath)) {
      const data = fs.readFileSync(storeFilePath, 'utf8');
      fallbackStore = { ...fallbackStore, ...JSON.parse(data) };
    }
  } catch (err) {
    console.warn('[DB] Could not read fallback store, using default memory state:', err.message);
  }
}

function saveFallbackStore() {
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(fallbackStore, null, 2), 'utf8');
  } catch (err) {
    console.error('[DB] Failed to persist fallback store:', err.message);
  }
}

// Quick check if local port is open to avoid long timeouts
function isPortOpen(host, port, timeout = 600) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = false;

    socket.setTimeout(timeout);
    socket.once('connect', () => {
      status = true;
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      resolve(false);
    });

    socket.connect(port, host);
  });
}

// Connect to MongoDB or activate graceful fallback
async function connectDB() {
  loadFallbackStore();
  const mongoUri = process.env.MONGODB_URI;

  // If explicit URI provided (e.g. MongoDB Atlas), try connecting
  if (mongoUri) {
    try {
      console.log(`[DB] Connecting to configured MONGODB_URI...`);
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
      isMongooseConnected = true;
      console.log('[DB] Connected to MongoDB Atlas/Remote cluster!');
      return;
    } catch (err) {
      console.warn('[DB] Could not connect to remote MongoDB, using persistent fallback.');
    }
  }

  // Check if local MongoDB is running on 127.0.0.1:27017
  const localOpen = await isPortOpen('127.0.0.1', 27017, 500);
  if (localOpen) {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/wall_paint_visualizer', {
        serverSelectionTimeoutMS: 1500
      });
      isMongooseConnected = true;
      console.log('[DB] Successfully connected to local MongoDB on port 27017!');
      return;
    } catch (err) {
      // Fallback
    }
  }

  console.log('[DB] Local MongoDB not detected. Zero-config persistent JSON storage active.');
  isMongooseConnected = false;
}

module.exports = {
  connectDB,
  isMongooseConnected: () => isMongooseConnected,
  getFallbackStore: () => fallbackStore,
  saveFallbackStore
};
