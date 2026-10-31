import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { generateMystery } from './src/mysteryService.js';

dotenv.config();

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://localhost:5178')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalDevelopmentOrigin = (origin) => {
  if (!origin) return true;

  try {
    const { protocol, hostname } = new URL(origin);
    const isPrivateLan = /^((192\.168\.)|(10\.)|(172\.(1[6-9]|2[0-9]|3[0-1])\.)|local\.)/.test(hostname);
    return ['http:', 'https:'].includes(protocol) && (
      ['localhost', '127.0.0.1', '0.0.0.0'].includes(hostname) || isPrivateLan
    );
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || isLocalDevelopmentOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS policy does not allow this origin'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));

const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI not set. Running without MongoDB connection.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'AI MYSTERY ROOM API is running.' });
});

app.post('/api/mysteries/generate', async (req, res) => {
  const { scenario, title, category, difficulty } = req.body;

  if (!scenario || !scenario.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Scenario is required to generate a mystery.',
    });
  }

  try {
    const mystery = await generateMystery({
      title,
      scenario,
      category,
      difficulty,
    });

    return res.json({ success: true, mystery });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Mystery generation failed.',
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled app error:', err.message);
  res.status(500).json({ success: false, message: 'Server error' });
});

connectDatabase();

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use. Trying ${nextPort} instead.`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
};

startServer(DEFAULT_PORT);
