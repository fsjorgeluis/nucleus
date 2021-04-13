import express from 'express';
import { secure } from '../middleware/authMiddleware.js';
import {
    newGroup,
    getAllGroups,
    getGroupById,
    updateGroup
} from '../controllers/groupController.js';

const router = express.Router();

router.route('/').get(secure, getAllGroups);
router.route('/new').post(secure, newGroup);
router.route('/:id')
    .get(secure, getGroupById)
    .patch(secure, updateGroup);

export default router;