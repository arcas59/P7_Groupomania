const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const filControllers = require('../controllers/filactualite');
const auth = require('../middleware/auth');

//Posts routes
router.post('/post/',auth, multer, filControllers.postMessage);
router.post('/post/comment/', auth, filControllers.postComment);

//Get routes
router.get('/getAll/', auth, filControllers.getAllPosts);
router.get('/comment/get/:id', auth, filControllers.getComments);

module.exports = router;