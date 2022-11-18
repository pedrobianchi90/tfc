import { Request, Response } from 'express';
import Authentication from '../utils/authentication';
import Service from '../services/user.service';
import { TokenDecode } from '../interfaces';
import statusCodes from '../utils/statusCodes';

export default class Login {
  service: Service;
  authenticate: Authentication;

  constructor() {
    this.service = new Service();
    this.authenticate = new Authentication();
  }

  public login = async (req: Request, res: Response) => {
    const user = await this.service.login(req.body);
    if (user) {
      return res.status(statusCodes.ok).json({ token: user });
    } return res.status(statusCodes.unauthorized).json({ message: 'Incorrect email or password' });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (authorization) {
      const validation = this.authenticate.verifyToken(authorization) as TokenDecode;
      if (validation) return res.status(statusCodes.ok).json({ role: validation.role });
    } return res.status(statusCodes.badRequest).json({ message: 'Not Found' });
  };
}
