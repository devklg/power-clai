const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Setup Socket.IO for real-time updates
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://yourdomain.com' 
      : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Join a room based on user ID if authenticated
  socket.on('join', (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    }
  });
  
  // Listen for powerline updates
  socket.on('powerline_update', (data) => {
    // Broadcast to all connected clients
    io.emit('powerline_update', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pre-enrollees', require('./routes/preEnrollees'));
app.use('/api/promoters', require('./routes/promoters'));
app.use('/api/commissions', require('./routes/commissions'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ 
    message: 'Server Error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// For production: Serve static assets from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Define PORT (default to 5000 if env not set)
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});