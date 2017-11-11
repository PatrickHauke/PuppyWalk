// pg-promise
const pgp = require('pg-promise')();
connection = {
	host:'34.210.16.173',
	port: 5432,
	database: 'puppywalk',
	user: 'postgres',
    password: 'puppywalk'
}

var db = pgp(connection);
// console.log('HIII')
// db.query('select * from users;').then( results => console.log(results))

const PQ = require('pg-promise').ParameterizedQuery;
// Creating a complete Parameterized Query with parameters:
exports.findUser = new PQ('SELECT * FROM Users WHERE email = $1 and password = $2');

exports.testing = function(){db.query('select * from users;').then( results => console.log(results))}

exports.db = db