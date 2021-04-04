const express = require('express');
const router = express.Router();

const sauceControl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



router.get("/", auth, sauceControl.getAllSauces);

router.get("/articles", auth, sauceControl.getOneSauce);
router.get("/articles/:id", auth, sauceControl.getOneSauce);
router.post("/articles", auth, multer, sauceControl.createSauce);
router.put("/articles/:id", auth, multer, sauceControl.modifSauce);
router.delete("/articles/:id", auth, multer, sauceControl.deleteSauce);

router.get("/articles/:id/comments", auth, sauceControl.getOneSauce);
router.post("/articles/:id/comments/", auth, multer, sauceControl.createSauce);
router.put("/articles/:id/comments/:id", auth, multer, sauceControl.modifSauce);
router.delete("/articles/:id/comments/:id", auth, multer, sauceControl.deleteSauce);



module.exports = router;