import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/team.service';
import statusCodes from '../utils/statusCodes';

const teamExist = async (req:Request, res:Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const teamService = new TeamService();

  const checkHomeTeam = await teamService.findById(homeTeam);
  const checkAwayTeam = await teamService.findById(awayTeam);

  if (!checkHomeTeam?.id || !checkAwayTeam?.id) {
    return res.status(statusCodes.notFound).json({ message: 'There is no team with such id!' });
  }
  return next();
};

export default teamExist;
