const express = require('express');
const {
    readScholarship,
    addScholarship,
    updateScholarship,
    deleteScholarship,
    getScholarships,
    getScholarshipsLimited
} = require('../Controllers/scholarshipController');
const router = express.Router();

router.get('/read/scholarship', readScholarship);
router.post('/add/scholarship', addScholarship);
router.put('/update/scholarship/:id', updateScholarship);
router.delete('/delete/scholarship/:id', deleteScholarship);
router.get('/scholarships', getScholarships);
router.get('/scholarships/limit', getScholarshipsLimited);

module.exports = router;
