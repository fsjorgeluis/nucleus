import express from 'express';
import { secure } from '../middleware/authMiddleware.js';
import {
    authUser,
    registerUser,
    getUsers
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/').get(secure, getUsers);

export default router;