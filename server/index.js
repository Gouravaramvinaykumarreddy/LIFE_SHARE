const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');
const requestRoutes = require('./routes/requests');
const notificationRoutes = require('./routes/notifications');
const { pool, USE_SQLITE } = require('./db');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For demo purpose, adjust for production
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io Real-time Setup
const connectedHospitals = new Map(); // Store hospitalId -> socketId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (hospitalId) => {
    connectedHospitals.set(hospitalId.toString(), socket.id);
    console.log(`Hospital ${hospitalId} joined notification channel`);
  });

  socket.on('disconnect', () => {
    for (let [id, sId] of connectedHospitals.entries()) {
      if (sId === socket.id) {
        connectedHospitals.delete(id);
        break;
      }
    }
    console.log('User disconnected');
  });
});

// Global Io Object for routes to use
app.set('io', io);
app.set('connectedHospitals', connectedHospitals);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`LifeShare Server running on port ${PORT}`);
  if (!USE_SQLITE) {
    try {
      // Basic connectivity check for PostgreSQL
      await pool.query('SELECT NOW()');
      console.log('PostgreSQL connected successfully.');
    } catch (err) {
      console.error('Failed to connect to PostgreSQL:', err.message);
      console.warn('NOTE: Ensure PostgreSQL is running and DB_URL is correct in .env');
    }
  } else {
    console.log('SQLite is active. Database file: ./lifeshare.db');
  }
});

module.exports = server;
