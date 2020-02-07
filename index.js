const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Connect DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  () => console.log('DB CONNECTED')
);

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// Server Listen
app.listen(3000, () => console.log('Server running on port 3000'));
