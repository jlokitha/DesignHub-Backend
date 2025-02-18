import { Router } from 'express';
import { UserService } from '../services/user.service';
import {register, login, refreshToken} from "../controllers/user.controller";

const router = Router();
const userService = new UserService();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Refresh token route
router.post('/refresh-token', refreshToken)

export default router;