const models = require('../models')
const jwt = require('jsonwebtoken');


exports.createArticle = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    let title = req.body.title;
    let description = req.body.description;
    let imageUrl = req.body.imageUrl;

    if (
        title == null ||
        description == null ||
        imageUrl == null

    ) {
        return res.status(400).json({ error: 'Bad request type' });
    }
    models.User.findOne({
            attributes: ['id'],
            where: { id: userId }
        })
        .then(userFound => {
            if (userFound) {
                models.Article.create({
                        title: title,
                        description: description,
                        imageUrl: imageUrl,

                        UserId: userFound.id
                    })
                    .then(newArticle => {
                        if (newArticle) {
                            return res.status(200).json(newArticle);
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

exports.getAllArticles = (req, res, next) => {
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.Article.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['lastname', 'firstname']
            }]
        })
        .then(Articles => {
            if (Articles) {
                res.status(200).json(Articles);
            } else {
                return res.status(404).json({ error: 'not found' });
            }
        })
        .catch(err => {
            return res.status(400).json({ error: 'unable to verify user' });

        })
};

exports.getOneArticle = (req, res, next) => {

    models.Article.findAll({
            where: { id: req.params.id },
            include: [{
                model: models.User,
                attributes: ['lastname', 'firstname']
            }]
        })
        .then(OneArticle => {
            if (OneArticle) {
                res.status(200).json(OneArticle);
            } else {
                return res.status(404).json({ error: 'not found' });
            }
        })
        .catch(err => {
            return res.status(400).json({ error: 'unable to verify user' });

        })

};

exports.updateArticle = (req, res, next) => {

};

exports.deleteArticle = (req, res, next) => {

}