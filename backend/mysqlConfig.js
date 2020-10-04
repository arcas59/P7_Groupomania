var mysql = require('mysql');

// Connexion à MYSQL
var bdd = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'groupomaniadb'
});

console.log("Retour de la Database : ", bdd)

module.exports = bdd;