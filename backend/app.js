const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const db_filename = "data.txt"

// Import Routers
const adminRoute = require('./routes/admin.route');
//const userRoute = require('./routes/users/index.route');

const app = express();

// Middleware for CORS
app.use(cors());

// Middleware for Session Handling
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
}));

// Body Parser Middleware
app.use(bodyParser.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Local-Database';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection failed:', err));



// Routes
app.use('/admin', adminRoute);
//app.use('/user', userRoute);

// Logout Endpoint
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/home'); // Replace '/home' with an actual existing route
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));