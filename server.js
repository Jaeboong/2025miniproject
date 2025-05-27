const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const uploadRoutes = require('./src/routes/upload');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.use('/api/upload', uploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
