import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginMiddleware from '../middlewares/loginMiddleware';

const userController = new UserController();
const loginRouter = Router();
const loginMiddleware = new LoginMiddleware();

loginRouter.post(
  '/',
  loginMiddleware.emailValidate,
  loginMiddleware.passwordValidate,
  userController.login,
);
loginRouter.get('/validate', userController.validate);

export default loginRouter;
