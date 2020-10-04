const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/signup', userControllers.signup);
router.post('/login/', userControllers.login);
router.get('/getInfos/:id', auth, userControllers.getInfos);
router.get('/:id/getAllPosts', auth, userControllers.getAllPosts);
router.get('/getAllUsers', auth, admin, userControllers.getAllUsers);

module.exports = router;