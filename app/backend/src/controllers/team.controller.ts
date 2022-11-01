import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import statusCodes from '../utils/statusCodes';

class TeamController {
  public findAll = async (req: Request, res: Response) => {
    const teams = await TeamService.findAll();
    return res.status(statusCodes.ok).json(teams);
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await TeamService.findById(Number(id));
    return res.status(statusCodes.ok).json(team);
  };
}

export default TeamController;
