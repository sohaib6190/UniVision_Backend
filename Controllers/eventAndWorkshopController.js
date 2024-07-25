const connection = require('../database');

async function readEventWorkshops(req, res) {
    const sql = "SELECT * FROM EVENTANDWORKSHOP";
    connection.query(sql, function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.send(results);
    });
}

async function addEventWorkshop(req, res) {
    const { eventworkshop_name, eventworkshop_date, eventworkshop_time, eventworkshop_who_name, email_as_id } = req.body;
    const sql = 'INSERT INTO EVENTANDWORKSHOP (eventworkshop_name, eventworkshop_date, eventworkshop_time, eventworkshop_who_name, email_as_id) VALUES (?, ?, ?, ?, ?)';

    connection.query(sql, [eventworkshop_name, eventworkshop_date, eventworkshop_time, eventworkshop_who_name, email_as_id], function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.send(results);
    });
}

async function updateEventWorkshop(req, res) {
    const { id } = req.params;
    const {  eventworkshop_name, eventworkshop_date, eventworkshop_time, eventworkshop_who_name,type } = req.body;
    const sql = 'UPDATE EVENTANDWORKSHOP SET eventworkshop_name = ?, eventworkshop_date = ?, eventworkshop_time = ?, eventworkshop_who_name = ?, type = ? WHERE eventworkshop_id = ?';

    connection.query(sql, [eventworkshop_name, eventworkshop_date, eventworkshop_time, eventworkshop_who_name, type,id], function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.send(results);
    });
}

async function deleteEventWorkshop(req, res) {
    const { id } = req.params;
    
    const sql = 'DELETE FROM EVENTANDWORKSHOP WHERE eventworkshop_id = ?';

    connection.query(sql, [id], function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.send(results);
    });
}

async function getEventsLimited(req, res) {
    const sql = `
      SELECT 
          ew.eventworkshop_id,
          ew.eventworkshop_name,
          ew.type,
          ew.eventworkshop_date,
          ew.eventworkshop_time,
          ew.eventworkshop_who_name,
          ew.email_as_id,
          u.name AS university_name
      FROM 
          EVENTANDWORKSHOP ew
      JOIN 
          University u
      ON 
          ew.email_as_id = u.email_as_id
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

async function getEvents(req, res) {
    const sql = `
      SELECT 
          ew.eventworkshop_id,
          ew.eventworkshop_name,
          ew.type,
          ew.eventworkshop_date,
          ew.eventworkshop_time,
          ew.eventworkshop_who_name,
          ew.email_as_id,
          u.name AS university_name
      FROM 
          EVENTANDWORKSHOP ew
      JOIN 
          University u
      ON 
          ew.email_as_id = u.email_as_id;
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
    readEventWorkshops,
    addEventWorkshop,
    updateEventWorkshop,
    deleteEventWorkshop,
    getEventsLimited,
    getEvents
};
