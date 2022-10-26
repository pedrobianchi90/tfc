import { Request, Response } from 'express';
import UserService from '../services/user.service';
import statusCodes from '../utils/statusCodes';

class UserController {
  constructor(private userService = UserService) { }

  public login = async (req: Request, res: Response) => {
    const token = await this.userService.generateToken(req.body);
    return res.status(statusCodes.ok).json({ token });
  };

  public getRole = async (_req: Request, res: Response) => {
    const { user } = res.locals;

    return res.status(statusCodes.ok).json({ role: user.role });
  };
}

export default UserController;
