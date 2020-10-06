var mysql = require('mysql');

// Connexion à MYSQL
var bdd = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'groupomaniadb'
});

module.exports = bdd;