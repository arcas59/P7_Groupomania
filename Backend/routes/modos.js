//plugin Npm Node.js
const express = require('express');
const router = express.Router();

// Middleware avec auth pour sécuriser les connexions
const auth = require('../middleware/auth');

// Controleurs de la routes modos
const modoCtrl = require('../controllers/modos');

 // Les routes :
router.get('/comments', auth, modoCtrl.getAllComments);
router.get('/posts', auth, modoCtrl.getAllPosts);
router.delete('/comments/:id', auth, modoCtrl.deleteComment);
router.delete('/posts/:id', auth, modoCtrl.deletePost);


module.exports = router;
