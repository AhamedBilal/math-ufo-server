const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {User} = require('../models');
const config = require('../config/app-config');
const {errorResponse, successResponse, uniqueId} = require("../helpers");

var express = require('express');
const {Sequelize} = require("sequelize");
var router = express.Router();

/* GET users listing. */
router.post('/', async (req, res) => {
    try {
        let {name, email, password} = req.body;

        if (password) {
            const reqPass = crypto
                .createHash('md5')
                .update(password)
                .digest('hex');
            const payload = {
                email,
                name,
                password: reqPass,
                isVerified: false,
                verifyToken: uniqueId(),
            };
            const newUser = await User.create(payload);
            return successResponse(req, res, {newUser});
        } else {
            throw new Error('User already exists with same email');
        }
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.scope('withSecretColumns').findOne({
            where: {email: req.body.email},
        });
        if (!user) {
            throw new Error('Incorrect Email Id/Password');
        }
        console.log(user.password);
        const reqPass = crypto
            .createHash('md5')
            .update(req.body.password || '')
            .digest('hex');
        if (reqPass !== user.password) {
            throw new Error('Incorrect Email Id/Password');
        }
        const token = jwt.sign(
            {
                user: {
                    userId: user.id,
                    email: user.email,
                    createdAt: new Date(),
                },
            },
            config.SECRET,
        );
        delete user.dataValues.password;
        return successResponse(req, res, {id: user.id, highScore: user.highScore || 0, token: token});
    } catch (error) {
        console.log(error);
        return errorResponse(req, res, error.message);
    }
});


router.put('/:userId/score', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.userId},
        });
        if (!user) {
            throw new Error('User NotFound!');
        }
        user.highScore = req.body.score;
        await user.save();
        return successResponse(req, res, {user});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await User.findAll({
            order: [['highScore', 'DESC']]
        });
        if (!user) {
            throw new Error('NotFound!');
        }
        return successResponse(req, res, user);
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
});


module.exports = router;
