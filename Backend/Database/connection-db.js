// Plugin Npm Node.js MySql
var mysql = require('mysql');

// Création de la connexion entre le serveur et la base de donnée :
var connectdb = mysql.createConnection({
  database: 'groupomania',
  host: "localhost",
  user: "root",
  password: ""
});

// Connexion à la base de donnée SQL :
connectdb.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connectdb;