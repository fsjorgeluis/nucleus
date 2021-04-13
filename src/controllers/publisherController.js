import asyncHandler from 'express-async-handler';
import Publisher from '../models/Publisher.js';
import { Roles } from '../models/User.js';

// @description     Add new publisher
// @route           POST /api/publishers/new
// @access          Private, restricted to ADMIN or SUPERADMIN role
const addPublisher = asyncHandler(async (req, res) => {
    const {
        user: { role },
        body: {
            firstName,
            lastName,
            email,
            address,
            phone1,
            phone2,
            group,
            isGroupSupervisor,
            isGroupAssistant,
            isAux,
            isPr,
            status
        }
    } = req;
    if (role === Roles.SuperAdmin || role === Roles.Admin) {
        const publisherExists = await Publisher.findOne({ email });
        if (publisherExists) {
            res.status(400);
            throw new Error('Publisher already exist!');
        }
        const newPublisher = await Publisher.create({
            firstName,
            lastName,
            email,
            address,
            phone1,
            phone2,
            group,
            isGroupSupervisor,
            isGroupAssistant,
            isAux,
            isPr,
            status
        });
        if (newPublisher) {
            res.status(201).json({
                data: {
                    _id: newPublisher._id,
                    firstName: newPublisher.firstName,
                    lastName: newPublisher.lastName,
                    group: newPublisher.group,
                    status: newPublisher.status
                }
            });
        } else {
            res.status(400);
            throw new Error('Invalid publisher data!');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
});

// @description     Get all publishers registered
// @route           Get /api/publishers/
// @access          Private, restricted to ADMIN or SUPERADMIN role
const getAll = asyncHandler(async (req, res) => {
    const { user: { role }, query: { page = 1, limit = 10 } } = req;
    if (role === Roles.SuperAdmin || role === Roles.Admin) {
        const allPublishers = await Publisher.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Publisher.countDocuments();
        if (allPublishers) {
            res.json({
                data: allPublishers,
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

const getPublisherById = asyncHandler(async (req, res) => {

});

const updatePublisher = asyncHandler(async (req, res) => {

});

export {
    addPublisher,
    getAll,
    getPublisherById,
    updatePublisher
};