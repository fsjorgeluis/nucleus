import asyncHandler from 'express-async-handler';
import tokenGenerator from '../helpers/tokenGenerator.js';
import User, { Roles } from '../models/User.js';

// @description     Auth user & get token
// @route           POST /api/users/login
// @access          Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    const isMatch = await userExists.comparePassword(password);
    if (userExists && isMatch) {
        res.json({
            data: {
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                role: userExists.role,
                token: tokenGenerator(userExists._id)
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
    const { name, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exist!');
    }
    const newUser = await User.create({
        name,
        lastName,
        email,
        password
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
// @access          Private, restricted to ADMIN or SUPERADMIN role
const getUsers = asyncHandler(async (req, res) => {
    const { user: { role }, query: { page = 1, limit = 10 } } = req;
    if (role === Roles.SuperAdmin || role === Roles.Admin) {
        const allUsers = await User.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await User.countDocuments();
        if (allUsers) {
            res.json({
                data: allUsers.map(user => {
                    const { password, ...one } = user._doc;
                    return one;
                }),
                totalPages: Math.ceil(count / limit),
                currentPage: page
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

// @description     Get user by id
// @route           Get /api/users/profile/:id
// @access          Private, restricted to ADMIN or SUPERADMIN role
const getUserById = asyncHandler(async (req, res) => {
    const { user: { role }, params: { id } } = req;
    if (role === Roles.SuperAdmin || role === Roles.Admin) {
        const getOneUser = await User.findById({ _id: id });
        const { password, ...user } = getOneUser._doc;
        if (getOneUser) {
            res.json({
                data: user
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

// @description     Update user
// @route           PATCH /api/users/profile/:id
// @access          Private, restricted to ADMIN or SUPERADMIN role
const updateUser = asyncHandler(async (req, res) => {
    const { user: { role }, params: { id } } = req;
    if (role === Roles.SuperAdmin || role === Roles.Admin) {
        const user = await User.findById({ _id: id });
        if (user) {
            user.name = req.body.name || user.name;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.status = req.body.status || user.status;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            res.json({
                data: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    status: updatedUser.status,
                    token: tokenGenerator(updatedUser._id)
                }
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
    getUsers,
    getUserById,
    updateUser
};