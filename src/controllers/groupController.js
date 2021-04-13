import asyncHandler from 'express-async-handler';

// @description     Add new group
// @route           POST /api/groups/new
// @access          Private, restricted to ADMIN or SUPERADMIN role
const newGroup = asyncHandler(async (req, res) => {

});

const getAllGroups = asyncHandler(async (req, res) => {

});

const getGroupById = asyncHandler(async (req, res) => {

});

const updateGroup = asyncHandler(async (req, res) => {

});

export {
    newGroup,
    getAllGroups,
    getGroupById,
    updateGroup
};