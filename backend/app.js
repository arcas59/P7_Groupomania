const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const bdd = require('./mysqlConfig'); 

const userRoutes = require('./routes/user');
const filRoutes = require('./routes/filactualite');
const profileRoutes = require('./routes/profile');
const adminboardRoutes = require('./routes/adminboard');

var helmet = require('helmet');
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.static('./images/'));

app.use(bodyParser.json())

//Connexion BDD
bdd.connect(function(err){
if(!err) {
    console.log("La base de donnée groupomaniadb est connectée !");
} else {
    console.log("Erreur de connection avec la base de donnée groupomaniadb...");
}
})

app.use('/user/', userRoutes);
app.use('/fil/', filRoutes);
app.use('/profile/', profileRoutes);
app.use('/dashBoard/', adminboardRoutes);

module.exports = app;
