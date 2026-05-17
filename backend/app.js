// app.js — Express app: middleware + route mounting + error handler.

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// Root Route
app.get('/', (_req, res) => {
  res.send('🚀 SkillSync Backend Running Successfully');
});

// Health Check Route
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'SkillSync',
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/connections', require('./routes/connection.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));
app.use('/api/messages', require('./routes/message.routes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;