const express = require('express');
const router = express.Router();
const auth = require('../middleware/token');


const UsersControl = require('../controllers/users');

router.get("/:id", auth, UsersControl.getUsers);
router.put("/:id", auth, UsersControl.updateUsers);

module.exports = router;