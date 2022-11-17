import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const password = 'jwt_secret';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const jwtDecoded = jwt.verify(token, password);
    res.locals.user = jwtDecoded;

    return next();
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
