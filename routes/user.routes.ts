import { Router } from 'express';
import {register, login, refreshToken} from "../controllers/user.controller";

const router = Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Refresh token route
router.post('/refresh-token', refreshToken)

export default router;