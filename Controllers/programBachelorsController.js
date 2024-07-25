const admin = require('firebase-admin');
const connection = require('../database');




async function addProgramBachelors(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email_as_id = decodedToken.email;

        const { program_name, program_level, program_fee, eligibility_criteria_ug } = req.body;
        const sql = 'INSERT INTO program_bachelors (program_name, program_level, program_fees, eligibility_criteria_ug, email_as_id) VALUES (?, ?, ?, ?, ?)';

        connection.query(sql, [program_name, program_level, program_fee, eligibility_criteria_ug, email_as_id], function (err, results) {
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

async function updateProgramBachelors(req, res) {
    const { id } = req.params;
    const { program_name, program_level, eligibility_criteria_ug, program_fee } = req.body;

    const sql = 'UPDATE program_bachelors SET program_name = ?, program_level = ?, eligibility_criteria_ug = ?, program_fee = ? WHERE id = ?';
    connection.query(sql, [program_name, program_level, eligibility_criteria_ug, program_fee, id], function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }

        res.status(200).json({
            id,
            program_name,
            program_level,
            eligibility_criteria_ug,
            program_fee
        });
    });
}

async function deleteProgramBachelors(req, res) {
    const { id } = req.params;

    const sql = 'DELETE FROM program_bachelors WHERE id = ?';
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

async function getPrograms(req, res) {
    const sql = `
      SELECT 
          pb.id,
          pb.program_name,
          pb.program_level,
          pb.program_fee,
          pb.eligibility_criteria_ug,
          pb.email_as_id,
          u.name AS university_name
      FROM 
          program_bachelors pb
      JOIN 
          university u
      ON 
          pb.email_as_id = u.email_as_id;
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

async function getProgramsLimited(req, res) {
    const sql = `
      SELECT 
          pb.id,
          pb.program_name,
          pb.program_level,
          pb.program_fee,
          pb.eligibility_criteria_ug,
          pb.email_as_id,
          u.name AS university_name
      FROM 
          program_bachelors pb
      JOIN 
          university u
      ON 
          pb.email_as_id = u.email_as_id
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
    addProgramBachelors,
    updateProgramBachelors,
    deleteProgramBachelors,
    getPrograms,
    getProgramsLimited
};
