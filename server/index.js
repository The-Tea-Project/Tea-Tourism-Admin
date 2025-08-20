import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import accomodationRoutes from './routes/accomodation.js';
import transportRoutes from './routes/transport.js';
import cookieParser from 'cookie-parser';

if (process.env.NODE_ENV !== "production") {
  const dotenv = await import('dotenv');
  dotenv.config({ path: "./data/config.env" });
}

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://theteaprojadmin.vercel.app'
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Health check route
app.get('/', (req, res) => {
  res.send('Tea Tourism Admin backend is working!');
});

// Routes
app.use('/api/accomodations', accomodationRoutes);
app.use('/api/transports', transportRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

export default app;