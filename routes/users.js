const express = require('express');
const router = express.Router();


//const UsersControl = require('../controllers/users');

router.get("/:id", UsersControl.createUser);
router.put("/:id", UsersControl.createUser);

module.exports = router;