// authRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../controllers/database1/auth');


// User Login route
router.post('/login', auth.handleLogin);

// User registration route
router.post('/register', auth.handleRegister);

// User logout route (optional)
router.post('/logout', auth.handleLogout);


module.exports = router;
