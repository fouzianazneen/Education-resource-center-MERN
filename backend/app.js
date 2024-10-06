const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const educatorRoutes = require('./routes/educator');
const studentRoutes = require('./routes/student');

const app = express();
const path = require('path');
const cors = require('cors');




const MONGO_URI = 'mongodb://localhost:27017/education-resource';





app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));


app.use('/uploads', cors());


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.use(express.json());
app.use(session({
  secret: 'long-random-string-for-session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Session max age (1 day)
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
  }
}));




app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

app.use('/', authRoutes);
app.use('/educator', educatorRoutes);
app.use('/student', studentRoutes);

app.use('/uploads', express.static('uploads'));



mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




