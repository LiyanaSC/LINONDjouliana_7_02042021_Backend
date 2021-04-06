const jwt = require('jsonwebtoken');
const models = require('../models')




exports.getUsers = (req, res, next) => {
    /*   const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;*/
    const userId = req.params.id
    if (userId < 1 ||
        userId != req.params.id) {
        return res.status(400).json({ error: 'USER UNDEFINED' });
    }
    models.User.findOne({
        attributes: ['firstname', 'lastname'],
        where: { id: userId }
    }).then(user => {
        if (user) {
            return res.status(201).json(user);
        } else {
            return res.status(400).json({ error: 'USER UNDEFINED' });
        }
    }).catch(err => {
        return res.status(400).json({ error: 'USER not found' });

    })
}

exports.updateUsers = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    console.log("here", req.body)


    if (userId < 1 ||
        userId != req.params.id) {
        return res.status(400).json({ error: 'permission denied' });
    } else if (
        firstname == null ||
        lastname == null

    ) {
        return res.status(400).json({ error: 'Bad request type' });
    }
    models.User.findOne({
            attributes: ['firstname', 'lastname', 'id'],
            where: { id: userId }
        })
        .then(userFound => {
            if (userFound) {
                userFound.update({
                    firstname: (firstname ? firstname : userFound.firstname),
                    lastname: (lastname ? lastname : userFound.lastname),
                }).then(userUpdate => {
                    if (userUpdate) {
                        return res.status(200).json({ message: 'update!' });
                    } else {
                        return res.status(404).json({ error: 'cannot update' });

                    }
                }).catch(err => {
                    return res.status(404).json({ error: 'user not found' });
                })

            }
        }).catch(err => {
            return res.status(400).json({ error: 'unable to verify user' });

        })

}