import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();
const loginRouter = Router();

loginRouter.post('/', userController.login);

export default loginRouter;
