const express = require('express');
const router = express.Router();


const authControl = require('../controllers/auth');

router.post("/signup", authControl.signup);
router.post("/login", authControl.login);

module.exports = router;