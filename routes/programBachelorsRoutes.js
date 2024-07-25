// routes/programBachelorsRoutes.js
const express = require('express');
// const {
//     addProgramBachelors,
//     updateProgramBachelors,
//     deleteProgramBachelors,
//     getPrograms,
//     getProgramsLimited
// } = require('../controllers/programBachelorsController');

const {
    addProgramBachelors,
    updateProgramBachelors,
    deleteProgramBachelors,
    getPrograms,
    getProgramsLimited
} = require('../Controllers/programBachelorsController');


const router = express.Router();

router.post('/add/program_bachelors', addProgramBachelors);
router.put('/update/program_bachelors/:id', updateProgramBachelors);
router.delete('/delete/program_bachelors/:id', deleteProgramBachelors);
router.get('/programs', getPrograms);
router.get('/programs/limit', getProgramsLimited);

module.exports = router;
