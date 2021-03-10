import asyncHandler from 'express-async-handler';
import tokenGenerator from '../helpers/tokenGenerator.js';
import User from '../models/User.js';

// @description     Auth user & get token
// @route           POST /api/users/login
// @access          Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist && userExist.matchPassword(password)) {
        res.json({
            data: {
                _id: userExist._id,
                name: userExist.name,
                email: userExist.email,
                role: userExist.role,
                token: tokenGenerator(userExist._id)
            }
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @description     Register new user
// @route           POST /api/users/register
// @access          Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, lastName, email, password, phone1, group } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exist!');
    }
    const newUser = await User.create({
        name,
        lastName,
        email,
        password,
        phone1,
        group
    });
    if (newUser) {
        res.status(201).json({
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data!');
    }
});

// @description     Get all users registered
// @route           Get /api/users/
// @access          Private, restricted to ADMIN role
const getUsers = asyncHandler(async (req, res) => {
    const { role } = req.user;
    if (role === 'SUPERADMIN' || role === 'ADMIN') {
        const allUsers = await User.find({});
        if (allUsers) {
            res.json({
                data: allUsers
            });
        } else {
            res.status(404);
            throw new Error('We can not find any record!');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
});

export {
    authUser,
    registerUser,
    getUsers
};