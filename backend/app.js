<<<<<<< HEAD
// const express = require('express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth');
// const educatorRoutes = require('./routes/educator');
// const studentRoutes = require('./routes/student');

// const app = express();
// const path = require('path');
// const cors = require('cors');




// const MONGO_URI = 'mongodb://localhost:27017/education-resource';





// app.use(cors({
//   origin: 'http://localhost:5174',
//   credentials: true,
// }));


// app.use('/uploads', cors());


// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// app.use(express.json());
// app.use(session({
//   secret: 'long-random-string-for-session',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // Session max age (1 day)
//     secure: false, // Set to true if using HTTPS
//     httpOnly: true,
//   }
// }));




// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request to ${req.url}`);
//   next();
// });

// app.use('/', authRoutes);
// app.use('/educator', educatorRoutes);
// app.use('/student', studentRoutes);

// app.use('/uploads', express.static('uploads'));



// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// Importing required packages
=======
require('dotenv').config(); // Load .env file

>>>>>>> badf7bda353ce8d585ee774e2e15f0fe16b41143
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

<<<<<<< HEAD
// Environment Variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/education-resource';
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5174';
const SESSION_SECRET = process.env.SESSION_SECRET || 'long-random-string-for-session';

// CORS configuration
=======
// Use environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

>>>>>>> badf7bda353ce8d585ee774e2e15f0fe16b41143
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
}));

app.use('/uploads', cors());
<<<<<<< HEAD

// Serve static files from the 'uploads' directory
=======
>>>>>>> badf7bda353ce8d585ee774e2e15f0fe16b41143
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

<<<<<<< HEAD
// Middleware for logging requests
=======
>>>>>>> badf7bda353ce8d585ee774e2e15f0fe16b41143
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// Setting up routes
app.use('/', authRoutes);
app.use('/educator', educatorRoutes);
app.use('/student', studentRoutes);

<<<<<<< HEAD
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
=======
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

>>>>>>> badf7bda353ce8d585ee774e2e15f0fe16b41143
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
