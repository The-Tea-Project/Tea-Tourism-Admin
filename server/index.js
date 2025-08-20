import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import accomodationRoutes from './routes/accomodation.js';
import transportRoutes from './routes/transport.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://theteaprojadmin.vercel.app',
  credentials: true
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Tea Tourism Admin backend is working!');
});
app.use('/api/accomodations', accomodationRoutes);
app.use('/api/transports', transportRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));

export default app;