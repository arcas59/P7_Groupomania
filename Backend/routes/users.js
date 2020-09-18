// Plugin Npm Node.js
const express = require('express');
const router = express.Router();

// Middlewares avec auth pour sécuriser les connexions et Multher pour la gestion des images
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Controlleurs :
const userCtrl = require('../controllers/users');

//Routes :
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id', auth, userCtrl.seeAProfile);
router.delete('/profile/:id', auth, userCtrl.deleteUser);
router.patch('/profile/:id', auth, multer, userCtrl.updateUser);

module.exports = router;