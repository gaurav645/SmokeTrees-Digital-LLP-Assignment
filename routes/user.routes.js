const express = require('express');
const router = express.Router();
const {signin,signup} = require('../controller/user.controller');

router.post('/register',signup);
router.post('/login',signin);




module.exports = router;