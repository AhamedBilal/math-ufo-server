import { errorResponse } from '../helpers';
import User from '../models/user';

const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    if (!(req.headers && req.headers.authorization)) {
        return errorResponse(req, res, 'Token is not provided', 401);
    }
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
        req.user = decoded.user;
        const user = await User.scope('withSecretColumns').findOne({
            where: { email: req.user.email },
        });
        if (!user) {
            return errorResponse(req, res, 'User is not found in system', 401);
        }
        const reqUser = { ...user.get() };
        reqUser.userId = user.id;
        req.user = reqUser;
        return next();
    } catch (error) {
        return errorResponse(
            req,
            res,
            'Incorrect token is provided, try re-login',
            401,
        );
    }
};

export default authentication;