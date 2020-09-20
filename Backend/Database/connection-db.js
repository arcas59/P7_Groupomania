// Plugin Npm Node.js MySql
let mysql = require('mysql');

// Création de la connexion entre le serveur et la base de donnée :
let connectdb = mysql.createConnection({
  database: 'bd_groupomania',
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