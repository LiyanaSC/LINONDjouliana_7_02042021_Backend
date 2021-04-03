const mysql = require('mysql');
const { rejects } = require('node:assert');
const { resolve } = require('node:path');




const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'student',
    password: 'Study2021',
    database: 'pagemania',
    port: '3306'
});

let pagemaniaArticles = {}

pagemaniaArticles.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM articles`, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })

}

module.exports = pagemaniaArticles;
module.exports = pool;