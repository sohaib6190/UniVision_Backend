// controllers/scholarshipController.js
const admin = require('firebase-admin');
const connection = require('../database');

async function readScholarship(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email = decodedToken.email;

        const sql = "SELECT * FROM UniScholorship WHERE email_as_id = ?";
        connection.query(sql, [email], function (err, results) {
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

async function addScholarship(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email_as_id = decodedToken.email;

        const { scholarshipname, eligibilitycriteria, scholar_provider, amount } = req.body;
        const sql = 'INSERT INTO UniScholorship (scholarshipname, eligibilitycriteria, scholar_provider, amount, email_as_id) VALUES (?, ?, ?, ?, ?)';

        connection.query(sql, [scholarshipname, eligibilitycriteria, scholar_provider, amount, email_as_id], function (err, results) {
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

async function updateScholarship(req, res) {
    const { id } = req.params;
    const { scholarshipname, eligibilitycriteria, scholar_provider, amount } = req.body;

    const sql = 'UPDATE UniScholorship SET scholarshipname = ?, eligibilitycriteria = ?, scholar_provider = ?, amount = ? WHERE uni_scholorshhipsid = ?';
    connection.query(sql, [scholarshipname, eligibilitycriteria, scholar_provider, amount, id], function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Scholarship not found' });
            return;
        }

        res.status(200).json({
            id,
            scholarshipname,
            eligibilitycriteria,
            scholar_provider,
            amount
        });
    });
}

async function deleteScholarship(req, res) {
    const { id } = req.params;

    const sql = 'DELETE FROM UniScholorship WHERE uni_scholorshhipsid = ?';
    connection.query(sql, [id], function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Record not found' });
            return;
        }

        res.status(200).json({ message: 'Record deleted successfully' });
    });
}

async function getScholarships(req, res) {
    const sql = `
      SELECT 
          us.uni_scholorshhipsid,
          us.scholarshipname,
          us.eligibilitycriteria,
          us.scholar_provider,
          us.amount,
          us.email_as_id,
          u.name AS university_name
      FROM 
          UniScholorship us
      JOIN 
          University u
      ON 
          us.email_as_id = u.email_as_id;
    `;

    connection.query(sql, function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}

async function getScholarshipsLimited(req, res) {
    const sql = `
      SELECT 
          us.uni_scholorshhipsid,
          us.scholarshipname,
          us.eligibilitycriteria,
          us.scholar_provider,
          us.amount,
          us.email_as_id,
          u.name AS university_name
      FROM 
          UniScholorship us
      JOIN 
          University u
      ON 
          us.email_as_id = u.email_as_id
      LIMIT 10;
    `;

    connection.query(sql, function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}

module.exports = {
    readScholarship,
    addScholarship,
    updateScholarship,
    deleteScholarship,
    getScholarships,
    getScholarshipsLimited
};
