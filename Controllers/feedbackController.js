// controllers/feedbackController.js
const admin = require('firebase-admin');
const connection = require('../database');

async function readFeedback(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email = decodedToken.email;

        const sql = "SELECT * FROM Feedback_University WHERE email_as_id = ?";
        connection.query(sql, [email], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.send(results);
        });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Unauthorized token' });
    }
}

function deleteFeedback(req, res) {
    const { uni_feedback_id } = req.body;
    const sql = 'DELETE FROM Feedback_University WHERE uni_feedback_id = ?';
    connection.query(sql, [uni_feedback_id], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.send(results);
    });
}

module.exports = {
    readFeedback,
    deleteFeedback
};
