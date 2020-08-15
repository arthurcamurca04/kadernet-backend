import express from 'express';
import authMiddleware from './middlewares/auth';

//modulo de roteamento do express
const router = express.Router();

//controllers
import UserController from './controllers/UserController';
import LoginController from './controllers/LoginController';
import AnnotationsController from './controllers/AnnotationsController';



router.post('/user', UserController.create);
router.post('/login',LoginController.login);

router.post('/annotations', authMiddleware, AnnotationsController.create);

export default router;