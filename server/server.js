const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB } = require('./config/db');
const { UserRepository } = require('./models/User');
const { ColorRepository } = require('./models/Color');
const { PatternRepository } = require('./models/Pattern');
const { ProjectRepository } = require('./models/Project');

const authRoutes = require('./routes/authRoutes');
const colorRoutes = require('./routes/colorRoutes');
const patternRoutes = require('./routes/patternRoutes');
const projectRoutes = require('./routes/projectRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend dev server and production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing with large limits for high-resolution canvas room previews
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/patterns', patternRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Smart Wall Paint Visualizer API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Seed default users and data
async function initializeDefaults() {
  try {
    // 1. Seed Colors and Patterns
    await ColorRepository.initSeed();
    await PatternRepository.initSeed();

    // 2. Seed Default Admin User
    const adminEmail = 'admin@visualizer.com';
    const existingAdmin = await UserRepository.findByEmail(adminEmail);
    if (!existingAdmin) {
      console.log('[Seed] Creating default admin account (admin@visualizer.com)...');
      await UserRepository.create({
        name: 'Visualizer Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin'
      });
    }

    // 3. Seed Default Regular User
    const userEmail = 'user@visualizer.com';
    const existingUser = await UserRepository.findByEmail(userEmail);
    let demoUserId = existingUser ? (existingUser._id || existingUser.id) : null;
    if (!existingUser) {
      console.log('[Seed] Creating default demo user (user@visualizer.com)...');
      const newUser = await UserRepository.create({
        name: 'Demo Interior Designer',
        email: userEmail,
        password: 'user123',
        role: 'user'
      });
      demoUserId = newUser._id || newUser.id;
    }

    // 4. Seed a sample project for demo user if none exist
    const userProjects = await ProjectRepository.findByUser(demoUserId);
    if (userProjects.length === 0) {
      console.log('[Seed] Seeding sample room design project...');
      await ProjectRepository.create({
        userId: demoUserId,
        title: 'Modern Nordic Living Room Accent',
        roomType: 'Living Room',
        originalImage: 'sample-living-1',
        previewImage: 'sample-living-1',
        walls: [
          {
            name: 'Main Accent Wall',
            polygon: [
              { x: 0.18, y: 0.12 },
              { x: 0.82, y: 0.12 },
              { x: 0.82, y: 0.72 },
              { x: 0.18, y: 0.72 }
            ],
            color: {
              code: 'BL-201',
              name: 'Pacific Navy',
              hex: '#1E3A5F'
            },
            finish: 'matte',
            opacity: 0.88
          }
        ],
        notes: 'Testing deep blue accent against neutral timber floorboards.'
      });
    }

    console.log('[Seed] System seed initialization completed successfully.');
  } catch (err) {
    console.error('[Seed] Error during default data initialization:', err);
  }
}

// Start Server
async function startServer() {
  await connectDB();
  await initializeDefaults();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🎨 Smart Wall Paint Visualizer API running on port ${PORT}`);
    console.log(`📍 Endpoint: http://localhost:${PORT}/api/health`);
    console.log(`🔑 Demo User: user@visualizer.com (pw: user123)`);
    console.log(`🛡️ Admin User: admin@visualizer.com (pw: admin123)`);
    console.log(`=======================================================`);
  });
}

startServer();
