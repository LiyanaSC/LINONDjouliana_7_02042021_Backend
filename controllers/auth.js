const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const models = require('../models')
const passwordValidator = require('password-validator');
const validator = require("email-validator");
EncryptedField = require('sequelize-encrypted');



const schema = new passwordValidator();

schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)



exports.signup = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password;
    let lastname = req.body.lastname;
    let firstname = req.body.firstname;


    if (
        Object.keys(req.body).length != 4 ||
        email == null ||
        password == null ||
        lastname == null ||
        firstname == null
    ) {
        return res.status(400).json({ error: 'Bad request type' });
    } else if (lastname.length <= 1 ||
        lastname.length >= 254 ||
        firstname.length <= 1 ||
        firstname.length >= 254
    ) {
        return res.status(400).json({ error: 'enter true names' });

    } else if (schema.validate(req.body.password) == false) {
        return res.status(400).json({ error: 'password insecure try again' });
    } else if (validator.validate(req.body.email) == false) {
        return res.status(400).json({ error: 'not an email' });
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
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;

    if (
        Object.keys(req.body).length != 2 ||
        email == null ||
        password == null
    ) {
        return res.status(400).json({ error: 'Bad request' });
    } else if (schema.validate(req.body.password) == false) {
        return res.status(406).send(new Error('password insecure try again'));
    } else if (validator.validate(req.body.email) == false) {
        return res.status(406).send(new Error('not a email'));
    }
    models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (userFound) {

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {

                        // tokenList[refreshToken] = response
                        return res.status(200).json({
                            userId: userFound.id,
                            token: jwt.sign({ userId: userFound.id, isAdmin: userFound.admin }, 'RANDOM_TOKEN_SECRET', { expiresIn: '10h' }),
                            refreshToken: jwt.sign({ userId: userFound.id, isAdmin: userFound.admin }, 'RANDOM_REFRESH_TOKEN_SECRET', { expiresIn: '2150h' }),
                            admin: userFound.admin
                        })
                    }
                    return res.status(401).json({ error: 'mot de passe incorrect' });

                })
            } else {
                return res.status(400).json({ error: 'unable to verify user' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ error: 'unable to verify user' });
        })



};

exports.token = (req, res, next) => {
    let admin = req.body.admin;
    let userId = req.body.userId;
    let tokenList = req.body.tokenList
    let refreshToken = req.body.refreshToken


    if (
        Object.keys(req.body).length != 4 ||
        admin == null ||
        userId == null ||
        refreshToken == null ||
        tokenList == null
    ) {
        return res.status(400).json({ error: 'Bad request' });
    } else if ((tokenList.find(element => element = refreshToken)) !== undefined) {

        const token = jwt.sign({ userId: userId, isAdmin: admin }, 'RANDOM_TOKEN_SECRET', { expiresIn: '10h' })
        const response = {
            'userId': userId,
            'token': token,
            'admin': admin
        }

        return res.status(200).json({ response })


    } else {
        res.status(404).send('Invalid request here')
    }



};