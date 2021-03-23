import express from 'express';
import { secure } from '../middleware/authMiddleware.js';
import {
    authUser,
    registerUser,
    getUsers,
    getUserById
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/').get(secure, getUsers);
router.route('/:id').get(secure, getUserById);

export default router;