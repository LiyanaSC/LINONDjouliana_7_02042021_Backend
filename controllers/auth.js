const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const models = require('../models')
const passwordValidator = require('password-validator');
const validator = require("email-validator");



const schema = new passwordValidator();

schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)



exports.signup = (req, res, next) => {
    console.log("req body", req.body)
    let email = req.body.email;
    let password = req.body.password;
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;


    if (
        email == null ||
        password == null ||
        lastname == null ||
        firstname == null
    ) {
        return res.status(400).json({ error: 'Bad request type' });
    } else
    if (schema.validate(req.body.password) == false) {
        return res.status(400).json({ error: 'password insecure try again' });
    } else if (validator.validate(req.body.email) == false) {
        return res.status(400).json({ error: 'not an email' });
    } else if (!req.body.email ||
        !req.body.password) {
        return res.status(400).json({ error: 'permission denied' });
    }
    models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {

                        const user = models.User.create({
                            email: email,
                            password: hash,
                            lastname: lastname,
                            firstname: firstname

                        })


                        .then((newUser) => res.status(201).json({
                                'userId': newUser.id,
                                message: 'nouvel(le) utilisateur/trice enregistré(e) !'
                            }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }))

            } else {
                return res.status(409).json({ error: ' user already exist' });
            }

        })
        .catch(function(err) {
            return res.status(500).json({ error: 'unable to verify user' });
        })


}


exports.login = (req, res, next) => {
    if (schema.validate(req.body.password) == false) {
        return res.status(406).send(new Error('password insecure try again'));
    } else if (validator.validate(req.body.email) == false) {
        return res.status(406).send(new Error('not a email'));
    }
    const hashedMail = CryptoJS.SHA256(req.body.email).toString();
    User.findOne({ email: hashedMail })
        .then(user => {
            if (user == undefined) {
                res.status(401).send(new Error('permission denied'));

            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'mot de passe incorrect' });
                        }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign({ userId: user._id },
                                'RANDOM_TOKEN_SECRET', { expiresIn: '3h' }
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};