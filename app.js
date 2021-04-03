const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const path = require('path');

/*
const usersRoutes = require('./routes/users');
const sauceRoutes = require('./routes/sauces');
*/
const app = express();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'student',
    password: 'Study2021',
    database: 'pagemania',
    port: '3306'
});

pool.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
    if (error) throw error;
    console.log('Connected to MySQL! Test result: ', results[0].solution);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
/*
app.use('/api/auth', usersRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
*/



module.exports = app;