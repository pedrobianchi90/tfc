import jwt = require('jsonwebtoken');
import { IUser } from '../interfaces';

export default class Authentication {
  payload: IUser;
  secret: string;
  token: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public generateToken = (body: IUser): string => {
    const { id, username, role, email } = body;
    this.token = jwt.sign(
      { id, username, role, email },
      this.secret,
      { expiresIn: '1000min', algorithm: 'HS256' },
    );
    return this.token;
  };

  public verifyToken = (token: string): boolean | string | jwt.JwtPayload => {
    try {
      const validate: string | jwt.JwtPayload = jwt.verify(token, this.secret);
      return validate;
    } catch (error) {
      return false;
    }
  };
}
