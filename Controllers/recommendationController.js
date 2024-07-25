const { spawn } = require('child_process');
const connection = require('../database');

function recommend(req, res) {
    const { previous_grade, max_fee, level, tags } = req.body;
    const pythonProcess = spawn('python', ['rec.py', previous_grade, max_fee, level, tags]);
    let universitiesData = '';

    pythonProcess.stdout.on('data', function (data) {
        universitiesData += data.toString();
    });

    pythonProcess.stderr.on('data', function (data) {
        console.error(data.toString());
    });

    pythonProcess.on('close', function (code) {
        if (code === 0) {
            res.send(JSON.parse(universitiesData));
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
}

module.exports = {
    recommend
};
