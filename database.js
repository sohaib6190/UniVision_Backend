
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'xxx',
    user: 'xxx',
    password: 'xxx'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
