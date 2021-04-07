const express = require('express');
const router = express.Router();

const articleControl = require('../controllers/articles');
const commentControl = require('../controllers/comments');
const publicationsControl = require('../controllers/publications');

const auth = require('../middleware/token');
//const multer = require('../middleware/multer-config');



router.get("/all", auth, publicationsControl.getAllPublications);

router.get("/articles", auth, articleControl.getAllArticles);
router.get("/articles/:id", auth, articleControl.getOneArticle);
router.post("/articles", auth, /* multer,*/ articleControl.createArticle);
router.put("/articles/:id", auth, /* multer,*/ articleControl.updateArticle);
router.delete("/articles/:id", auth, /*multer,*/ articleControl.deleteArticle);

router.get("/articles/:id/comments", auth, commentControl.getAllComments);
router.post("/articles/:id/comments/", auth, commentControl.createComment);
router.put("/articles/:id/comments/:id", auth, commentControl.updateComment);
router.delete("/articles/:id/comments/:id", auth, commentControl.deleteComment);



module.exports = router;