const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const multerProfile = require('../middleware/multer-profile-config')

const wallControllers = require('../controllers/wall');
const auth = require('../middleware/auth');

//Posts routes
router.post('/post/',auth, multer, wallControllers.postMessage);
router.post('/post/comment/', auth, wallControllers.postComment);

//Get routes
router.get('/getAll/', auth, wallControllers.getAllPosts);
router.get('/comment/get/:id', auth, wallControllers.getComments);

module.exports = router;