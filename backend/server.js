const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db.js');
const postRoutes = require('./routes/postRoutes');
const resultRoutes = require('./routes/resultRoutes');
const authoroutes = require('./routes/authoroutes.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/results', resultRoutes);
app.use('/api', authoroutes);

// Optional cache headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
