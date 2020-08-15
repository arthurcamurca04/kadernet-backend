import express from 'express';

//modulo de roteamento do express
const router = express.Router();
import UserController from './controllers/UserController';
import LoginController from './controllers/LoginController';



router.post('/user', UserController.create);
router.post('/login', LoginController.login);

export default router;