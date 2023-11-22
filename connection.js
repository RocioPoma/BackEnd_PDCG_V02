const mysql = require('mysql');

// Configuración de conexión para el pool
const pool = mysql.createPool({
    connectionLimit: 10,
    //SERVIDOR
    //host: '181.188.156.195',
    // port: 18006,

    host: 'cln5c4yri00q6pmcg18ba0o41',
    user: 'cln5c4yrh0cjzcgpm4icih9ri',
    password: 'c3oLwWprrgZlX1U7nkdv6ZIC',
    database: 'bdd_proyectos_v03',
});

// Obtener una conexión del pool y realizar operaciones
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al obtener la conexión del pool:', err);
        return;
    }

    // Ejecutar operaciones con la conexión
    connection.query('SELECT 1 + 1 AS result', (queryErr, results) => {
        if (queryErr) {
            console.error('Error en la consulta:', queryErr);
        } else {
            console.log('CONNECTED:', results[0].result);
        }

        // Devolver la conexión al pool
        connection.release();
    });
});

// Manejar eventos de error del pool
pool.on('error', (err) => {
    console.error('Error en el pool de MySQL:');
    console.error(err);
});

// Exportar el pool para su uso en otros módulos
module.exports = pool;

/*const mysql = require('mysql');
require('dotenv').config();

try {
    var connection = mysql.createConnection({

        // port: 18005,
        // host: '181.188.156.195',

        // SERVIDOR
        host: '181.188.156.195',
        port: 18006,

        // host: 'cln5c4yri00q6pmcg18ba0o41',
        user: 'cln5c4yrh0cjzcgpm4icih9ri',
        password: 'c3oLwWprrgZlX1U7nkdv6ZIC',
        database: 'bdd_proyectos_v03',

        // LOCAL
        // port: 3306, 
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

} catch (error) {
    console.error('Error de base de datos:', error);
}

module.exports = connection;*/
