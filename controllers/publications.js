const models = require('../models')


exports.getAllPublications = (req, res, next) => {
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;
    console.log('hello')
    models.Article.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['lastname', 'firstname']
            }]
        })
        .then(Articles => {
            console.log(Articles)
            if (Articles) {
                res.status(200).json(Articles);
            } else {
                return res.status(404).json({ error: 'not found' });
            }
        })
        .catch(err => {
            return res.status(400).json({ error: 'CANNOT FIND' });

        })
};