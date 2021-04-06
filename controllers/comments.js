const models = require('../models')
const jwt = require('jsonwebtoken');
const article = require('../models/article');



exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const articleId = req.params.id

    let content = req.body.content;
    let publicationDate = req.body.publicationDate;

    if (
        content == null ||
        publicationDate == null

    ) {
        return res.status(400).json({ error: 'Bad request type' });
    }
    models.User.findOne({
            attributes: ['id'],
            where: { id: userId }
        })
        .then(userFound => {
            if (userFound) {
                models.Comment.create({
                        content: content,
                        publicationDate: publicationDate,
                        UserId: userFound.id,
                        ArticleId: articleId

                    })
                    .then(newComment => {
                        if (newComment) {
                            return res.status(200).json(newComment);
                        } else {
                            return res.status(500).json({ error: 'not create' });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({ error: 'creation error' });

                    })

            } else {
                return res.status(400).json({ error: 'user not found' });
            }
        }).catch(err => {
            return res.status(400).json({ error: 'unable to verify user' });

        })
};

exports.getAllComments = (req, res, next) => {
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.Comment.findAll({
            where: { articleId: req.params.id },
            order: [(order != null) ? order.split(':') : ['publicationDate', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['lastname', 'firstname']
            }]

        })
        .then(Comments => {

            if (Comments) {
                res.status(200).json(Comments);
            } else {
                return res.status(404).json({ error: 'not found' });
            }
        })
        .catch(err => {
            return res.status(400).json({ error: 'unable to found comment' });

        })
};


exports.updateComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

}