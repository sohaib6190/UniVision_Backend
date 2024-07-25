const express = require('express');
const { recommend } = require('../Controllers/recommendationController');
const router = express.Router();

router.post('/recommend', recommend);

module.exports = router;
