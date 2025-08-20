import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import accomodationRoutes from './routes/accomodation.js';
import transportRoutes from './routes/transport.js';
const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://theteaprojadmin.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


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