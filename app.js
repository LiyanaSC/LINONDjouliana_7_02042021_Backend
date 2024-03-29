const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');



//const path = require('path');


const authroutes = require('./routes/auth');
const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');


const app = express();



const pool = mysql.createPool({

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



app.use('/api/auth', authroutes);
app.use('/api/users', usersRoute);
app.use('/api/articles', articlesRoute);
/*app.use('/images', express.static(path.join(__dirname, 'images')));

*/


module.exports = app;