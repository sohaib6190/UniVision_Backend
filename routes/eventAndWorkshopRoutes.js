// routes/eventAndWorkshopRoutes.js
const express = require('express');
const {
    readEventWorkshops,
    addEventWorkshop,
    updateEventWorkshop,
    deleteEventWorkshop,
    getEventsLimited,
    getEvents
} = require('../Controllers/eventAndWorkshopController');
const router = express.Router();

router.get('/read/eventworkshops', readEventWorkshops);
router.post('/add/eventworkshops', addEventWorkshop);
router.put('/update/eventworkshops/:id', updateEventWorkshop);
router.delete('/delete/eventworkshops/:id', deleteEventWorkshop);
router.get('/events/limit', getEventsLimited);
router.get('/events', getEvents);

module.exports = router;
