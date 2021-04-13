import asyncHandler from 'express-async-handler';

// @description     Add new monthly report
// @route           POST /api/monthlyreports/new
// @access          Private, restricted to ADMIN or SUPERADMIN role
const newMonthlyReport = asyncHandler(async (req, res) => {

});

const getAllMonthlyReports = asyncHandler(async (req, res) => {

});

const getMonthlyReportById = asyncHandler(async (req, res) => {

});

const updateMonthlyReport = asyncHandler(async (req, res) => {

});

export {
    newMonthlyReport,
    getAllMonthlyReports,
    getMonthlyReportById,
    updateMonthlyReport
};