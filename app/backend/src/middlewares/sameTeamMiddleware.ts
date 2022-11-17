import { Request, Response, NextFunction } from 'express';
import statusCodes from '../utils/statusCodes';

const sameTeam = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(statusCodes.unprocessableEntity).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  next();
};

export default sameTeam;
