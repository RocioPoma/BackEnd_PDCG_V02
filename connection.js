const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({

    // port: 18005,
    // host: '181.188.156.195',

    // SERVIDOR
    // host: '181.188.156.195',
    // port: 18006,

    host: 'cln5c4yri00q6pmcg18ba0o41',
    user: 'cln5c4yrh0cjzcgpm4icih9ri',
    password: 'c3oLwWprrgZlX1U7nkdv6ZIC',
    database: 'bdd_proyectos_v03',

    // LOCAL
    // port:  3306, 
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'bdd_proyectos_v05'

});

connection.connect((err) => {
    if (!err) {
        console.log("CONNECTED");
    }
    else {
        console.log('ERROR: ');
        console.log(err);
    }
})

module.exports = connection;
