var mysql = require('mysql');
var connection = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'movies'

});
module.exports = connection;