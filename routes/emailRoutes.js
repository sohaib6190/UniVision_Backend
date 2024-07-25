// routes/emailRoutes.js
const express = require('express');
const { generatePasswordResetLink } = require('../controllers/emailController');
const router = express.Router();

router.post('/generate-password-reset-link', generatePasswordResetLink);

module.exports = router;
