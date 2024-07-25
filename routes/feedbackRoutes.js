const express = require('express');
const {
    readFeedback,
    deleteFeedback
} = require('../Controllers/feedbackController');
const router = express.Router();

router.get('/read/feedback', readFeedback);
router.post('/delete/feedback', deleteFeedback);

module.exports = router;
