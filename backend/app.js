require('dotenv').config(); // Load .env file

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const educatorRoutes = require('./routes/educator');
const studentRoutes = require('./routes/student');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Use environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
}));

app.use('/uploads', cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false, 
    httpOnly: true,
  }
}));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// Setting up routes
app.use('/', authRoutes);
app.use('/educator', educatorRoutes);
app.use('/student', studentRoutes);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
