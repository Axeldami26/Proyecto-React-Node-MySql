const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmanager'
});

module.exports = connection;

//host: process.env.HOST,
//user: process.env.USER,
//password: process.env.PASSWORD,
//database: process.env.DATABASE,