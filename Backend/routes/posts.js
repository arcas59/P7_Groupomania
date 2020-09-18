// Plugin Npm Node.js
const express = require('express');
const router = express.Router();

// Middlewares avec auth pour sécuriser les connexions et Multher pour la gestion des images
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Controleurs de la routes posts
const postsCtrl = require('../controllers/posts');

// Les routes :
router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getAPosts);
router.post('/', auth, postsCtrl.createPost);
router.patch('/:id', auth, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost); 


// Les routes concernant les commantaires:
 
router.get('/:id/comments', auth, postsCtrl.getComments);
router.post('/:id/comments', auth, postsCtrl.createComment);
router.patch('/comments/:id', auth, postsCtrl.updateComment);
router.delete('/comments/:id', auth, postsCtrl.deleteComment); 

module.exports = router;