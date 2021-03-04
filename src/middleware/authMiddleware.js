import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

const secure = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            next();
        } catch (error) {
            console.error(error)
            throw new Error('Not authorized, token failed!');
        }
    }
    if (!token) {
        throw new Error('Not authorized, there is no any token!');
    }
});

export default secure;