const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const dashBoardControllers = require('../controllers/dashBoard');

router.get('/flaggedPosts/', auth, admin, dashBoardControllers.getFlaggedPosts);
router.put('/flagPost/:id', auth, admin, dashBoardControllers.flagPost);

module.exports = router;