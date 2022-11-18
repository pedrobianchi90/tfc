import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';

const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default class LoginMiddleware {
  emailValidate = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email || email === '') {
      return res.status(statusCodes.badRequest).json({ message: 'All fields must be filled' });
    }
    if (!regex.test(email)) {
      return res.status(statusCodes.badRequest).json({ message: 'Incorrect email or password' });
    }
    next();
  };

  passwordValidate = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password || password === '') {
      return res.status(statusCodes.badRequest).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
