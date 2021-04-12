import asyncHandler from 'express-async-handler';

// @description     Add new publisher
// @route           POST /api/publisher/
// @access          Private, restricted to ADMIN or SUPERADMIN role
const addPublisher = asyncHandler(async (req, res) => {

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