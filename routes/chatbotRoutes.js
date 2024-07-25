// routes/chatbotRoutes.js
const express = require('express');
const { askChatbot } = require('../controllers/chatbotController');
const router = express.Router();

router.post('/ask/chatbot', askChatbot);

module.exports = router;
