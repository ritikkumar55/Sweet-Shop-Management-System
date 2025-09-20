import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { body } from 'express-validator';
const router = Router();

router.post('/register',
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  register);

router.post('/login', body('email').isEmail(), body('password').exists(), login);

export default router;
