import express from 'express';
import { secure } from '../middleware/authMiddleware.js';
import {
    newMonthlyReport,
    getAllMonthlyReports,
    getMonthlyReportById,
    updateMonthlyReport
} from '../controllers/monthlyReportController.js';

const router = express.Router();

router.route('/').get(secure, getAllMonthlyReports);
router.route('/new').post(secure, newMonthlyReport);
router.route('/:id')
    .get(secure, getMonthlyReportById)
    .patch(secure, updateMonthlyReport);

export default router;