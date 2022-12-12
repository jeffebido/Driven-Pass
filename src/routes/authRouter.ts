import { Router } from 'express';
import { LogIn, SignUp } from '../controllers/authController';
import { loginMiddleware, signUpMiddleware } from '../middlewares/authMiddleware';

const router = Router();


router.post("/signup", signUpMiddleware, SignUp);
router.post('/login', loginMiddleware, LogIn)

export default router;