// Plugin Npm Node.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Utilisation du Framework Express
const app = express();

// Routes 
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const modoRoutes = require('./routes/modos')

// ID de connection a la Base de Donnée:
const connectdb = require('./database/connection-db');

// Connection a la Base de Donnée
app.connect(connectdb);

// Middleware pour les headers de requêtes et éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Rend les données du corps de la requête exploitable
app.use(bodyParser.json());

// Chemin virtuel pour les fichiers statiques tel que nos images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes attendues pour les differentes API
app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/modo', modoRoutes)

module.exports = app;
