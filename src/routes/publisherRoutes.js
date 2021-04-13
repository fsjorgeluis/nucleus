import express from 'express';
import { secure } from '../middleware/authMiddleware.js';
import {
    addPublisher,
    getAll,
    getPublisherById,
    updatePublisher
} from '../controllers/publisherController.js';

const router = express.Router();

router.route('/').get(secure, getAll);
router.route('/new').post(secure, addPublisher);
router.route('/:id')
    .get(secure, getPublisherById)
    .patch(secure, updatePublisher);

export default router;