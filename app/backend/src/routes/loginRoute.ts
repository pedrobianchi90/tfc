import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginMiddleware from '../middlewares/loginMiddleware';

const userController = new UserController();
const loginRouter = Router();

loginRouter.post('/', LoginMiddleware, userController.login);

export default loginRouter;
