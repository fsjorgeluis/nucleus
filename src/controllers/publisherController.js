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

const getAll = asyncHandler(async (req, res) => {

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